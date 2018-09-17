import React, { Component } from 'react';
import "./Login.css";
import UserAPI from "../../api/user.api";
import Parallax from "react-springy-parallax";
import logo from "../../assets/img/logotestu.png";

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
                    localStorage.removeItem("user")
                }
                else {
                    this.setState({
                        user: response.data.authData.user.email
                    })
                    
                        window.location.replace("/#/user")
                    
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
                        localStorage.setItem("user",response.data.id)
                            window.location.replace("/#/user")
                        
                          
                    
                        
                    }
                }

            })
            .catch(err => console.log(err));
    }






    render() {
        const loggedIn = this.state.loggedIn
        const styles = {
            fontFamily: 'Menlo-Regular, Menlo, monospace',
            fontSize: 14,
            lineHeight: '10px',
            color: 'white',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
        }
        return (
            <div>
                <Parallax ref="parallax" pages={2}>

                    <Parallax.Layer className="primerlayer" offset={0} speed={1} style={{ }} />
                    <Parallax.Layer offset={1} speed={1} style={{ backgroundColor: '#805E73' }} />
                    <Parallax.Layer offset={2} speed={1} style={{ backgroundColor: '#87BCDE' }} />

                    <Parallax.Layer
                        offset={0}
                        speed={0.5}
                        style={styles}
                        onClick={() => this.refs.parallax.scrollTo(1)}>
                        <div className="container">
                            <div className="row">
                            <div className="col-md-3 col-md-offset-1"></div>
                                <div className="col-md-6 col-md-offset-3">
                                    <img src={logo} alt="logo"/>
                                </div>
                            <div className="col-md-3 col-md-offset-1"></div>
                            </div>
                            <div className="row">
                            <div className="col-md-3 col-md-offset-1"></div>
                                <div className="col-md-6 col-md-offset-3">
                                    TestU is an app that allows you to create courses and tests, to streamline the process of training within the company. TestU allows you to create and customize courses and tests. 
                                </div>
                            <div className="col-md-3 col-md-offset-1"></div>
                            </div>
                            </div>
                        
                    </Parallax.Layer>

                    <Parallax.Layer
                        offset={1}
                        speed={-0.1}
                        style={styles}
                        onClick={() => this.refs.parallax.scrollTo(2)}>
                         <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-md-offset-3">
                            <h2>Iniciar sesión</h2>
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





        </Parallax.Layer>

                  

                </Parallax>


               
                
            </div>


        )
    }


}
export default Login;