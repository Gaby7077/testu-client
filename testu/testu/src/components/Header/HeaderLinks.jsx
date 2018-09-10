import React, { Component } from "react";
import { NavItem, Nav, NavDropdown, MenuItem } from "react-bootstrap";

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
    const notification = (
      <div>
        <i className="fa fa-globe" />
        <b className="caret" />
        <span className="notification">5</span>
        <p className="hidden-lg hidden-md">Notification</p>
      </div>
    );
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
