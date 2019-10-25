import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DeveloperCard from '../DeveloperCard';
import axios from "axios";

import allCategories from "../../utils/allCategories";
import allSkills from "../../utils/allSkills";

export default class ProjectPage extends Component {
    initialTechnology = allSkills.getSkills()[0];
    initialCategory = allCategories.getCategories()[0];

    state = {
        project: {
            title: "",
            categories: [""],
            status: "",
            dateStarted: "",
            dateEnded: "",
            description: "",
            technologies: [],
            images: [],
            devTeam: [
                {
                    developerID: "",
                    position: "",
                    dateStarted: "",
                    devCategories: [],
                    devSubCategories: [],
                    skills: []
                }
            ],
            vacancies: [],
            gitHubLink: [],
            websiteLink: []
        },

        editable: true,

        inputTechnology: this.initialTechnology,
        inputVacancySkill: this.initialTechnology,

        inputVacancy: {
            position: "",
            skills: [],
            datePosted: ""
        }
    }

    static propTypes = {
        projectID: PropTypes.string.isRequired,
        user: PropTypes.object,
    }

    componentDidMount = async () => {
        // Get project and add all the devTeam user's information
        const res = await axios.get("http://localhost:5000/project/" + this.props.projectID);

        let project = res.data;

        let devTeam = await Promise.all(project.devTeam.map(async (developer) => {
            const devDetails = await this.props.getUser(developer.developerID);
            return {
                ...devDetails, ...developer
            }
        }));

        project.devTeam = devTeam;

        this.setState({
            project: project
        });
        // Determine if the current user logged in is the founder of the project ,if so they can edit the project
        if (this.props.user.userID === project.devTeam[0].developerID) {
            this.setState({
                editable: true
            });
        }
    }

    saveProject = async () => {
        axios.post("http://localhost:5000/project/edit/" + this.state.project._id, this.state.project);

        window.location = "/project/view/" + this.props.projectID;
    }

    addTechnology = () => {
        if (this.state.project.technologies.indexOf(this.state.inputTechnology) === -1) {
            let changedProject = this.state.project;

            changedProject.technologies.push(this.state.inputTechnology);
            this.setState({project: changedProject});
        }
        this.setState({inputTechnology: this.initialTechnology});
    }
    removeTechnology = (technology) => {
        let changedProject = this.state.project;

        changedProject.technologies = changedProject.technologies.filter((currTech) => currTech !== technology)
        this.setState({
            project: changedProject
        });
    }
    addVacancySkill = () => {
        if (this.state.inputVacancy.skills.indexOf(this.state.inputVacancySkill) === -1) {
            let changedVacancy = this.state.inputVacancy;

            changedVacancy.skills.push(this.state.inputVacancySkill);
            this.setState({inputVacancy: changedVacancy});
        }
        this.setState({inputVacancySkill: this.initialTechnology});
    }
    removeVacancySkill = (skill) => {
        let changedVacancy = this.state.inputVacancy;

        changedVacancy.skills = changedVacancy.skills.filter((currSkill) => currSkill !== skill)
        this.setState({
            inputVacancy: changedVacancy
        });
    }
    addVacancy = () => {
        let changedProject = this.state.project;
        let changedVacancy = this.state.inputVacancy;

        let currDate = new Date();
        changedVacancy.datePosted = currDate.getDate() + "-" + currDate.getMonth() + "-" + currDate.getFullYear(); 
        this.setState({
            inputVacancy: changedVacancy
        });

        changedProject.vacancies.push(this.state.inputVacancy);

        this.setState({
            project: changedProject,

            inputVacancy: {
                position: "",
                skills: [],
                datePosted: ""
            }
        });
    }
    // onChange Handlers 
    onChangeCategories = (e) => {
        let changedProject = this.state.project;

        changedProject.categories[0] = e.target.value;

        this.setState({
            project: changedProject
        });
    }
    onChangeDescription = (e) => {
        let changedProject = this.state.project;

        changedProject.description = e.target.value;

        this.setState({
            project: changedProject
        });
    }
    onChangeInputTechnology = (e) => {
        this.setState({
            inputTechnology: e.target.value
        });
    }
    onChangeInputVacancySkill = (e) => {
        this.setState({
            inputVacancySkill: e.target.value
        });
    }
    onChangeInputVacancyPosition = (e) => {
        let changedInputVacancy = this.state.inputVacancy;
        changedInputVacancy.position = e.target.value;

        this.setState({
            inputVacancy: changedInputVacancy
        });
    }
    // Render options
    renderCategoryOptions = () => {
        return allCategories.getProjectCategories().map((category) => {
            return <option key={category}>{category}</option>
        });
    }
    renderTechnologyOptions = () => {
        return allSkills.getSkills().map((technology) => {
            return <option key={technology}>{technology}</option>
        });
    }
    // Other render methods
    renderInputTechnologies = () => {
        return this.state.project.technologies.map((technology) => {
            return <div key={technology} className="w-100 p-2 shadow-sm d-flex"><p className="my-auto" style={{height: "fit-content"}}>{technology}</p><button className="btn btn-danger btn-sm rounded-circle ml-auto mr-2" type="button" name="removeTechnology" onClick={this.removeTechnology.bind(this, technology)}>&times;</button></div>
        })
    }
    renderInputVacancySkills = () => {
        return this.state.inputVacancy.skills.map((skill) => {
            return <div key={skill} className="w-100 p-2 shadow-sm d-flex"><p className="my-auto" style={{height: "fit-content"}}>{skill}</p><button className="btn btn-danger btn-sm rounded-circle ml-auto mr-2" type="button" name="removeTechnology" onClick={this.removeVacancySkill.bind(this, skill)}>&times;</button></div>
        })
    }
    renderCategories = () => {
        if (this.state.project.categories[0].length > 0) {
            return <p className="mb-5">{this.state.project.categories[0]}</p>
        } else {
            if (this.state.editable) {
                return <p className="mb-5">Choose a category</p>
            } else {
                return <p className="mb-5">No Category Chosen</p>
            }
        }
    }
    renderDescription = () => {
        if (this.state.project.description.length > 0) {
            return <p className="mb-5 w-50 mx-auto text-center">{this.state.project.description}</p>
        } else {
            if (this.state.editable) {
                return <div className="bg-custom-secondary text-white mx-auto mb-5" style={{width: "75px", height: "75px"}}>
                    <p className="mt-2 mb-0 font-weight-bold" style={{fontSize: "12px"}}>Write a description</p>
                    <p className="font-weight-bold" style={{fontSize: "24px"}}>+</p>
                </div>
            } else {
                return <p className="mb-5 w-50 mx-auto text-center">No description</p>
            }
        }
    }
    renderTechnologies = () => {
        if (this.state.project.technologies.length > 0) {
            return this.state.project.technologies.map((tech) => {
                return (
                    <div key={tech} className="mr-3" style={{width: "75px"}}>
                        <img style={{width: "50px", height: "50px"}}/>
                        <p className="font-italic mt-2 text-main" >{tech}</p>
                    </div>
                )
            })
        } else {
            if (this.state.editable) {
                return (
                    <div className="bg-custom-secondary text-white" style={{width: "75px", height: "75px"}}>
                        <p className="mt-2 mb-0 font-weight-bold" style={{fontSize: "12px"}}>Add a Technology</p>
                        <p className="font-weight-bold" style={{fontSize: "24px"}}>+</p>
                    </div>
                )
            } else {
                return (
                    <div className="text-white" style={{width: "75px", height: "75px"}}>
                        <p className="mt-2 mb-0 font-weight-bold" style={{fontSize: "12px"}}>No Technologies Chosen</p>
                    </div>
                )
            }
        }
    }
    renderDevTeam = () => {
        let devTeam = this.state.project.devTeam.map((developer) => {
            if (developer.position.toLowerCase() !== "founder") {
                return <div className="shadow-sm mr-4 mb-4"><DeveloperCard cardType="team" developer={developer}/></div>
            }
        });

        devTeam.push(this.state.project.vacancies.map((vacancy) => {
            return <div className="shadow-sm mr-4 mb-4"><DeveloperCard cardType="vacancy" developer={vacancy}/></div>
        }));

        devTeam.push(<div className="shadow-lg">
            <div className="bg-main text-center text-white p-2" style={{width: "175px", height: "260px"}} data-toggle="modal" data-target={(this.state.editable) ? "#createVacancyModal" : ""}>
                <h3>Create a position</h3>
                <h1 className="mt-5">+</h1>
            </div>
        </div>);

        return devTeam;
    }
    // Main render method
    render() {
        return (
            <React.Fragment>
                <div className="bg-custom-pink text-main text-center" style={{overflow: "hidden"}}>
                    <button className="btn bg-custom-secondary text-white" style={{position: "absolute", top: "3.5rem", left: "9vw", display: (this.state.editable) ? "static" : "none"}} onClick={this.saveProject}>Save Project</button>
                    <h1 className="mt-5 mb-3">{this.state.project.title}</h1>
                    <div data-toggle="modal" data-target={(this.state.editable) ? "#editCategoriesModal" : ""}>{this.renderCategories()}</div>
                </div>

                <div className="bg-main-alt text-white" style={{overflow: "hidden"}}>
                    <h3 className="my-5 text-center">PROJECT DESCRIPTION</h3>
                    <div data-toggle="modal" data-target={(this.state.editable) ? "#editDescriptionModal" : ""}>{this.renderDescription()}</div>
                </div>

                <div className="bg-custom-pink text-main" style={{overflow: "hidden"}}>
                    <h3 className="my-3 text-center">TECHNOLOGIES</h3>

                    <div className="d-flex flex-row w-75 mx-auto justify-content-center" data-toggle="modal" data-target={(this.state.editable) ? "#editTechnologiesModal" : ""}>
                        {this.renderTechnologies()}
                    </div>
                </div>

                <div style={{height: "50vh", overflow: "hidden"}}>
                    <div id="projectCarousel" className="carousel slide w-100 h-100" data-ride="carousel">

                        <ul className="carousel-indicators">
                            <li data-target="#projectCarousel" data-slide-to="0" className="active"></li>
                            <li data-target="#projectCarousel" data-slide-to="1"></li>
                            <li data-target="#projectCarousel" data-slide-to="2"></li>
                        </ul>

                        <div className="carousel-inner mx-auto w-75 h-100">
                            <div className="carousel-item active">
                                <img  className="w-100 h-100" src="https://www.mht.net/wp-content/uploads/2016/10/Cover-ERP-PM.png" alt="Los Angeles"/>
                            </div>
                            <div className="carousel-item">
                                <img className="w-100 h-100" src="https://www.ntaskmanager.com/wp-content/uploads/2019/07/top-pivotal-tracker-alternatives-for-agile-project-manager.jpg" alt="Chicago"/>
                            </div>
                            <div className="carousel-item">
                                <img  className="w-100 h-100" src="https://2k4s4k3wofhp2b3qaf1365bl-wpengine.netdna-ssl.com/wp-content/uploads/2018/10/The-Triple-Constraints-of-Project-Management-Explained.jpg" alt="New York"/>
                            </div>
                        </div>

                        <a className="carousel-control-prev" href="#projectCarousel" data-slide="prev">
                        <span className="carousel-control-prev-icon"></span>
                        </a>
                        <a className="carousel-control-next" href="#projectCarousel" data-slide="next">
                        <span className="carousel-control-next-icon"></span>
                        </a>

                    </div>
                </div>

                <div className="bg-custom-secondary" style={{overflow: "hidden"}}>
                    <h2 className="my-5 text-center">MEET OUR TEAM</h2>
                    <div className="d-flex justify-content-center"><div className="shadow-lg mx-auto"><DeveloperCard cardType="founder" developer={this.state.project.devTeam[0]}/></div></div>
                    <div className="my-3 d-flex flex-wrap w-75 mx-auto justify-content-center">
                        {this.renderDevTeam()}
                    </div>
                </div>

                {/* !!! MODALS !!! */}

                <div className="modal fade" id="editCategoriesModal">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">

                        <div className="modal-header">
                            <h4 className="modal-title">Edit Category</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div className="modal-body">
                            <select className="form-control" id="selCategories" value={this.state.project.categories[0]} onChange={this.onChangeCategories}>
                                {this.renderCategoryOptions()}
                            </select>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>

                        </div>

                    </div>
                </div>

                <div className="modal fade" id="editDescriptionModal">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">

                        <div className="modal-header">
                            <h4 className="modal-title">Edit Project Description</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div className="modal-body">
                            <textarea className="form-control" style={{height: "50vh"}} value={this.state.project.description} onChange={this.onChangeDescription}/>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>

                        </div>

                    </div>
                </div>

                <div className="modal fade" id="editTechnologiesModal">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">

                        <div className="modal-header">
                            <h4 className="modal-title">Edit Technologies</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div className="modal-body">
                            <div className="d-flex mb-3">
                                <select className="form-control" id="selInputTechnologies" value={this.state.inputTechnology} onChange={this.onChangeInputTechnology}>
                                    {this.renderTechnologyOptions()}
                                </select>
                                <button className="btn btn-success rounded-circle ml-3 my-auto" onClick={this.addTechnology}>+</button>
                            </div>

                            {this.renderInputTechnologies()}
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>

                        </div>

                    </div>
                </div>

                <div className="modal fade" id="createVacancyModal">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">

                        <div className="modal-header">
                            <h4 className="modal-title">Create Position</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label className="mb-3" style={{fontWeight: "500"}}>Position Name:</label>
                                <input className="form-control" type="text" name="position" value={this.state.inputVacancy.position} onChange={this.onChangeInputVacancyPosition} placeholder="Position Name"></input>
                            </div>

                            <label className="mb-3" style={{fontWeight: "500"}}>Skills Required:</label>

                            <div className="d-flex mb-3">
                                <select className="form-control" id="selInputVacancySkills" value={this.state.inputVacancySkill} onChange={this.onChangeInputVacancySkill}>
                                    {this.renderTechnologyOptions()}
                                </select>
                                <button className="btn btn-success rounded-circle ml-3 my-auto" onClick={this.addVacancySkill}>+</button>
                            </div>

                            {this.renderInputVacancySkills()}
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-success" onClick={this.addVacancy}>Create Position</button>
                        </div>

                        </div>

                    </div>
                </div>

            </React.Fragment>
        )
    }
}
