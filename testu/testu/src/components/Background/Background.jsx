import React, { Component } from 'react';
import Particles from "react-particles-js";



class Background extends Component {
    
  
    render() {
       

        return (
            <div className="fondo">

                <div >
                    <Particles
                        params={{
                            particles: {
                                number: {
                                    value: 150,
                                    density: {
                                        enable: true,
                                        value_area: 3000
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