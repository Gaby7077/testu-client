import React, { Component } from 'react';
import logo from "../../assets/img/logotestu.png";
import Particles from "react-particles-js";



class Background extends Component {
    
  
    render() {
       

        return (
            <div className="fondo particle">

                <div className="container">
                    <Particles
                        params={{
                            particles: {
                                number: {
                                    value: 150,
                                    density: {
                                        enable: true,
                                        value_area: 500
                                    }
                                }
                            }
                        }}

                    />

                </div>
       








            </div>


        )
    }


}
export default Background;