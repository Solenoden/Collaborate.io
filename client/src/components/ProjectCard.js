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
            <Link to={"/project/view/"}>
                <div className="text-main bg-white p-2 d-flex" style={{width: "300px", height: "150px"}}>
                    <div className="mx-auto my-auto text-center">
                        <h5>{"Title"}</h5>
                        <p className="my-2">{"Skill 1, Skill 2, Skill 3, Skill 4"}</p>
                    </div>
                </div>
            </Link>)
        } else if (this.props.cardType === "basic") {
            return (
                <Link to={"/project/view/" + this.props.project._id}>
                <div className="text-main bg-white p-2 d-flex" style={{width: "300px", height: "150px"}}>
                    <div className="mx-auto my-auto text-center">
                        <h5 className="my-auto">{this.props.project.title}</h5>
                        <p className="my-2">{this.props.project.technologies[0] + " " + this.props.project.technologies[1] + " " + this.props.project.technologies[2] + " " + this.props.project.technologies[3]}</p>
                    </div>
                </div>
                </Link>
            )
        } else if (this.props.cardType === "category") {
            return (
                <Link to={"/projects/" + this.props.category.toLowerCase()} className="text-main" style={{textDecoration: "none"}}>
                <div className="text-main bg-white p-2 d-flex" style={{width: "200px", height: "100px"}}>
                    <h3 className="my-auto mx-auto">{this.props.category}</h3>
                </div>
                </Link>
            )
        } else {
            return (
                <div className="text-white bg-danger p-2 text-center" style={{width: "200px", height: "100px"}}>
                    <h3 className="my-auto" style={{verticalAlign: "middle", display: "table-cell"}}>No Project Found</h3>
                </div>
            )
        }
    }
}
