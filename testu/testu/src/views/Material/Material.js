import React, { Component } from 'react';
import { Grid, Row, Col, Table, Modal, ProgressBar } from "react-bootstrap";
import Card from "components/Card/Card.jsx";
import Button from "components/MaterialButton/MaterialButton.jsx";
import DeleteButton from "components/DeleteButton/DeleteButton.jsx"
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import UserAPI from "../../api/user.api";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';


class Material extends Component {

    constructor(props, context) {
        super(props, context);


        this.state = {
            materialCurso: [],
            empresa:localStorage.getItem("empresa"),
        };

    }

    componentDidMount() {
        UserAPI.getClass(this.state.empresa)

            .then(response => {
                console.log(response)
                this.setState({
                    materialCurso: response.data
                })
            })
    }

borrarDocumento(e){
    let documentoId = e.target.getAttribute("idMaterial")
    //console.log(documentoId)
    UserAPI.postBorrarDocumento({
        id:documentoId
    })
    .then(response=>{
        console.log(response)
    });

}






    render() {
        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                title="Material de Cursos"
                                ctTableFullWidth
                                ctTableResponsive
                                content={
                                   <Table>
                                       <thead>
                                            <tr>
                                                <th>
                                                    Id
                                                </th>
                                                <th>
                                                    Cursos
                                                </th>
                                                <th>
                                                    Nombre Documento
                                                </th>
                                                <th>
                                                    Ver Material
                                                </th>
                                                <th>
                                                    Borrar Material
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.materialCurso.map((respuesta, index) => {
                                                let indice = index + 1;
                                                
                                                return (

                                                    <tr key={respuesta.id}>
                                                        <td>
                                                            {indice}
                                                        </td>
                                                        <td>
                                                            {respuesta.curso}
                                                        </td>
                                                        <td>
                                                            {respuesta.documento}
                                                        </td>
                                                        <td>
                                                            <Button bsStyle="info" href={respuesta.ubicacion} fill type="submit">Link</Button>
                                                        </td>
                                                        <td>
                                                            <Button bsStyle="danger" idMaterial={respuesta.id} onClick={(e) => this.borrarDocumento(e)}fill type="submit">Borrar Material</Button>
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

export default Material;