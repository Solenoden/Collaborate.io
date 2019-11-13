import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

export default class DeveloperCard extends Component {

    static propTypes = {
        developer: PropTypes.object,
        cardType: PropTypes.string.isRequired
    }

    // Main render method
    render() {
        if (this.props.cardType === "featured") {
            return (
                // <Link to={"/developer/" + this.props.developer._id} style={{textDecoration: "none"}}>
                    <div className="d-flex flex-column card-hover-dark" style={{width: "175px", height: "260px"}}>
                        <div className="bg-white flex-fill d-flex" style={{width: "175px", height: "260px"}}>
                            <img className="rounded-circle my-auto mx-auto" style={{width: "92.5px", height: "92.5px"}} alt="Profile" src={(this.props.developer) ? this.props.developer.profilePic : "https://icon-library.net/images/default-profile-icon/default-profile-icon-24.jpg"}/>
                        </div>

                        <div className={(this.props.colorScheme === "main") ? "bg-main-alt text-white p-3 text-center" : "bg-custom-secondary text-main p-3 text-center"}>
                            <h5>Name Surname</h5>
                            <h6>Position</h6>
                        </div>
                    </div>
                // </Link>
            )
        } else if (this.props.cardType === "basic") {
            return (
                <Link to={"/developer/" + this.props.developer._id} style={{textDecoration: "none"}}>
                    <div className="d-flex flex-column card-hover-gray text-white" style={{width: "200px", height: "300px"}} >
                        <div className="bg-custom-secondary-alt text-center">
                            <img className="rounded-circle mx-auto my-3" style={{width: "92.5px", height: "92.5px", margin: "auto 25%"}} src={this.props.developer.profilePic} alt="profile"/>
                        </div>
        
                        <div className="bg-main-alt p-2 text-center flex-fill">
                            <h5 className="my-1" style={{fontSize: "18px"}}>{this.props.developer.fullName}</h5>
                            <h6 className="font-weight-normal" style={{fontSize: "14px"}}>{this.props.developer.devCategories[0] + " | " + this.props.developer.devSubCategories.join(", ")}</h6>
                            <div className="d-flex flex-column mt-2">
                                <p className="my-0" style={{fontSize: "10px"}}>{this.props.developer.skills[0]}</p>
                                <p className="my-0" style={{fontSize: "10px"}}>{this.props.developer.skills[1]}</p>
                                <p className="my-0" style={{fontSize: "10px"}}>{this.props.developer.skills[2]}</p>
                                <p className="my-0" style={{fontSize: "10px"}}>{this.props.developer.skills[3]}</p>
                            </div>
                        </div>
                    </div>
                </Link>
            )
        } else if (this.props.cardType === "team") {
            return (
                <Link to={"/developer/" + this.props.developer.developerID} style={{textDecoration: "none"}}>
                    <div className="d-flex flex-column card-hover-dark" style={{width: "175px", height: "260px"}}>
                        <div className="bg-white text-center">
                            <img className="rounded-circle mx-auto" style={{width: "92.5px", height: "92.5px", marginTop: "23px", marginBottom: "23px"}} src={this.props.developer.profilePic} alt="profile"/>
                        </div>

                        <div className="bg-main-alt p-3 text-center text-white flex-fill">
                            <h5>{this.props.developer.fullName}</h5>
                            <h6 className="font-weight-normal small">{this.props.developer.position}</h6>
                        </div>
                    </div>
                </Link>
            )
        } else if (this.props.cardType === "founder") {
            return (
                <Link to={"/developer/" + this.props.developer.developerID} style={{textDecoration: "none"}}>
                    <div className="d-flex flex-row bg-white text-main card-hover-dark" style={{width: "400px", height: "200px"}}>
                        <div className="w-50 h-100 text-center"> 
                            <img src={this.props.developer.profilePic} className="w-50 h-50 rounded-circle" style={{marginTop: "25%", marginBottom: "25%"}} alt="profile"/>
                        </div>

                        <div className="w-50 h-100 d-flex flex-column justify-content-center">
                            <h3>{this.props.developer.fullName}</h3>
                            <h6>{this.props.developer.email}</h6>
                        </div>
                    </div>
                </Link>
            )
        } else if (this.props.cardType === "vacancy") {
            return (
                <div className="d-flex flex-column card-hover-dark" style={{width: "175px", height: "260px"}}>
                    <div className="bg-white flex-fill d-flex">
                        <h4 className="my-auto mx-auto">VACANCY</h4>
                    </div>

                    <div className="bg-main-alt p-3 text-center text-white">
                        <h5 className="my-1" style={{fontSize: "18px"}}>{this.props.developer.position}</h5>
                        <div className="d-flex flex-column mt-2">
                            <p className="my-0" style={{fontSize: "10px"}}>{this.props.developer.skills[0]}</p>
                            <p className="my-0" style={{fontSize: "10px"}}>{this.props.developer.skills[1]}</p>
                            <p className="my-0" style={{fontSize: "10px"}}>{this.props.developer.skills[2]}</p>
                            <p className="my-0" style={{fontSize: "10px"}}>{this.props.developer.skills[3]}</p>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <h1>Developer not found.</h1>
                </div>
            )
        }
    }
}
