import React, { Component } from 'react';
import "./Login.css";
import UserAPI from "../../api/user.api";


class Login extends Component {
    state = {
        username: "",
        password: "",
        status: "",
        statusclass: "col-2",
        user: null,
        empresa:"",
    }

    componentDidMount() {
        UserAPI.getUser_data(localStorage.getItem("token"))
            .then(response => {
                if (response.data === null) {
                    //!Aqui se elimina localstorage cuando se vence el token
                    localStorage.removeItem("token")
                    localStorage.removeItem("role")
                    localStorage.removeItem("empresa")
                }
                else {
                    this.setState({
                        user: response.data.authData.user.email
                    })
                    //La manera de cambiar la pagina a autenficicado
                    this.props.fakeAuth.authenticate(()=>{
                        window.location.replace("/#/user")
                    })
                    //console.log(response.data.authData.user.email)
                    //*Es lo que viene en el token
                    //console.log(response)
                
                }
            })

    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();

        UserAPI.postLogin(
            {
                email: this.state.username,
                password: this.state.password
            }
        )
            .then(response => {

                console.log(response.data);

                if (response.data.mensaje === "No user") {
                    this.setState({
                        status: "No Existe Usuario",
                        statusclass: "col-3 bg-warning",
                        username: "",
                        password: ""

                    })
                }
                else {
                    if (response.data.mensaje === "Incorrect Password") {
                        this.setState({
                            status: "Password Incorrecto",
                            statusclass: "col-3 bg-warning",
                            username: "",
                            password: ""

                        })
                    }
                    else {
                        this.setState({
                            status: "Bienvenido",
                            statusclass: "col-3 bg-success text-white",

                        })
                        //!Aqui se pone el localStorage cuando es login
                        localStorage.setItem("token", response.data.token);
                        localStorage.setItem("role", response.data.role);
                        localStorage.setItem("empresa",response.data.empresa)
                        this.props.fakeAuth.authenticate(()=>{
                            window.location.replace("/#/user")
                        })
                          
                    
                        
                    }
                }

            })
            .catch(err => console.log(err));
    }






    render() {
        const loggedIn = this.state.loggedIn
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
                            <h2>Login Form</h2>
                            <form className="login">
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Email address</label>
                                    <input type="email" onChange={this.handleInputChange} value={this.state.username} name="username" className="form-control" id="email-input" placeholder="Email" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Password</label>
                                    <input type="password" className="form-control" value={this.state.password} name="password" onChange={this.handleInputChange} id="password-input" placeholder="Password" />
                                </div>
                                <button type="submit" onClick={this.handleFormSubmit} className="btn btn-default">Login</button>

                            </form>
                            <br />

                        </div>

                    </div>
                    <div className="row">
                        {loggedIn ? (
                            <div>

                            </div>

                        ) : (
                                <div className={this.state.statusclass}>
                                    {this.state.status}
                                </div>

                            )}
                    </div>
                </div>
            </div>


        )
    }


}
export default Login;