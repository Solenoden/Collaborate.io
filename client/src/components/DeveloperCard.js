import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

export default class DeveloperCard extends Component {
    static propTypes = {
        // developer: PropTypes.object.isRequired,
        // cardType: PropTypes.string.isRequired
    }

    render() {
        if (this.props.cardType === "featured") {
            return (
                // <Link to={"/developer/" + this.props.developer._id} style={{textDecoration: "none"}}>
                    <div className="d-flex flex-column" style={{width: "175px", height: "260px"}}>
                        <div className="bg-white flex-fill text-center" style={{width: "175px", height: "260px"}}>
                            <img className="rounded-circle my-auto" style={{width: "92.5px", height: "92.5px"}}/>
                        </div>

                        <div className="bg-main-alt p-3 text-center text-white">
                            <h5>Name Surname</h5>
                            <h6>Position</h6>
                        </div>
                    </div>
                // </Link>
            )
        } else if (this.props.cardType === "basic") {
            return (
                <Link to={"/developer/" + this.props.developer._id} style={{textDecoration: "none"}}>
                    <div className="d-flex flex-column" style={{width: "200px", height: "300px"}}>
                        <div className="bg-custom-secondary-alt text-center">
                            <img className="rounded-circle mx-auto my-3" style={{width: "92.5px", height: "92.5px", margin: "auto 25%"}} src={this.props.developer.profilePic}/>
                        </div>
        
                        <div className="bg-main-alt p-2 text-center text-white flex-fill">
                            <h5 className="my-1" style={{fontSIze: "18px"}}>{this.props.developer.fullName}</h5>
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
                <Link to={"/developer/" + this.props.developer._id} style={{textDecoration: "none"}}>
                    <div className="d-flex flex-column" style={{width: "175px", height: "260px"}}>
                        <div className="bg-white flex-fill">
                            <img className="rounded-circle mx-auto mt-3" style={{width: "92.5px", height: "92.5px", margin: "auto 25%"}}/>
                        </div>

                        <div className="bg-main-alt p-3 text-center text-white">
                            <h5>Name Surname</h5>
                            <h6>Position</h6>
                        </div>
                    </div>
                </Link>
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
