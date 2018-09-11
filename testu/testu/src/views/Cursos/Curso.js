import React, { Component } from 'react';
import { Grid, Row, Col, Table, Modal, ProgressBar } from "react-bootstrap";
import Card from "components/Card/Card.jsx";
import Button from "components/MaterialButton/MaterialButton.jsx";
import DeleteButton from "components/DeleteButton/DeleteButton.jsx"
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
        this.handleModalSubmit = this.handleModalSubmit.bind(this);
        this.agregarMaterial = this.agregarMaterial.bind(this);

        this.state = {
            show: false,
            showMaterial: false,
            empresa: localStorage.getItem("empresa"),
            cursos: [],
            cursoNuevo: "",
            cursoid: "",
            material: null,
            documento: null,
            btndis: true,
            upLoadValue:0,
            documentoUrl:"",
        };
    }

    componentDidMount() {
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


    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    handleCloseMaterial() {
        this.setState({ showMaterial: false });
    }

    handleShowMaterial(e) {
        let prueba = e.target.getAttribute("cursoid")
        this.setState({
            showMaterial: true,
            cursoid: prueba,
            btndis:true
        });
        //console.log(prueba);
    }

    handleModalSubmit() {
        UserAPI.postCurso({
            curso: this.state.cursoNuevo,
            empresa: this.state.empresa,
        })
            .then(response => {
                console.log(response);
                this.handleClose();
            })

    }
//Funcion para añadir archivo
    FilehandleChange = event => {
        if (event.target.files[0]) {
            this.setState({
                documento: event.target.files[0],
                btndis:false
            })
        }
      
    }

    
    //Funcion del Modal para agregar material
    agregarMaterial= e => {
            e.preventDefault();
            if (this.state.documento) {
              let filename=`${Date.now()}${this.state.documento.name}`
              const uploadTask = storage.ref(`documentos/${filename}`).put(this.state.documento);
              uploadTask.on("state_changed",
                (snapshot) => {
                  //progress function ...
                  let percentage=(snapshot.bytesTransferred/snapshot.totalBytes)*100
                  this.setState({
                    upLoadValue:percentage
                  })
                },
                (error) => {
                  //error function ...
                  console.log(error)
                  this.setState({
                    message:`Ha ocurrido un error: ${error.message}`
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
                        curso:this.state.cursoid,
                        ubicacion: this.state.documentoUrl,
                        documento:this.state.material,
                        empresa:this.state.empresa
                    })
                    .then(response=>{
                        console.log(response.data)
                        this.setState({
                            documentoUrl: "",
                            message:`Archivo cargado`,
                            documento:null,
                            material:null,
                            upLoadValue:0
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
                                                    Borrar Curso
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.cursos.map((respuesta, index) => {
                                                let indice = index + 1;
                                                let hayMaterial;
                                                if (respuesta.Material) {
                                                    hayMaterial = "Si"
                                                }
                                                else {
                                                    hayMaterial = "No"
                                                }
                                                return (

                                                    <tr key={respuesta.id}>
                                                        <td>
                                                            {indice}
                                                        </td>
                                                        <td>
                                                            {respuesta.curso}
                                                        </td>
                                                        <td>
                                                            {hayMaterial}
                                                        </td>
                                                        <td>
                                                            <Button bsStyle="info" cursoid={respuesta.curso} fill type="submit" onClick={(e) => this.handleShowMaterial(e)}>Agregar Material</Button>
                                                        </td>
                                                        <td>
                                                            <DeleteButton bsStyle="danger" id={respuesta.id} fill type="submit">Borrar Curso</DeleteButton>
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
                        <Modal.Title>Agregar Material para {this.state.cursoid}</Modal.Title>
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

            </div>
        )
    }

}

export default Curso;