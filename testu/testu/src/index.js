import React from "react";
import ReactDOM from "react-dom";
import Login from "views/Login"

import { BrowserRouter as Router, HashRouter, Route, Switch, Link,Redirect } from "react-router-dom";

import indexRoutes from "routes/index.jsx";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/sass/light-bootstrap-dashboard.css?v=1.2.0";
import "./assets/css/demo.css";
import "./assets/css/pe-icon-7-stroke.css";

const fakeAuth={
  isAuthenticaded:false,
  authenticate(cb){
    this.isAuthenticaded=true;
    setTimeout(cb,100) // fake async
  },
  signout(cb){
    this.isAuthenticaded=false;
    setTimeout(cb,100)
  }
}

const PrivateRoute=({component:Component,...rest})=>(
  <Route {...rest} render={(props)=>(
    fakeAuth.isAuthenticaded===true
    ?<Component {...props}/>
    :<Redirect to="/" />
  )}/>
)

ReactDOM.render(
  <HashRouter>
    <Switch>
      <Route exact path="/" render={()=><Login
      fakeAuth={fakeAuth}/>}/>
      {indexRoutes.map((prop, key) => {
        return <PrivateRoute to={prop.path} component={prop.component} key={key} />;
      })}
    </Switch>
  </HashRouter>,
  document.getElementById("root")
);
