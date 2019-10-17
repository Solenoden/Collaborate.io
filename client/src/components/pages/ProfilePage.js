import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from "axios";

export default class ProfilePage extends Component {
    state = {
        tempUser: this.props.user,

        inputSubCategory: "UI Designer"
    }

    static propTypes = {
        user: PropTypes.object
    }

    getProjects(userID) {
        const res = axios.get("http://localhost:5000/project/byUser/" + userID);
        const projects = res.data;
        console.log(projects);
    }

    // OnChange Handlers
    onChangeProfilePic = (e) => {
        let changedUser = this.state.tempUser;
        changedUser.profilePic = e.target.value;
        this.setState({
            tempUser: changedUser
        });
    }

    onChangeProfileDescription = (e) => {
        let changedUser = this.state.tempUser;
        changedUser.profileDescription = e.target.value;
        this.setState({
            tempUser: changedUser
        });
    }

    onChangeDevCategories = (e) => {
        let changedUser = this.state.tempUser;
        changedUser.devCategories = [e.target.value];
        this.setState({
            tempUser: changedUser
        });
    }

    onChangeInputSubCategory = (e) => {
        this.setState({
            inputSubCategory: e.target.value
        });
    }

    // onChangeDevSubCategories = (e) => {
    //     let changedUser = this.state.tempUser;
    //     changedUser.devSubCategories = [e.target.value];
    //     this.setState({
    //         tempUser: changedUser
    //     });
    // }

    // Other render methods
    renderSkillImages() {
        return this.state.tempUser.skills.map((skill) => {
            return (
                <div className="mr-3" style={{width: "75px"}}>
                    <img style={{width: "50px", height: "50px"}}/>
                    <p className="font-italic mt-2" >{skill}</p>
                </div>
            )
        })
    }

    renderSkills() {
        return this.state.tempUser.skills.map((skill) => {
            return <div>{skill} <button className="btn btn-danger">&times.</button></div>
        });
    }

    renderProjects() {
        return (
            <div className="shadow-lg text-center" style={{width: "200px", height:"100px"}}>
                <div className="my-auto p-2">
                    <h4 style={{fontSize: "18px"}}>Project Name</h4>
                    <h6 style={{fontSize: "12px"}}>Position</h6>
                    <p style={{fontSize: "10px"}} className="font-italic">Status</p>
                </div>
            </div>
        )
    }

    // Main render method
    render() {
        return (
            <React.Fragment>
                
                <div className="w-100 bg-custom-secondary text-center" style={{overflow: "hidden"}}>
                    <h1 className="text-main mt-5 mb-3">{this.state.tempUser.fullName}</h1>
                    <div className="d-flex justify-content-center">
                        <h6 className="text-main font-weight-regular font-italic mb-5" data-toggle="modal" data-target="#editDevCategoriesModal">{this.state.tempUser.devCategories + " |"}</h6> 
                        <h6 className="text-main font-weight-regular font-italic mb-5"  data-toggle="modal" data-target="#editDevSubCategoriesModal">{" Sub Categories: " + this.state.tempUser.devSubCategories}</h6>
                    </div>
                </div>

                <div className="w-100 bg-main-alt text-center" style={{overflow: "hidden"}}>
                    <img className="rounded-circle my-5" style={{width: "250px", height: "250px"}} src={this.state.tempUser.profilePic} alt="Profile" data-toggle="modal" data-target="#editProfilePicModal"/>
                    <p className="w-50 text-white mb-5 mx-auto" data-toggle="modal" data-target="#editDescriptionModal">{this.state.tempUser.profileDescription}</p>
                </div>

                <div className="w-100 bg-custom-secondary-alt text-main text-center" style={{overflow: "hidden"}}>
                    <h3 className="my-3">SKILLS</h3>
                    
                    <div className="d-flex flex-row mb-3 justify-content-center" data-toggle="modal" data-target="#editSkillsModal">
                        {this.renderSkillImages()}
                    </div>
                </div>

                <div className="w-100 text-center" style={{overflow: "hidden"}}>
                    <h3 className="text-main my-5">PROJECTS</h3>
                    <div className="d-flex justify-content-center mb-5">
                        {this.renderProjects()}
                    </div>
                </div>

                    {/* !!! MODALS !!! */}

                <div className="modal fade" id="editSkillsModal">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">

                        <div className="modal-header">
                            <h4 className="modal-title">Edit Skills</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div className="modal-body">
                            {/* {this.renderSkills()} */}
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>

                        </div>

                    </div>
                </div>

                <div className="modal fade" id="editProfilePicModal">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h4 className="modal-title">Edit Profile Picture</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <input className="form-control" type="text" value={this.state.tempUser.profilePic} onChange={this.onChangeProfilePic} placeholder="Image Url" ></input>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={console.log("Changing profile pic")}>Close</button>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="modal fade" id="editDescriptionModal">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">

                        <div className="modal-header">
                            <h4 className="modal-title">Edit Skills</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div className="modal-body">
                            <textarea className="form-control" value={this.state.tempUser.profileDescription} onChange={this.onChangeProfileDescription}/>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>

                        </div>

                    </div>
                </div>

                <div className="modal fade" id="editDevCategoriesModal">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">

                        <div className="modal-header">
                            <h4 className="modal-title">Edit Skills</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div className="modal-body">
                            <select className="form-control" id="selDevCategories" value={this.state.tempUser.devCategories[0]} onChange={this.onChangeDevCategories}>
                                <option>Design</option>
                                <option>Web</option>
                                <option>Mobile</option>
                                <option>Game</option>
                            </select>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>

                        </div>

                    </div>
                </div>

                <div className="modal fade" id="editDevSubCategoriesModal">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">

                        <div className="modal-header">
                            <h4 className="modal-title">Edit Sub Categories</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div className="modal-body">
                            <select className="form-control" id="selDevSubCategories" value={this.state.inputSubCategory} onChange={this.onChangeInputSubCategory}>
                                <option>UI Designer</option>
                                <option>UX Designer</option>
                                <option>Graphics Designer</option>
                                <option>Front-end</option>
                                <option>Back-end</option>
                                <option>Game Artist</option>
                                <option>Game Programmer</option>
                            </select>

                            <button className="btn btn-success rounder-circle text-white" onClick={this.addSubCategory}>+</button>

                            <div className="mt-3">
                                {this.renderInputSubCategories()}
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>

                        </div>

                    </div>
                </div>

            </React.Fragment>
        )
    }
}
