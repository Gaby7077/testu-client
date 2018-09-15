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



        this.state = {
            showPregunta: false,
            empresa: localStorage.getItem("empresa"),
            cursos: [],
            preguntas: [],
            cursoid: "",
            btndis: true,
            preguntaNueva: "",
            botonPregunta: true,
            botonVer: true,
            value: "",

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

    //Obtiene el id del curso
    handleChange(event) {
        this.setState({
            value: event.target.value,
            botonVer: false,
            botonPregunta:false
        })
    }

    //Para ver las preguntas

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
                preguntas: response.data
            })
        })
    }



    handleModalInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
            btndis: false,

        });

    };



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


    //*Funcion para cerrar el modal de agregar material
    handleClosePregunta() {
        this.setState({ showPregunta: false });
    }

    //*Funcion para abrir el modal de agregar material
    handleShowPregunta() {
        this.setState({
            showPregunta: true,
            btndis: true
        });

    }


    //*Funcion para agregar curso
    handleModalSubmit() {
        UserAPI.postCurso({
            curso: this.state.cursoNuevo,
            empresa: this.state.empresa,
        })
            .then(response => {
                console.log(response);
                this.handleClose();
                this.obtenerCursos();
            })

    }

    //*Funcion para agregar pregunta
    handleModalSubmitPregunta() {
        this.agregarPregunta();
        this.handleClosePregunta();

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
                                            <div className="content">
                                                Hola
                                            </div>
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
            </div>
        )

    }
}

export default Pregunta;