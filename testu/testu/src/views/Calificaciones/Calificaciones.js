import React, { Component } from 'react';
import { Grid, Row, Col, Table } from "react-bootstrap";
import Card from "components/Card/Card.jsx";
import UserAPI from "../../api/user.api";
import Button from "components/MaterialButton/MaterialButton.jsx";



class Calificaciones extends Component {

    constructor(props, context) {
        super(props, context);

        this.obtenerCursos=this.obtenerCursos.bind(this)
        this.obtenerUsuarios=this.obtenerUsuarios.bind(this)
        this.sacarCalificaciones=this.sacarCalificaciones.bind(this)
        this.sacarBuenas=this.sacarBuenas.bind(this)
        this.prueba=this.prueba.bind(this)



        this.state = {
            cursos: [],
            empresa: localStorage.getItem("empresa"),
            cursosid: [],
            cursosnom:[],
            usuarios: [],
            usuariosid: [],
            usuariosnom:[],
            resultados:[],
            prueba:false,

        };
    }

    componentDidMount() {
        this.obtenerCursos();
        this.obtenerUsuarios();
    }

    //*Funcion para obtener los datos nuevos y ponerlos en el render
    obtenerCursos() {
        UserAPI.getCurso(this.state.empresa)

            .then(response => {
                //console.log(response)
                this.setState({
                    cursos: response.data
                })
                this.sacarid();

            })
    }

    sacarid() {
        let id = [];
        let nombreCurso=[];
        this.state.cursos.forEach(function(item) {
            nombreCurso.push(item.curso)
            
            id.push(item.id)
        })
        //console.log(id)
        this.setState({
            cursosid: id,
            cursosnom:nombreCurso
        })
    }

    obtenerUsuarios() {
        UserAPI.getUsuarios(this.state.empresa)
            .then(response => {
                this.setState({
                    usuarios: response.data
                })
                this.usuariosid();
                this.sacarCalificaciones();
                this.sacarBuenas();
                this.funcione();
               
            })
    }

    usuariosid() {
        let id = [];
        let nombreUsuarios=[];
        this.state.usuarios.forEach(function(respuesta) {
            //console.log(respuesta)
            id.push(respuesta.id);
            nombreUsuarios.push(respuesta.email)
        })
        //console.log(id)
        this.setState({
            usuariosid: id,
            usuariosnom:nombreUsuarios

        })
    }

    sacarCalificaciones() {
        let calificaciones = []
        
        for (let i = 0; i < this.state.usuariosid.length; i++) {
            for (let j = 0; j < this.state.cursosid.length; j++) {
                let obj = {}
                UserAPI.getUsuarioCurso(this.state.cursosid[j])
                    .then(response => {
                        
                        if (response.data) {
                            //console.log(response)
                            obj.user = this.state.usuariosnom[i]
                            obj.curso = this.state.cursosnom[j]
                            obj.preguntastotal=response.data.count
                            obj.preguntasbuenas=0
                            calificaciones.push(obj)

                        }
                        
                    })
    
            }
            
        }
        //console.log(calificaciones)
        this.setState({
            resultados:calificaciones
        })
        
    }

    sacarBuenas() {
        let calificaciones = this.state.resultados
        //console.log("inicio")
        //console.log(calificaciones)
        
        for (let i = 0; i < this.state.usuariosid.length; i++) {
            for (let j = 0; j < this.state.cursosid.length; j++) {

                UserAPI.getUsuarioCursoBuenas(this.state.usuariosid[i], this.state.cursosid[j])
                    .then(response => {
                        
                        if (response.data) {
                            //console.log(response.data.count)
                            calificaciones[j].preguntasbuenas=response.data.count
                        

                        }
                        
                    })
    
            }
            
        }
        //console.log("Finales")
        //console.log(calificaciones)
        this.setState({
            resultados:calificaciones
        })
        
    }

    funcione(){
        this.state.resultados.map((res) => {
            console.log("entro")
            console.log(res)
            return(
                console.log
            )
    })
}

prueba(){
    console.log("Click")
    this.setState({
        prueba:true
    })
}



    render() {
    
        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                        <Button bsStyle="success" pullRight fill onClick={this.prueba}>Ver Resultados</Button>
                            <Card
                                title="Calificaciones"
                                ctTableFullWidth
                                ctTableResponsive
                                content={
                                    <Table striped hover>
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
                                            {this.state.resultados.map((res, index) => {
                                                console.log("entro")
                                                console.log(res)
                                                let indice = index + 1;
                                                let porcentaje=(res.preguntasbuenas/res.preguntastotal)*100



                                                return (

                                                    <tr key={res.curso}>
                                                        <td>
                                                            {indice}
                                                        </td>
                                                        <td>
                                                            {res.user}

                                                        </td>
                                                        <td>
                                                            {res.curso}

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