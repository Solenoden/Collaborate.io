import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import axios from "axios";

import './App.css';
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import SideNav from "./components/layout/SideNav";
import LandingPage from "./components/pages/LandingPage";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import ProfilePage from "./components/pages/ProfilePage";
import SearchDevelopersPage from './components/pages/SearchDevelopersPage';
import ProjectPage from './components/pages/ProjectPage';
import SearchProjectCategoriesPage from './components/pages/SearchProjectCategoriesPage';
import SearchProjectsPage from './components/pages/SearchProjectsPage';
import CreateProjectForm from "./components/CreateProjectForm";
import ManageProjectPage from "./components/pages/ManageProjectPage";

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

  getUser = async (userID) => {
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

    return user;
  }

  loginUser = async (email, password) => {
    const res = await axios.post("http://localhost:5000/user/basicAuth", {email: email, password: password});
    localStorage.setItem("userID", res.data._id);
  }

  async loadUser() {
    const userID = localStorage.getItem("userID");
    
    const user = await this.getUser(userID);

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
            <div style={{overflow: "hidden", minHeight: "100vh"}}>
              <SideNav user={this.state.user}/>
              <div className="mx-auto my-auto" style={{width: "fit-content"}}>
                <SignupForm loginUser={this.loginUser}/>
              </div>
            </div>
          )}/>

          <Route exact path="/profile/me" component={(props) => (
            <div style={{overflow: "hidden"}}>
              <SideNav user={this.state.user}/>
              <div style={(window.innerWidth > 1300) ? {marginLeft: "8vw"} : {marginTop: "10vh"}}>
                <ProfilePage user={this.state.user} editable={true}/>
              </div>
            </div>
          )}/>

          <Route exact path="/developer/:id" component={(props) => (
            <div style={{overflow: "hidden"}}>
              <SideNav user={this.state.user}/>
              <div style={(window.innerWidth > 1300) ? {marginLeft: "8vw"} : {marginTop: "10vh"}}>
                <ProfilePage userID={props.match.params.id} getUser={this.getUser} editable={false}/>
              </div>
            </div>
          )}/>

          <Route exact path="/developers" component={(props) => (
            <div style={{overflow: "hidden"}}>
              <SideNav user={this.state.user} />
              <div style={(window.innerWidth > 1300) ? {marginLeft: "8vw"} : {marginTop: "10vh"}}>
                <SearchDevelopersPage/>
              </div>
            </div>
          )}/>

          <Route exact path="/project/create" render={(props) => (
            <div style={{overflow: "hidden"}}>
              <SideNav user={this.state.user} />
              <div className="mx-auto" style={{width: "fit-content", marginTop: "5vh"}}>
                <CreateProjectForm founder={this.state.user}/>
              </div>
            </div>
          )}/>

          <Route exact path="/project/view/:id" render={(props) => (
            <div style={{overflow: "hidden"}}>
              <SideNav user={this.state.user} />
              <div style={(window.innerWidth > 1300) ? {marginLeft: "8vw"} : {marginTop: "10vh"}}>
                <ProjectPage projectID={props.match.params.id} user={this.state.user} getUser={this.getUser}/>
              </div>
            </div>
          )}/>

          <Route exact path="/project/manage/:id" render={(props) => (
            <div style={{overflow: "hidden"}}>
              <SideNav user={this.state.user} />
              <div style={(window.innerWidth > 1300) ? {marginLeft: "8vw"} : {marginTop: "10vh"}}>
                <ManageProjectPage projectID={props.match.params.id} user={this.state.user} getUser={this.getUser}/>
              </div>
            </div>
          )}/>

          <Route exact path="/projects" render={(props) => (
            <div style={{overflow: "hidden"}}>
              <SideNav user={this.state.user} />
              <div style={(window.innerWidth > 1300) ? {marginLeft: "8vw"} : {marginTop: "10vh"}}>
                <SearchProjectCategoriesPage/>
              </div>
            </div>
          )}/>

          <Route exact path="/projects/:category" render={(props) => (
            <div style={{overflow: "hidden"}}>
              <SideNav user={this.state.user} />
              <div style={(window.innerWidth > 1300) ? {marginLeft: "8vw"} : {marginTop: "10vh"}}>
                <SearchProjectsPage category={props.match.params.category.toLowerCase()}/>
              </div>
            </div>
          )}/>

        </Router>
      </div>
    );
  }
}

export default App;
