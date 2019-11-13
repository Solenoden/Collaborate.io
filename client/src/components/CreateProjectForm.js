import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from "axios";

export default class CreateProjectForm extends Component {
    state = {
        inputTitle: "",
        inputCategories: [],
        inputDescription: "",
        
    }

    static propTypes = {
        founder: PropTypes.object.isRequired
    }
    // onChange Handlers
    onChangeInputTitle = (e) => {
        this.setState({
            inputTitle: e.target.value
        });
    }
    onChangeInputCategory = (e) => {
        this.setState({
            inputCategories: [e.target.value]
        });
    }
    onChangeInputDescription = (e) => {
        this.setState({
            inputDescription: e.target.value
        });
    }
    // onSubmit Handler
    onSubmit = async (e) => {
        e.preventDefault();

        let today = new Date();
        let dateStarted = (today.getDay() + "-" + today.getMonth() + "-" + today.getFullYear());

        const project = {
            title: this.state.inputTitle,
            categories: this.state.inputCategories,
            description: this.state.inputDescription,
            dateStarted: dateStarted,
            devTeam: [{
                developerID: this.props.founder.userID,
                position: "Founder",
                dateStarted: dateStarted
            }]
        }

        const res = await axios.post("http://localhost:5000/project/new", project);

        window.location = "/project/" + res.projectID;
    }
    // Main render method
    render() {
        return (
            <div className="shadow-lg d-flex flex-row" style={{width: "40vw"}}>
                <div className="w-50 text-center p-4">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Project Title:</label>
                            <input className="form-control" type="text" name="title" value={this.state.inputTitle} onChange={this.onChangeInputTitle} placeholder="Project Title" required></input>
                        </div>

                        <div className="form-group">
                            <label>Category:</label>
                            <select className="form-control" id="selProjectCategory" onChange={this.onChangeInputCategory}>
                                <option>Web</option>
                                <option>Mobile</option>
                                <option>Game</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Description:</label>
                            <textarea className="form-control" style={{height: "20vh"}} type="text" name="description" value={this.state.inputDescription} onChange={this.onChangeInputDescription} placeholder="Write a description..." required></textarea>
                        </div>



                        <button className="font-weight-bold text-main-alt" style={{backgroundColor: "white", borderColor: "#583F59", borderWidth: "3px", padding: "5px 7px"}}>CREATE PROJECT</button>
                    </form>
                </div>
                
                    <div className="w-50 bg-main-alt text-white text-center">
                        <h3 className="mt-3">Want to view other Projects?</h3>
                        <h5 className="mt-5">Click Here.</h5>
                    </div>
                
            </div>
        )
    }
}
