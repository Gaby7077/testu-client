import React, { Component } from 'react';
import "./Login.css";
import UserAPI from "../../api/user.api";
import logo from "../../assets/img/testu1.png";
import Background from "components/Background/Background.jsx"
import Parallax from "react-springy-parallax";
class Login extends Component {
    state = {
        username: "",
        password: "",
        status: "",
        statusclass: "col-2",
        user: null,
        empresa: "",
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
        //const background = <Background/>
    
        return (
            <Parallax ref="parallax" pages={2}>

                <Parallax.Layer offset={0} speed={1} style={{ backgroundColor: '' }} />
                <Parallax.Layer offset={1} speed={1} style={{ backgroundColor: '#2E2E2E' }} />
               
               
                <Parallax.Layer
                    offset={0}
                    speed={0.5}
                    style={styles}
                    onClick={() => this.refs.parallax.scrollTo(1)}>
                <div>
                    <img src={logo} className="panel2" alt="logo"/>
                </div>
               {/*} <p className="texto">La forma más rápida de evaluar y certificar a tu equipo</p> {*/}
                </Parallax.Layer>
       
                <Parallax.Layer
                    offset={1}
                    speed={-0.1}
                    style={styles}
                    onClick={() => this.refs.parallax.scrollTo(1)}>
                    <div>
                    <div className="panel">
                        <div className="col-md-1">
                        </div>
                        <div className="col-md-10">
                            <h1 className="prueba">Iniciar Sesión</h1>

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
                        <div className="col-md-1">
                        </div>
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

                </Parallax.Layer>
                <Background/>
            </Parallax>

        )
    }


}
export default Login;