import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

export default class ProjectCard extends Component {
    static propTypes = {
        cardType: PropTypes.string,
        project: PropTypes.object,
        category: PropTypes.string
    }

    render() {
        if (this.props.cardType === "featured") {
            return (
            <Link to={"/project/view/" + this.props.project._id} style={{textDecoration: "none"}}>
                <div className="text-main bg-white p-2 d-flex card-hover-dark" style={{width: "300px", height: "150px"}}>
                    <div className="mx-auto my-auto text-center">
                        <h5>{this.props.project.title}</h5>
                        <p className="my-2">{this.props.project.technologies.slice(0, 3).join(", ")}</p>
                    </div>
                </div>
            </Link>)
        } else if (this.props.cardType === "basic") {
            return (
                <Link to={"/project/view/" + this.props.project._id} style={{textDecoration: "none"}}>
                <div className="text-main bg-white p-2 d-flex card-hover-gray" style={{width: "300px", height: "150px"}}>
                    <div className="mx-auto my-auto text-center">
                        <h5 className="my-auto">{this.props.project.title}</h5>
                        <p className="my-2">{this.props.project.technologies.slice(0, 3).join(", ")}</p>
                    </div>
                </div>
                </Link>
            )
        } else if (this.props.cardType === "category") {
            return (
                <Link to={"/projects/" + this.props.category.toLowerCase()} className="text-main" style={{textDecoration: "none"}}>
                <div className="text-main bg-white p-2 d-flex card-hover-gray" style={{width: "250px", height: "125px"}}>
                    <h3 className="my-auto mx-auto">{this.props.category}</h3>
                </div>
                </Link>
            )
        } else {
            return (
                <div className="text-danger bg-white p-2 d-flex" style={{width: "300px", height: "150px"}}>
                    <div className="mx-auto my-auto text-center">
                        <h5>No Project Found</h5>
                        <p className="my-2">Contact Administrator</p>
                    </div>
                </div>
            )
        }
    }
}
