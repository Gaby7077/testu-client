import React, { Component } from "react";
import { NavItem, Nav} from "react-bootstrap";

class HeaderLinks extends Component {

  logout = e => {
    e.preventDefault();
    //!Aqui es para el logout
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    localStorage.removeItem("empresa")
    window.location.replace("/")
  }

  render() {
    
    return (
      <div>

        <Nav pullRight>

          <NavItem onClick={this.logout}>
            Log out
          </NavItem>
        </Nav>
      </div>
    );
  }
}

export default HeaderLinks;
