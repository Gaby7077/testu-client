import React, { Component } from 'react';
import { Grid, Row, Col, FormGroup, FormControl, ControlLabel, Modal } from "react-bootstrap";
import Card from "components/Card/Card.jsx";
import Button from "components/MaterialButton/MaterialButton.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import UserAPI from "../../api/user.api";
import "./Pregunta.css"
import userApi from '../../api/user.api';


class Pregunta extends Component {

    constructor(props, context) {
        super(props, context);
        this.handleShowPregunta = this.handleShowPregunta.bind(this);
        this.handleClosePregunta = this.handleClosePregunta.bind(this);
        this.handleModalSubmitPregunta = this.handleModalSubmitPregunta.bind(this);
        this.agregarPregunta = this.agregarPregunta.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.obtenerPreguntas=this.obtenerPreguntas.bind(this);
        this.handleShowRespuesta = this.handleShowRespuesta.bind(this);
        this.handleCloseRespuesta = this.handleCloseRespuesta.bind(this);
        this.handleModalSubmitRespuesta = this.handleModalSubmitRespuesta.bind(this);
        



        this.state = {
            showPregunta: false,
            showRespuesta:false,
            empresa: localStorage.getItem("empresa"),
            cursos: [],
            preguntas: [],
            cursoid: "",
            btndis: true,
            preguntaNueva: "",
            respuestaNueva:"",
            botonPregunta: true,
            botonRespuesta:false,
            botonVer: true,
            value: "",
            valueRespuesta:"false",
            preguntaid:""

        };
    }

    componentDidMount() {
        this.obtenerCursos();
    }

    //*Funcion para obtener los datos nuevos y ponerlos en el render
    obtenerCursos() {
        UserAPI.getCurso(this.state.empresa)

            .then(response => {
                console.log(response)
                this.setState({
                    cursos: response.data
                })
            })
    }

    //*Obtiene el id del curso
    handleChange(event) {
        this.setState({
            value: event.target.value,
            botonVer: false,
            botonPregunta:false
        })
    }

    //*Para ver las preguntas

    handleSubmit(event) {
        event.preventDefault();
        this.obtenerPreguntas();
    }

    //*Funcion para obtener las preguntas
    obtenerPreguntas(){
        userApi.getPreguntasCurso(this.state.value)
        .then(response => {
            console.log(response)
            this.setState({
                preguntas: response.data,
            })
        })
    }


//*Para detectar ls cambios en el modal de Pregunta
    handleModalInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
            btndis: false,

        });

    };


//*Llamada al API de agregar Pregunta
    agregarPregunta() {
        UserAPI.postAgregarPregunta({
            CursoId: this.state.value,
            pregunta: this.state.preguntaNueva,
            Empresa: this.state.empresa
        })
            .then(response => {
                console.log(response)
                this.obtenerPreguntas();
            })
    }


    //*Funcion para cerrar el modal de agregar Pregunta
    handleClosePregunta() {
        this.setState({ showPregunta: false });
    }

    //*Funcion para abrir el modal de agregar Pregunta
    handleShowPregunta() {
        this.setState({
            showPregunta: true,
            btndis: true
        });

    }
  

    //*Funcion para agregar pregunta
    handleModalSubmitPregunta() {
        this.agregarPregunta();
        this.handleClosePregunta();

    }

    //*Funcion para cerrar el modal de agregar Respuesta
    handleCloseRespuesta() {
        this.setState({ showRespuesta: false });
    }

    //*Funcion para abrir el modal de agregar Respuesta
    handleShowRespuesta= event => {
        event.preventDefault();
        this.setState({
            preguntaid:event.target.id,
            showRespuesta: true,
            botonRespuesta: false,
        });
    }

    //*Para detectar ls cambios en el modal de Respuesta
    handleModalInputChangeRespuesta = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
            //botonRespuesta: false,

        });

    };

    agregarRespuesta(){
        UserAPI.postAgregarRespuesta({
            Respuesta:this.state.respuestaNueva,
            Correcta:this.state.valueRespuesta,
            preguntaId:this.state.preguntaid
        }).then(response=>{
            console.log(response)
            this.setState({
                valueRespuesta:false,
            }
            )
            this.obtenerPreguntas();
        })
    }



    //*Funcion para agregar respuesta
    handleModalSubmitRespuesta() {
        this.agregarRespuesta();
        this.handleCloseRespuesta();

    }


    render() {
        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                title="Banco de Preguntas"
                                ctTableFullWidth
                                ctTableResponsive
                                content={
                                    <Grid>
                                        <FormGroup controlId="formControlsSelect">
                                            <Row>
                                                <Col md={6}>
                                                    <ControlLabel>Selecciona un Curso</ControlLabel>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md={8}>
                                                    <FormControl value={this.state.value} onChange={this.handleChange} componentClass="select" placeholder="select">
                                                        <option>Selecciona un Curso</option>
                                                        {this.state.cursos.map((respuesta, index) => {
                                                            return (
                                                                <option key={respuesta.id} value={respuesta.id}>{respuesta.curso}</option>
                                                            )
                                                        })}
                                                    </FormControl>
                                                    <br />
                                                    <Button bsStyle="info" disabled={this.state.botonVer} pullRight fill type="submit" onClick={this.handleSubmit}>Ver Preguntas</Button>
                                                </Col>
                                            </Row>
                                        </FormGroup>
                                    </Grid>



                                }
                            />

                            <Button bsStyle="info" disabled={this.state.botonPregunta} pullRight fill type="submit" onClick={this.handleShowPregunta}>Agregar Pregunta</Button>
                        </Col>
                    </Row>
                </Grid>

                {this.state.preguntas.map((respuesta, index) => {
                    return (
                        <Grid fluid className="pregunta" key={respuesta.id}>
                            <Row>
                                <Col md={12}>
                                    <Card
                                        title={respuesta.pregunta}
                                        ctTableFullWidth
                                        ctTableResponsive
                                        content={
                                        <Grid fluid>   
                                        <Row> 
                                        <Col md={12}>
                                        <div>
                                            Respuestas:
                                        </div>
                                        {respuesta.Respuesta.map((subitem,i)=>{
                                            return(
                                                <ul key={subitem.id}>{subitem.Respuesta}</ul>
                                            )
                                        })}
                    
                                        
                                    
                                        <Button bsStyle="info" id={respuesta.id} pullRight fill type="submit" onClick={this.handleShowRespuesta}>Agregar Respuesta</Button>
                                        </Col>
                                        </Row>
                                        </Grid>
                                        } />
                                </Col>
                            </Row>
                        </Grid>
                    )
                })}





                {/*This is the modal for adding pregunta*/}
                <Modal show={this.state.showPregunta} onHide={this.handleClosePregunta}>
                    <Modal.Header closeButton>
                        <Modal.Title>Agregar Pregunta</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <FormInputs
                            ncols={["col-md-12"]}
                            proprieties={[
                                {
                                    label: "Pregunta",
                                    type: "text",
                                    bsClass: "form-control",
                                    name: "preguntaNueva",
                                    onChange: this.handleModalInputChange
                                }              
                            ]}
                        />
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={this.handleClosePregunta}>Close</Button>
                        <Button bsStyle="primary" disabled={this.state.btndis} onClick={this.handleModalSubmitPregunta}>Agregar Pregunta</Button>
                    </Modal.Footer>
                </Modal>

                 {/*This is the modal for adding respuesta*/}
                 <Modal show={this.state.showRespuesta} onHide={this.handleCloseRespuesta}>
                    <Modal.Header closeButton>
                        <Modal.Title>Agregar Respuesta</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <FormInputs
                            ncols={["col-md-12"]}
                            proprieties={[
                                {
                                    label: "Respuesta",
                                    type: "text",
                                    bsClass: "form-control",
                                    name: "respuestaNueva",
                                    onChange: this.handleModalInputChangeRespuesta
                                }
                                
                            ]}
                        />
                        <ControlLabel>Es Respuesta Correcta?</ControlLabel>
                        <FormControl name="valueRespuesta" onChange={this.handleModalInputChangeRespuesta} valuerespuesta={this.state.valueRespuesta} componentClass="select" placeholder="select">
                        
                            <option value="false">No</option>
                            <option value="true">Si</option>
                        </FormControl>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={this.handleCloseRespuesta}>Close</Button>
                        <Button bsStyle="primary" disabled={this.state.botonRespuesta} onClick={this.handleModalSubmitRespuesta}>Agregar Respuesta</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )

    }
}

export default Pregunta;