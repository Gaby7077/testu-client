import React, { Component } from 'react';
import { Grid, Row, Col, Table, Modal, ProgressBar } from "react-bootstrap";
import Card from "components/Card/Card.jsx";
import Button from "components/MaterialButton/MaterialButton.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import UserAPI from "../../api/user.api";
import { storage } from "../../firebase";
import userApi from '../../api/user.api';

class Curso extends Component {

    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleShowMaterial = this.handleShowMaterial.bind(this);
        this.handleCloseMaterial = this.handleCloseMaterial.bind(this);
        this.handleShowPregunta = this.handleShowPregunta.bind(this);
        this.handleClosePregunta = this.handleClosePregunta.bind(this)
        this.handleModalSubmit = this.handleModalSubmit.bind(this);
        this.agregarMaterial = this.agregarMaterial.bind(this);
        

        this.state = {
            show: false,
            showMaterial: false,
            showPregunta:false,
            empresa: localStorage.getItem("empresa"),
            cursos: [],
            cursoNuevo: "",
            cursoid: "",
            material: null,
            documento: null,
            btndis: true,
            upLoadValue: 0,
            documentoUrl: "",
            hayMaterial: ""
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

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    //*Funcion para cerrar el modal de agregar curso
    handleClose() {
        this.setState({ show: false });
    }

    //*Funcion para abrir el modal de agregar curso
    handleShow() {
        this.setState({ show: true });
    }
    //*Funcion para cerrar el modal de agregar material
    handleCloseMaterial() {
        this.setState({ showMaterial: false });
    }

    //*Funcion para abrir el modal de agregar material
    handleShowMaterial(e) {
        let prueba = e.target.getAttribute("cursoid")
        this.setState({
            showMaterial: true,
            cursoid: prueba,
            btndis: true
        });
        //console.log(prueba);
    }

     //*Funcion para cerrar el modal de agregar material
     handleClosePregunta() {
        this.setState({ showPregunta: false });
    }

    //*Funcion para abrir el modal de agregar material
    handleShowPregunta(e) {
        let prueba = e.target.getAttribute("cursoid")
        this.setState({
            showPregunta: true,
            cursoid: prueba,
        });
        //console.log(prueba);
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
            UserAPI.postCurso({
                pregunta: this.state.preguntaNueva,
                empresa: this.state.empresa,
            })
                .then(response => {
                    console.log(response);
                    this.handleClose();
                    this.obtenerCursos();
                })
    
        }

    //Funcion para borrar curso
    borrarCurso(e) {
        let cursoId = e.target.getAttribute("id")
        //console.log(documentoId)
        UserAPI.deleteBorrarCurso(cursoId)
            .then(response => {
                console.log(response)
                this.obtenerCursos();
            });

    }
    //*Funcion para añadir archivo
    FilehandleChange = event => {
        if (event.target.files[0]) {
            this.setState({
                documento: event.target.files[0],
                btndis: false
            })
        }

    };
    

      //Funcion del Modal para agregar material
    agregarMaterial = e => {
        e.preventDefault();
        if (this.state.documento) {
            let filename = `${Date.now()}${this.state.documento.name}`
            const uploadTask = storage.ref(`documentos/${filename}`).put(this.state.documento);
            uploadTask.on("state_changed",
                (snapshot) => {
                    //progress function ...
                    let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    this.setState({
                        upLoadValue: percentage
                    })
                },
                (error) => {
                    //error function ...
                    console.log(error)
                    this.setState({
                        message: `Ha ocurrido un error: ${error.message}`
                    })
                },
                () => {
                    //complete function ...
                    storage.ref("documentos").child(filename).getDownloadURL().then(url => {
                        //console.log(url)
                        this.setState({
                            documentoUrl: url,
                        })
                        userApi.postUpload({
                            CursoId: this.state.cursoid,
                            ubicacion: this.state.documentoUrl,
                            documento: this.state.material,
                            empresa: this.state.empresa
                        })
                            .then(response => {
                                console.log(response.data)
                                this.setState({
                                    documentoUrl: "",
                                    message: `Archivo cargado`,
                                    documento: null,
                                    material: null,
                                    upLoadValue: 0
                                })
                                this.handleCloseMaterial();

                            })






                    })
                }
            )
        }


    }



    render() {
        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                title="Cursos Creados"
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
                                                    Cursos
                                                </th>
                                                <th>
                                                    Contiene Material
                                                </th>
                                                <th>
                                                    Agregar Material
                                                </th>                        
                                                <th>
                                                    Agregar Preguntas
                                                </th>
                                                <th>
                                                    Crear Examen
                                                </th>
                                                <th>
                                                    Borrar Curso
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.cursos.map((respuesta, index) => {
                                                let indice = index + 1;
                                                let material;
                                                if(respuesta.Clases.length>0){
                                                    material="Si"
                                                }else{
                                                    material="No"                                                }
                                            

                                                return (

                                                    <tr key={respuesta.id}>
                                                        <td>
                                                            {indice}
                                                        </td>
                                                        <td>
                                                            {respuesta.curso}
                                                        </td>
                                                        <td>
                                                            {material}
                                                        </td>
                                                        <td>
                                                            <Button bsStyle="info" cursoid={respuesta.id} fill type="submit" onClick={(e) => this.handleShowMaterial(e)}>Agregar Material</Button>
                                                        </td>
                                                        <td>
                                                            <Button bsStyle="info" fill type="submit" onClick={(e)=>this.handleShowPregunta(e)}>Agregar Pregunta</Button>
                                                        </td>
                                                        <td>
                                                        <Button bsStyle="info" fill type="submit">Crear Examen</Button>
                                                        </td>
                                                        <td>
                                                            <Button bsStyle="danger" id={respuesta.id} fill type="submit" onClick={(e) => this.borrarCurso(e)}>Borrar Curso</Button>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>

                                    </Table>

                                }
                            />
                            <Button bsStyle="info" pullRight fill type="submit" onClick={this.handleShow}>Agregar Curso</Button>
                        </Col>
                    </Row>
                </Grid>

                {/*This is the modal for adding cursos*/}
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Agregar Curso</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <FormInputs
                            ncols={["col-md-6"]}
                            proprieties={[
                                {
                                    label: "Nombre Curso",
                                    type: "text",
                                    bsClass: "form-control",
                                    name: "cursoNuevo",
                                    onChange: this.handleInputChange
                                }
                            ]}
                        />
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={this.handleClose}>Close</Button>
                        <Button bsStyle="primary" onClick={this.handleModalSubmit}>Agregar Curso</Button>
                    </Modal.Footer>
                </Modal>

                {/*This is the modal for adding material*/}
                <Modal show={this.state.showMaterial} onHide={this.handleCloseMaterial}>
                    <Modal.Header closeButton>
                        <Modal.Title>Agregar Material</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <FormInputs
                            ncols={["col-md-6"]}
                            proprieties={[
                                {
                                    label: "Nombre Material",
                                    type: "text",
                                    bsClass: "form-control",
                                    name: "material",
                                    onChange: this.handleInputChange
                                }
                            ]}
                        />
                        <ProgressBar active now={this.state.upLoadValue} />
                        <FormInputs
                            ncols={["col-md-6"]}
                            proprieties={[
                                {
                                    label: "Cargar Documento",
                                    type: "file",
                                    bsClass: "form-control",
                                    onChange: this.FilehandleChange
                                }
                            ]}
                        />
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={this.handleCloseMaterial}>Close</Button>
                        <Button bsStyle="primary" disabled={this.state.btndis} onClick={this.agregarMaterial}>Agregar Material</Button>
                    </Modal.Footer>
                </Modal>

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
                                    onChange: this.handleInputChange
                                }
                            ]}
                        />
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={this.handleClosePregunta}>Close</Button>
                        <Button bsStyle="primary" onClick={this.handleModalSubmitPregunta}>Agregar Pregunta</Button>
                    </Modal.Footer>
                </Modal>

            </div>
        )
    }

}

export default Curso;