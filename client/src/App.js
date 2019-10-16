import React from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import axios from "axios";

import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import SideNav from "./components/layout/SideNav";
import LandingPage from "./components/pages/LandingPage";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";

class App extends React.Component {


  loginUser = async (email, password) => {
    console.log(email + ": " + password);
    axios.post("http://localhost:5000/user/basicAuth", {email: email, password: password})
    .then((res) => console.log(res));
  }

  // Main render method
  render() {
    return (
      <Router>
        <div className="App">

          <Route exact path="/" render={(props) => (
            <React.Fragment>
              <SideNav/>
              <LandingPage/>
            </React.Fragment>
          )}/>

          <Route exact path="/login" component={(props) => (
            <div style={{overflow: "hidden", height: "100vh"}}>
              <SideNav/>
              <div className="mx-auto" style={{width: "fit-content", marginTop: "30vh"}}>
                <LoginForm loginUser={this.loginUser}/>
              </div>
            </div>
          )}/>

          <Route exact path="/signup" component={(props) => (
            <div style={{overflow: "hidden", height: "100vh"}}>
              <SideNav/>
              <div className="mx-auto" style={{width: "fit-content", marginTop: "30vh"}}>
                <SignupForm/>
              </div>
            </div>
          )}/>

        </div>
      </Router>
    );
  }
}

export default App;
