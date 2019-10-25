import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

export default class SideNav extends Component {
    static propTypes = {
        user: PropTypes.object
    }

    renderLoginStatus() {
        if (this.props.user) {
            return (
                <div className="text-center">
                    <div className="dropdown dropright">
                        <img className="my-3 rounded-circle dropdown-toggle" style={{width: "75px", height: "75px"}} src={this.props.user.profilePic} alt="Profile" data-toggle="dropdown"/>
                        <div className="dropdown-menu">
                            <Link to="/profile/me" className="dropdown-item">Profile</Link>
                            <Link to="/project/create" className="dropdown-item">Create Project</Link>
                            <Link to="/signout" className="dropdown-item">Signout</Link>
                        </div>
                    </div>
                    <h6 className="text-white">{this.props.user.fullName}</h6>
                </div>
            )
        } else {
            return (
            <React.Fragment>
                <Link to="/login" style={{textDecoration: "none"}}><button className="btn btn-primary">LOGIN</button></Link>
            </React.Fragment>
            )
        }
    }

    render() {
        return (
            <div className="d-flex flex-column justify-content-between shadow-lg" style={{width: "8vw", height: "100vh", backgroundColor: "#260223", float: "left", position: "fixed"}}>
                <div className="d-flex flex-column p-2">
                    {this.renderLoginStatus()}
                </div>

                <div className="p-2 text-main text-center" style={{backgroundColor: "#A4BF44"}}>
                    <Link to="/" className="text-main" style={{textDecoration: "none"}}><h6 className="mb-3">HOME</h6></Link>
                    <Link to="/projects" className="text-main" style={{textDecoration: "none"}}><h6 className="mb-3">PROJECTS</h6></Link>
                    <Link to="/developers" className="text-main" style={{textDecoration: "none"}}><h6 className="mb-3">DEVELOPERS</h6></Link>
                    <Link to="/help" className="text-main" style={{textDecoration: "none"}}><h6>HELP</h6></Link>
                </div>

                <div>
                </div>
            </div>
        )
    }
}
