import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from "axios";

import allSkills from "../../utils/allSkills";
import {SkillOptions} from "../../utils/allOptions";

export default class ManageProjectPage extends Component {
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
            vacancies: [
                {
                    position: "",
                    skills: [],
                    datePosted: "",
                    applicants: []
                }
            ],
            gitHubLink: [],
            websiteLink: []
        },

        inputVacancy: {
            position: "",
            skills: [],
            datePosted: "",
            applicants: []
        },

        inputVacancySkill: ""
        
    }

    static propTypes = {
        projectID: PropTypes.string.isRequired
    }

    componentDidMount = async () => {
        const res = await axios.get("http://localhost:5000/project/" + this.props.projectID);

        let project = res.data;

        project.vacancies = await Promise.all(project.vacancies.map(async (vacancy) => {
            vacancy.applicants = await Promise.all(vacancy.applicants.map(async (applicant) => {return await this.props.getUser(applicant)}));
            return vacancy;
        }));

        this.setState({
            project: res.data
        });
    }

    saveProject = async () => {
        axios.post("http://localhost:5000/project/edit/" + this.state.project._id, this.state.project);

        window.location = "/project/view/" + this.props.projectID;
    }
    acceptApplicant = (vacancy, applicantID) => {
        let changedProject = this.state.project;

        let today = new Date();

        changedProject.devTeam.push({
            developerID: applicantID,
            position: vacancy.position,
            dateStarted: today.getDate() + "-" + today.getMonth() + "-" + today.getFullYear(),
        });

        changedProject.vacancies = changedProject.vacancies.filter((currVacancy) => currVacancy._id !== vacancy._id);
        
        this.setState({
            project: changedProject
        });
    }

    declineApplicant = (vacancy, applicantID) => {
        let changedProject = this.state.project;

        changedProject.vacancies[changedProject.vacancies.findIndex((currVacancy) => currVacancy._id === vacancy._id)].applicants = vacancy.applicants.filter((applicant) => applicant.userID !== applicantID);
        
        this.setState({
            project: changedProject
        });
    }

    selectVacancy = (vacancy) => {
        this.setState({
            inputVacancy: vacancy
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
    saveVacancy = () => {
        let changedProject = this.state.project;

        // changedProject.vacancies[changedProject.vacancies.findIndex((vacancy) => vacancy._id === this.state.inputVacancy._id)]
        changedProject.vacancies = changedProject.vacancies.map((vacancy) => {
            if (vacancy._id === this.state.inputVacancy._id) {
                return this.state.inputVacancy;
            } else {
                return vacancy;
            }
        });

        this.setState({
            project: changedProject,
            inputVacancy: {
                position: "",
                skills: [],
                datePosted: "",
                applicants: []
            }
        });
    }
    removeVacancy = (vacancyID) => {
        let changedProject = this.state.project;

        changedProject.vacancies = changedProject.vacancies.filter((vacancy) => vacancy._id !== vacancyID );

        this.setState({
            project: changedProject
        });
    }
    // OnChange Handlers
    onChangeInputVacancyPosition = (e) => {
        let changedVacancy = this.state.inputVacancy;

        changedVacancy.position = e.target.value;

        this.setState({
            inputVacancy: changedVacancy
        });
    }
    onChangeInputVacancySkill = (e) => {
        this.setState({
            inputVacancySkill: e.target.value
        });
    }
    onChangeWebsiteLink = (e) => {
        let changedProject = this.state.project;

        changedProject.websiteLink = e.target.value;

        this.setState({
            project: changedProject
        });
    }
    onChangeGitHubLink = (e) => {
        let changedProject = this.state.project;

        changedProject.gitHubLink = e.target.value;

        this.setState({
            project: changedProject
        });
    }
    onChangeStatus = (e) => {
        let changedProject = this.state.project;

        changedProject.status = e.target.value;

        this.setState({
            project: changedProject
        });
    }
    // Other render methods
    renderVacancyApplications = () => {
        return this.state.project.vacancies.map( (vacancy) => {
            let render = [];
            
            render.push(<div key={vacancy._id} className="my-3 d-flex mx-auto" style={{width: "fit-content"}}>
                <h4 className="text-center font-weight-normal">{vacancy.position}</h4>
                <img className="border ml-3 my-auto" style={{width: "25px", height: "25px"}} data-toggle="modal" data-target="#editVacancyModal" onClick={this.selectVacancy.bind(this, vacancy)} alt="Edit"/>
                <button className="btn btn-danger ml-3 my-auto" style={{padding: "0px 6px"}} onClick={this.removeVacancy.bind(this, vacancy._id)}>&times;</button>
            </div>);

            if (vacancy.applicants.length > 0) {
                render.push(vacancy.applicants.map((applicant) => {
                    return (<div key={applicant._id} className="shadow-sm bg-custom-white border border-dark rounded-lg p-4 mx-auto" style={{width: "fit-content"}}>
                        <h5>{applicant.fullName}</h5>
                        <p>{applicant.skills.join(", ")}</p>
                        <button className="btn bg-custom-secondary text-white mr-3 ml-auto" onClick={this.acceptApplicant.bind(this, vacancy, applicant.userID)}>Accept</button>
                        <button className="btn btn-danger" onClick={this.declineApplicant.bind(this, vacancy, applicant.userID)}>Decline</button>
                    </div>)
                }));
            } else {
                render.push((<p className="text-center my-3">No Applicants</p>));
            }

            return render;
        });
    }
    renderTechnologyOptions = () => {
        return allSkills.getSkills().map((technology) => {
            return <option key={technology}>{technology}</option>
        });
    }
    renderInputVacancySkills = () => {
        return this.state.inputVacancy.skills.map((skill) => {
            return <div key={skill} className="w-100 p-2 shadow-sm d-flex"><p className="my-auto" style={{height: "fit-content"}}>{skill}</p><button className="btn btn-danger btn-sm rounded-circle ml-auto mr-2" type="button" name="removeTechnology" onClick={this.removeVacancySkill.bind(this, skill)}>&times;</button></div>
        })
    }
    // Main render method
    render() {
        return (
            <div className="container">
                <button className="btn bg-main-alt text-white float-left ml-3 mt-5" onClick={this.saveProject}>Save Project</button>
                <div className="shadow-lg mx-auto bg-custom-secondary text-main p-5 mb-5 rounded-bottom">
                    <h1 className="mx-auto" style={{width: "fit-content"}}>{this.state.project.title}</h1>
                </div>

                <div className="text-main shadow-lg mx-auto p-2 mb-5">
                    <h2 className="text-center mt-3 mb-5">General</h2>

                    <div className="mx-auto" style={{width: "fit-content"}}>
                        <div className="form-group ml-3 mb-3">
                            <label>Project Website: </label>
                            <input className="form-control" style={{width: "250px"}} type="text" placeholder="Website Link" value={this.state.project.websiteLink} onChange={this.onChangeWebsiteLink}/>
                        </div>

                        <div className="form-group ml-3 mb-3">
                            <label>GitHub Page: </label>
                            <input className="form-control" style={{width: "250px"}} type="text" placeholder="GitHub Page Link" value={this.state.project.gitHubLink} onChange={this.onChangeGitHubLink}/>
                        </div>

                        <div className="form-group ml-3 mb-3">
                            <label className="d-block">Development Status: </label>
                            <select className="form-control" style={{width: "250px"}} value={this.state.project.status} onChange={this.onChangeStatus}>
                                <option>In Development</option>
                                <option>Discontinued</option>
                                <option>Completed</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="text-main shadow-lg mx-auto p-2 mb-5">
                    <h2 className="text-center mt-3 mb-5">Vacancy Applications</h2>
                    {this.renderVacancyApplications()}
                </div>


            {/* !!! MODALS !!! */}

            <div className="modal fade" id="editVacancyModal">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">

                        <div className="modal-header">
                            <h4 className="modal-title">Edit Position</h4>
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
                                    <SkillOptions />
                                </select>
                                <button className="btn btn-success rounded-circle ml-3 my-auto" onClick={this.addVacancySkill}>+</button>
                            </div>

                            {this.renderInputVacancySkills()}
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" onClick={this.saveVacancy}>Save Changes</button>
                        </div>

                        </div>

                    </div>
                </div>

            </div>

            
        )
    }
}
