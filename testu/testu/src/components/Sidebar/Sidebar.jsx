import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import HeaderLinks from "../Header/HeaderLinks.jsx";

import imagine from "assets/img/sidebar-4.jpg";

//agregar y cambiar logo de TestU//

import logo from "assets/img/reactlogo.png";

import dashboardRoutes from "routes/dashboard.jsx";
import dashboardAdminRoutes from "routes/dashboardadmin.js";
import dashboardSuperRoutes from "routes/dashboardsuper.js";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
      role: localStorage.getItem("role")
    };
  }
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  updateDimensions() {
    this.setState({ width: window.innerWidth });
  }
  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }
  render() {
    const sidebarBackground = {
      backgroundImage: "url(" + imagine + ")"
    };

    //* En caso de que el usuario sea user
    if (this.state.role === "user") {
      return (
        <div
          id="sidebar"
          className="sidebar"
          data-color="black"
          data-image={imagine}
        >
          <div className="sidebar-background" style={sidebarBackground} />
          <div className="logo">
            <a
              href="https://www.creative-tim.com"
              className="simple-text logo-mini"
            >
              {/*<div className="logo-img">
                <img src={logo} alt="logo_image" / >
                </div>*/}
            </a>
              <a
                // href="https://www.creative-tim.com"
                className="simple-text logo-normal"
              >
               
  
          </a>
      </div>
            <div className="sidebar-wrapper">
              <ul className="nav">
                {this.state.width <= 991 ? <HeaderLinks /> : null}
                {dashboardRoutes.map((prop, key) => {
                  if (!prop.redirect)
                    return (
                      <li
                        className={
                          prop.upgrade
                            ? "active active-pro"
                            : this.activeRoute(prop.path)
                        }
                        key={key}
                      >
                        <NavLink
                          to={prop.path}
                          className="nav-link"
                          activeClassName="active"
                        >
                          <i className={prop.icon} />
                          <p>{prop.name}</p>
                        </NavLink>
                      </li>
                    );
                  return null;
                })}
              </ul>
            </div>
          </div>
          );
        }
        //* En caso de que el usuario sea user
    if (this.state.role === "admin") {
      return (
        <div
            id="sidebar"
            className="sidebar"
            data-color="black"
            data-image={imagine}
          >
            <div className="sidebar-background" style={sidebarBackground} />
            <div className="logo">
              <a
                href="https://www.creative-tim.com"
                className="simple-text logo-mini"
              >
                
              </a>
              <a
                // href="https://www.creative-tim.com"
                className="simple-text logo-normal"
              >
               
          </a>
            </div>
            <div className="sidebar-wrapper">
              <ul className="nav">
                {this.state.width <= 991 ? <HeaderLinks /> : null}
                {dashboardAdminRoutes.map((prop, key) => {
                  if (!prop.redirect)
                    return (
                      <li
                        className={
                          prop.upgrade
                            ? "active active-pro"
                            : this.activeRoute(prop.path)
                        }
                        key={key}
                      >
                        <NavLink
                          to={prop.path}
                          className="nav-link"
                          activeClassName="active"
                        >
                          <i className={prop.icon} />
                          <p>{prop.name}</p>
                        </NavLink>
                      </li>
                    );
                  return null;
                })}
              </ul>
            </div>
          </div>
          );
        }
        //* En caso de que el usuario sea user
    if (this.state.role === "superadmin") {
      return (
        <div
            id="sidebar"
            className="sidebar"
            data-color="black"
            data-image={imagine}
          >
            <div className="sidebar-background" style={sidebarBackground} />
            <div className="logo">
              <a
                href="https://www.creative-tim.com"
                className="simple-text logo-mini"
              >
                
              </a>
              <a
                // href="https://www.creative-tim.com"
                className="simple-text logo-normal"
              >
                
          </a>
            </div>
            <div className="sidebar-wrapper">
              <ul className="nav">
                {this.state.width <= 991 ? <HeaderLinks /> : null}
                {dashboardSuperRoutes.map((prop, key) => {
                  if (!prop.redirect)
                    return (
                      <li
                        className={
                          prop.upgrade
                            ? "active active-pro"
                            : this.activeRoute(prop.path)
                        }
                        key={key}
                      >
                        <NavLink
                          to={prop.path}
                          className="nav-link"
                          activeClassName="active"
                        >
                          <i className={prop.icon} />
                          <p>{prop.name}</p>
                        </NavLink>
                      </li>
                    );
                  return null;
                })}
              </ul>
            </div>
          </div>
          );
        }
      }
    }
    
    export default Sidebar;
