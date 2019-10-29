import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from "axios";

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
        }
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

    // Other render methods
    renderVacancyApplications = () => {
        return this.state.project.vacancies.map( (vacancy) => {
            let render = [<h4 className="my-3 text-center font-weight-normal">{vacancy.position}</h4>];

            if (vacancy.applicants.length > 0) {
                render.push(vacancy.applicants.map((applicant) => {
                    return (<div className="shadow-sm bg-custom-white border border-dark rounded-lg p-4 mx-auto" style={{width: "fit-content"}}>
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
    // Main render method
    render() {
        return (
            <div className="container">
                <button className="btn bg-main text-white" style={{position: "absolute", top: "3.5rem", left: "17vw"}} onClick={this.saveProject}>Save Project</button>
                <div className="shadow-lg mx-auto bg-custom-secondary text-center text-main p-5 mb-5 rounded-bottom">
                    <h1>{this.state.project.title}</h1>
                </div>

                <div className="shadow-lg mx-auto p-2">
                    <h2 className="text-center my-3">Vacancy Applications</h2>
                    {this.renderVacancyApplications()}
                </div>
            </div>
        )
    }
}
