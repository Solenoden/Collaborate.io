import React from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import axios from "axios";

import './App.css';
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import SideNav from "./components/layout/SideNav";
import LandingPage from "./components/pages/LandingPage";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import ProfilePage from "./components/pages/ProfilePage";

class App extends React.Component {
  state = {
    user: {
      userID: "",
      email: "",
      fullName: "",
      username: "",
      devCategories: [],
      devSubCategories: [], 
      skills: [],
      profileDescription: "",
      profilePic: "",
      friends: [],
      notifications: []
    }
  }

  componentDidMount() {
    this.loadUser();
  }

  loginUser = async (email, password) => {
    const res = await axios.post("http://localhost:5000/user/basicAuth", {email: email, password: password});

    localStorage.setItem("userID", res.data._id);
  }

  async loadUser() {
    const userID = localStorage.getItem("userID");
    const res = await axios.get("http://localhost:5000/user/" + userID);

    const user = ({
      userID: res.data._id,
      email: res.data.email,
      fullName: res.data.fullName,
      username: res.data.username,
      devCategories: res.data.devCategories,
      devSubCategories: res.data.devSubCategories, 
      skills: res.data.skills,
      profileDescription: res.data.profileDescription,
      profilePic: res.data.profilePic,
      friends: res.data.friends,
      notifications: res.data.notifications
    });

    this.setState({user});
  }

  // Main render method
  render() {
    return (
    <div className="App">
      <Router>

          <Route exact path="/" render={(props) => (
            <React.Fragment>
              <SideNav user={this.state.user}/>
              <LandingPage/>
            </React.Fragment>
          )}/>

          <Route exact path="/login" component={(props) => (
            <div style={{overflow: "hidden", height: "100vh"}}>
              <SideNav user={this.state.user}/>
              <div className="mx-auto" style={{width: "fit-content", marginTop: "30vh"}}>
                <LoginForm loginUser={this.loginUser}/>
              </div>
            </div>
          )}/>

          <Route exact path="/signup" component={(props) => (
            <div style={{overflow: "hidden", height: "100vh"}}>
              <SideNav user={this.state.user}/>
              <div className="mx-auto" style={{width: "fit-content", marginTop: "30vh"}}>
                <SignupForm/>
              </div>
            </div>
          )}/>

          <Route exact path="/profile/me" component={(props) => (
            <React.Fragment>
              <SideNav user={this.state.user}/>
              <div style={{marginLeft: "8vw"}}>
              <ProfilePage user={this.state.user}/>
              </div>
            </React.Fragment>
          )}/>

        </Router>
      </div>
    );
  }
}

export default App;
