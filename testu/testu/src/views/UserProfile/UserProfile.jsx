import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl
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
  }


  componentDidMount() {
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
      const uploadTask = storage.ref(`images/${this.state.image.name}`).put(this.state.image);
      uploadTask.on("state_changed",
        (snapshot) => {
          //progress function ...
        },
        (error) => {
          //error function ...
          console.log(error)
        },
        () => {
          //complete function ...
          storage.ref("images").child(this.state.image.name).getDownloadURL().then(url => {
            //console.log(url)
            this.setState({
              Picture: url
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
                          label: "Company (disabled)",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Empresa",
                          value: this.state.empresa,
                          disabled: true
                        },

                        {
                          label: "Email address",
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
                          label: "First name",
                          type: "text",
                          bsClass: "form-control",
                          name: "FirstName",
                          placeholder: this.state.FirstName,
                          onChange: this.handleInputChange
                        },
                        {
                          label: "Last name",
                          type: "text",
                          bsClass: "form-control",
                          name: "LastName",
                          placeholder: this.state.LastName,
                          onChange: this.handleInputChange
                        }
                      ]}
                    />
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




                    <Button bsStyle="info" pullRight fill type="submit" onClick={this.handleUpload}>
                      Update Profile
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
