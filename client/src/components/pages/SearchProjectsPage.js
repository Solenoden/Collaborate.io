import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios';

import DeveloperCard from "../DeveloperCard";
import ProjectCard from "../ProjectCard";

export default class SearchProjectsPage extends Component {
    state = {
        projects: []
    }

    static propTypes = {
        category: PropTypes.string.isRequired
    }

    componentDidMount = async () => {
        this.getProjects();
    }

    getProjects = async () => {
        const res = await axios.get("http://localhost:5000/project/");

        this.setState({
            projects: res.data
        });
    }
    filterProjects = () => {
        let filteredProjects = this.state.projects;

        filteredProjects = filteredProjects.filter((project) => project.categories[0].toLowerCase() === this.props.category.toLowerCase());

        return filteredProjects;
    }
    // Other render methods
    renderProjects = () => {
        return this.filterProjects().map((project) => {
            return <div className="mr-4 mb-4 shadow-sm"><ProjectCard cardType="basic" project={project}/></div>
        });
    }
    // Main render method
    render() {
        return (
            <div>
                <div className="text-center text-main bg-custom-secondary" style={{overflow: "hidden"}}>
                    <h1 className="my-5">{this.props.category.toUpperCase() +  " DEVELOPMENT"}</h1>
                </div>

                <div className="bg-custom-pink" style={{overflow: "hidden"}}>
                    <h3 className="text-center my-5">{"LATEST " + this.props.category.toUpperCase() + " PROJECTS"}</h3>

                    <div className="d-flex w-75 mx-auto justify-content-between mb-5">
                        <div className="shadow-lg mr-4"><ProjectCard cardType="featured"/></div>
                        <div className="shadow-lg mr-4"><ProjectCard cardType="featured"/></div>
                        <div className="shadow-lg mr-4"><ProjectCard cardType="featured"/></div>
                    </div>
                </div>

                <div style={{overflow: "hidden"}}>
                    <h3 className="text-center text-main my-3">FIND A PROJECT</h3>

                    <div className="text-white bg-main rounded-lg mx-auto p-2 mb-3 d-flex" style={{width: "80%"}}>
                        <input className="form-control" style={{width: "25%", height: "30px"}} placeholder="Project Name..."/>
                    </div>

                    <div className="d-flex w-75 mx-auto" style={{overflow: "hidden"}}>
                        {this.renderProjects()}
                    </div>
                </div>

                <div className="bg-custom-pink" style={{overflow: "hidden"}}>
                        <h3 className='text-main mt-3 mb-5 text-center'>TOP WEB DEVELOPERS</h3>

                        <div className="d-flex flex-row w-75 mx-auto mb-5 justify-content-center">
                            <div className="shadow-sm mr-4"><DeveloperCard cardType="featured"/></div>
                            <div className="shadow-sm mr-4"><DeveloperCard cardType="featured"/></div>
                            <div className="shadow-sm mr-4"><DeveloperCard cardType="featured"/></div>
                        </div>
                </div>
            </div>
        )
    }
}
