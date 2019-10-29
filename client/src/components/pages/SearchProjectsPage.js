import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios';

import DeveloperCard from "../DeveloperCard";
import ProjectCard from "../ProjectCard";

export default class SearchProjectsPage extends Component {
    state = {
        projects: [],

        latestProjects: []
    }

    static propTypes = {
        category: PropTypes.string.isRequired
    }

    componentDidMount = async () => {
        this.getProjects();
        this.getLatestProjects();
    }

    getProjects = async () => {
        const res = await axios.get("http://localhost:5000/project/");

        this.setState({
            projects: res.data
        });
    }

    getLatestProjects = async () => {
        const res = await axios.get("http://localhost:5000/project/latest/" + this.props.category);
        // console.log(res);
        this.setState({
            latestProjects: res.data
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
            <div className="container">
                <div className="text-center text-white bg-main-alt mb-5 shadow-lg" style={{overflow: "hidden", borderRadius: "0 0 0.75rem 0.75rem"}}>
                    <h1 className="my-5">{this.props.category.toUpperCase() +  " DEVELOPMENT"}</h1>
                </div>

                <div className="bg-custom-secondary text-main mb-3 shadow-sm" style={{overflow: "hidden", borderRadius: "1.5rem"}}>
                    <h3 className="text-center my-5">{"LATEST " + this.props.category.toUpperCase() + " PROJECTS"}</h3>

                    <div className="d-flex w-100 mx-auto justify-content-around mb-5">
                        <div className="shadow-lg"><ProjectCard cardType="featured"/></div>
                        <div className="shadow-lg"><ProjectCard cardType="featured"/></div>
                        <div className="shadow-lg"><ProjectCard cardType="featured"/></div>
                    </div>
                </div>

                <div style={{overflow: "hidden"}}>
                    <h3 className="text-center text-main my-3">FIND A PROJECT</h3>

                    <div className="text-white bg-main mx-auto p-2 mb-3 d-flex rounded-lg" style={{width: "80%"}}>
                        <input className="form-control" style={{width: "25%", height: "30px"}} placeholder="Project Name..."/>
                    </div>

                    <div className="d-flex w-75 mx-auto" style={{overflow: "hidden"}}>
                        {this.renderProjects()}
                    </div>
                </div>

                <div className="bg-custom-secondary shadow-sm" style={{overflow: "hidden", borderRadius: "1.5rem 1.5rem 0 0"}}>
                        <h3 className='text-main mt-3 mb-5 text-center'>{"TOP " + this.props.category.toUpperCase() + " DEVELOPERS"}</h3>

                        <div className="d-flex flex-row w-75 mx-auto mb-5 justify-content-center">
                            <div className="shadow-sm mr-4"><DeveloperCard cardType="featured" colorScheme="main"/></div>
                            <div className="shadow-sm mr-4"><DeveloperCard cardType="featured" colorScheme="main"/></div>
                            <div className="shadow-sm mr-4"><DeveloperCard cardType="featured" colorScheme="main"/></div>
                        </div>
                </div>
            </div>
        )
    }
}
