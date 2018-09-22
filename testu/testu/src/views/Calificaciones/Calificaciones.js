import React, { Component } from 'react';
import { Grid, Row, Col, Table } from "react-bootstrap";
import Card from "components/Card/Card.jsx";
import UserAPI from "../../api/user.api";




class Calificaciones extends Component {

    constructor(props, context) {
        super(props, context);

        

        this.state = {
           empresa: localStorage.getItem("empresa"),
           respuesta:[]
            

        };
    }

    componentDidMount() {
        this.obtenerCalificaciones();
        
    }

    //*Funcion para obtener los datos nuevos y ponerlos en el render
    obtenerCalificaciones() {
        UserAPI.getCalificaciones(this.state.empresa)
        .then(response=>{
            //console.log(response)
            this.setState({
                respuesta:response.data
            })
        })
    }

    



    render() {
    
        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                        
                            <Card
                                title="Calificaciones"
                                ctTableFullWidth
                                ctTableResponsive
                                content={
                                    <Table striped hover responsive>
                                        <thead>
                                            <tr>
                                                <th>
                                                    Id
                                                </th>
                                                <th>
                                                    Usuario
                                                </th>
                                                <th>
                                                    Curso
                                                </th>
                                                <th>
                                                    Calificacion
                                                </th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.respuesta.map((res, index) => {
                                                console.log("entro")
                                                console.log(res)
                                                let indice = index + 1;
                                                let porcentaje
                                                if (res.Calificacion){
                                                    porcentaje=res.Calificacion
                                                }
                                                else{
                                                    porcentaje="Examen no tomado"
                                                }
                                                
                                                return (

                                                    <tr key={res.id}>
                                                        <td>
                                                            {indice}
                                                        </td>
                                                        <td>
                                                            {res.User.email}

                                                        </td>
                                                        <td>
                                                            {res.Curso.curso}

                                                        </td>
                                                        <td>
                                                            {porcentaje}

                                                        </td>

                                                    </tr>
                                                )
                                            })}
                                        </tbody>

                                    </Table>

                                }
                            />

                        </Col>
                    </Row>
                </Grid>



            </div>
        )
    }

}

export default Calificaciones;