import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import SideNav from "./layout/SideNav";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">

          <Route exact path="/" render={(props) => (
            <React.Fragment>
              <SideNav className="float-left h-100" style={{float: "left", position: "relative"}} />
              <div>
                <div className="text-white text-center" style={{backgroundColor: "#593F59", height: "100vh"}}>
                  <h1 style={{marginTop: "40vh"}}>Collaborate.io</h1>
                  <p>A place where software developers can come together to collaborate, and make something great.</p>
                </div>
              </div>
            </React.Fragment>
          )}/>

        </div>
      </Router>
    );
  }
}

export default App;
