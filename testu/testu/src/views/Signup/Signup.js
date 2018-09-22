import React, { Component } from 'react';
import "./Signup.css";
import UserAPI from "../../api/user.api";
import Button from "components/MaterialButton/MaterialButton.jsx";
import {  Modal } from "react-bootstrap";


class Signup extends Component {
    state = {
        username: "",
        password: "",
        empresa: "",
    }



    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        UserAPI.postSignup(
            {
                email: this.state.username,
                password: this.state.password,
                empresa: this.state.empresa
            })
            .then(response => {
                this.setState({
                    showPregunta: true,
                })
                console.log(response)
                //window.location.replace("/login")
            })
    }

    handleClosePregunta = event => {
        event.preventDefault();
                this.setState({
                    username: "",
                    password: "",
                    empresa: "",
                    showPregunta: false,
                })
                
    }

    logout = event => {
    event.preventDefault();
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    window.location.replace("/")
    }


    render() {
        return (
            <div>
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                        </div>
                    </div>
                </nav>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-md-offset-3">
                            <h2>Dar de Alta Empresa</h2>
                            <form className="login">
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Email address</label>
                                    <input type="email" autoFocus onChange={this.handleInputChange} name="username" className="form-control" id="email-input"  value={this.state.username} placeholder="Email" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="Empresa">Empresa</label>
                                    <input type="text" onChange={this.handleInputChange} name="empresa" className="form-control" id="empresa-input" value={this.state.empresa}  placeholder="Empresa" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Password</label>
                                    <input type="password" className="form-control" name="password" onChange={this.handleInputChange} id="password-input" value={this.state.password} placeholder="Password" />
                                </div>
                                <button type="submit" onClick={this.handleFormSubmit} className="btn btn-default">Dar de Alta</button>
                                

                            </form>
                            <br />

                        </div>

                    </div>
                </div>
                <Modal show={this.state.showPregunta} onHide={this.handleClosePregunta}>
                <Modal.Header closeButton>
                    <Modal.Title>Usuario Agregado</Modal.Title>
                </Modal.Header>

                <Modal.Footer>
                    <Button onClick={this.handleClosePregunta}>Close</Button>
                </Modal.Footer>
            </Modal>
            </div>


        )
    }


}
export default Signup;