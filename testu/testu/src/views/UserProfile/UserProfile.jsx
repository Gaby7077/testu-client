import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  ProgressBar
} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { UserCard } from "components/UserCard/UserCard.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

import UserAPI from "../../api/user.api";

import { storage } from "../../firebase";



class UserProfile extends Component {
  state = {
    email: "",
    FirstName: "",
    LastName: "",
    empresa: "",
    Picture: "",
    image: null,
    message:"",
    upLoadValue:0
  }


  componentDidMount() {
    this.datosUsuario();

  }

  datosUsuario(){
    UserAPI.getUser_data(localStorage.getItem("token"))
    .then(response => {
      if (response.data === null) {
        localStorage.removeItem("token")
        localStorage.removeItem("role")
        /* window.location.replace("/");*/
      }
      else {
        this.setState({
          email: response.data.authData.user.email,
          FirstName: response.data.authData.user.FirstName,
          LastName: response.data.authData.user.LastName,
          empresa: response.data.authData.user.empresa,
          Picture: response.data.authData.user.Picture,
        })
        //console.log(response.data.authData.user.email)
        //*Es lo que viene en el token
        //console.log(response)

      }
    })
  }

  handleChange = event => {
    if (event.target.files[0]) {
      this.setState({
        image: event.target.files[0]
      })
    }
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleUpload = e => {
    e.preventDefault();
    if (this.state.image) {
      let filename=`${this.state.image.name}${Date.now()}`
      const uploadTask = storage.ref(`images/${filename}`).put(this.state.image);
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
          storage.ref("images").child(filename).getDownloadURL().then(url => {
            //console.log(url)
            this.setState({
              Picture: url,
              message:`Archivo cargado`
            })
            UserAPI.putUpdate({
              email: this.state.email,
              FirstName: this.state.FirstName,
              LastName: this.state.LastName,
              Picture: this.state.Picture

            })
              .then(response => {
                console.log(response)
        
              })

          })
        }
      )
    }
    else{
      UserAPI.putUpdate({
        email: this.state.email,
        FirstName: this.state.FirstName,
        LastName: this.state.LastName,
        Picture: this.state.Picture

      })
        .then(response => {
          console.log(response)
        })
    }
  }






  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={8}>
              <Card
                title="Edit Profile"
                content={
                  <form>
                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      proprieties={[
                        {
                          label: "Empresa (disabled)",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Empresa",
                          value: this.state.empresa,
                          disabled: true
                        },

                        {
                          label: "Correo electrónico",
                          type: "email",
                          bsClass: "form-control",
                          value: this.state.email,
                          disabled: true

                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      proprieties={[
                        {
                          label: "Nombre",
                          type: "text",
                          bsClass: "form-control",
                          name: "FirstName",
                          placeholder: this.state.FirstName,
                          onChange: this.handleInputChange
                        },
                        {
                          label: "Apellido",
                          type: "text",
                          bsClass: "form-control",
                          name: "LastName",
                          placeholder: this.state.LastName,
                          onChange: this.handleInputChange
                        }
                      ]}
                    />
                    <ProgressBar active now={this.state.upLoadValue} />
                    <FormInputs
                      ncols={["col-md-6"]}
                      proprieties={[
                        {
                          label: "Cargar Imagen",
                          type: "file",
                          bsClass: "form-control",
                          onChange: this.handleChange
                        }
                      ]}
                    />
                    <div>
                      {this.state.message}
                    </div>


                    
                    <Button bsStyle="info" pullRight fill type="submit" onClick={this.handleUpload}>
                      Actualizar perfil

                    </Button>
                    <div className="clearfix" />
                  </form>
                }
              />
            </Col>
            <Col md={4}>
              <UserCard
                bgImage="https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400"
                avatar={this.state.Picture}
                name={`${this.state.FirstName}  ${this.state.LastName}`} 


              />
            </Col>
          </Row>
        </Grid>>
      </div>
    );
  }
}

export default UserProfile;
