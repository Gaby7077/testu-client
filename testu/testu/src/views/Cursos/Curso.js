import React, { Component } from 'react';
import { Grid, Row, Col, Table, Modal } from "react-bootstrap";
import Card from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import UserAPI from "../../api/user.api";

class Curso extends Component {

    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            show: false,
            empresa:localStorage.getItem("empresa"),
            cursos:[],
        };
    }

    componentDidMount(){
        UserAPI.getCurso(this.state.empresa)
        
        .then(response=>{
            console.log(response)
            this.setState({
                cursos:response.data
            })
        })
    }


    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
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
                                                    Agregar Material
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.cursos.map((respuesta,index)=>{
                                                let indice=index+1;
                                                return(
                                                <tr key={respuesta.id}>
                                                    <td>
                                                        {indice}
                                                    </td>
                                                    <td>
                                                        {respuesta.curso}
                                                    </td>
                                                    <td>
                                                        <Button bsStyle="info" fill type="submit">Agregar Material</Button>
                                                    </td>
                                                </tr>
                                            )})}
                                        </tbody>

                                    </Table>

                                }
                            />
                            <Button bsStyle="info" pullRight fill type="submit" onClick={this.handleShow}>Agregar Curso</Button>
                        </Col>
                    </Row>
                </Grid>

                {/*This is the modal div*/}
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
                                    //onChange: this.handleChange
                                }
                            ]}
                        />
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={this.handleClose}>Close</Button>
                        <Button bsStyle="primary">Agregar Curso</Button>
                    </Modal.Footer>
                </Modal>

            </div>
        )
    }

}

export default Curso;