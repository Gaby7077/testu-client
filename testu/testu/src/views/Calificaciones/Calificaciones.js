import React, { Component } from 'react';
import { Grid, Row, Col, Table } from "react-bootstrap";
import Card from "components/Card/Card.jsx";
import UserAPI from "../../api/user.api";
import jsPDF from "jspdf";
import Button from "components/MaterialButton/MaterialButton.jsx";




class Calificaciones extends Component {

    constructor(props, context) {
        super(props, context);

        

        this.state = {
           empresa: localStorage.getItem("empresa"),
           respuesta:[],
           alumno:"Gustavo Canales",
           curso:"Curso 1",
           calificacion:"90",
            

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

    //Funcion para crear el PDF
    crearPDF(e){
        e.preventDefault();
        let alumno=e.target.getAttribute("alumno")
        let curso=e.target.getAttribute("curso")
        let calificacion=e.target.getAttribute("calificacion")
        var doc=new jsPDF
        doc.text(20,20,"Resultado de Examen")
        doc.text(20,30,`Este certificado reconoce que el alumno ${alumno}.`)
        doc.text(20,40,`Obtuvo una calificación de ${calificacion} en el curso de ${curso}`)
        doc.save("certificado.pdf")
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
                                                <th>
                                                    Obtener Certificado
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
                                                        <td>
                                                            <Button bsStyle="info" alumno={res.User.email} curso={res.Curso.curso} calificacion={porcentaje} fill type="submit" onClick={(e)=>this.crearPDF(e)}>Obtener Certificado</Button>
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