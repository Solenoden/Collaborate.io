import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from "axios";

import allSkills from "../../utils/allSkills";
import allCategories from "../../utils/allCategories";
import {SkillOptions, CategoryOptions, SubCategoryOptions} from "../../utils/allOptions";

import ProjectCard from "../ProjectCard";

export default class ProfilePage extends Component {
    // Default value constants
    initialSubCategory = allCategories.getSubCategories[0];
    initialSkill = allSkills.getSkills().General[0];
    //
    state = {
        tempUser: {
            email: "",
            fullName: "",
            username: "",
            devCategories: [],
            devSubCategories: [], 
            skills: [],
            profileDescription: "",
            profilePic: "",
            friends: [],
            notifications: []
        },

        projects: [],

        inputSubCategory: this.initialSubCategory,
        inputSkill: this.initialSkill
    }
    
    static propTypes = {
        user: PropTypes.object,
        userID: PropTypes.string,
        getUser: PropTypes.func,
        editable: PropTypes.bool.isRequired
    }

    componentDidMount = async () => {
        if (!this.props.editable) {
            const user = await this.props.getUser(this.props.userID);
            this.setState({tempUser: user});
            await this.getProjects(this.props.userID);
        } else {
            this.setState({tempUser: this.props.user});
            await this.getProjects(this.props.user.userID);
        }

        
    }

    getProjects = async (userID) => {
        const res = await axios.get("http://localhost:5000/project/byUser/" + userID);
        this.setState({
            projects: res.data
        })
    }

    saveProfile = async () => {
        await axios.post("http://localhost:5000/user/edit/" + this.props.user.userID, this.state.tempUser);
        window.location = "/profile/me";
    }

    addSubCategory = () => {
        if (this.state.tempUser.devSubCategories.indexOf(this.state.inputSubCategory) === -1) {
            let changedUser = this.state.tempUser;
            changedUser.devSubCategories.push(this.state.inputSubCategory);
            this.setState({tempUser: changedUser});
        }
        this.setState({inputSubCategory: this.initialSubCategory});
    }

    removeSubCategory = (subCategory) => {
        let changedUser = this.state.tempUser;
        changedUser.devSubCategories = changedUser.devSubCategories.filter((currSubCategory) => currSubCategory !== subCategory);
        this.setState({
            tempUser: changedUser
        });
    }

    addSkill = () => {
        if (this.state.tempUser.skills.indexOf(this.state.inputSkill) === -1) {
            let changedUser = this.state.tempUser;
            changedUser.skills.push(this.state.inputSkill);
            this.setState({tempUser: changedUser});
        }
        this.setState({inputSkill: this.initialSkill});
    }

    removeSkill = (skill) => {
        let changedUser = this.state.tempUser;
        changedUser.skills = changedUser.skills.filter((currSkill) => currSkill !== skill);
        this.setState({
            tempuser: changedUser
        });
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

    onChangeInputSkill = (e) => {
        this.setState({
            inputSkill: e.target.value
        });
    }
    // Other render methods
    renderCategories() {
        if (this.state.tempUser.devCategories.length > 0) {
            return <div className="badge badge-pill bg-main text-white mr-1">{this.state.tempUser.devCategories[0]}</div>
        } else {
            if (this.props.editable) {
                return <div className="badge badge-danger">Choose a category</div>
            } else {
                return <div className="badge badge-danger">No category chosen</div>
            }
        }
    }

    renderSubCategories() {
        if (this.state.tempUser.devSubCategories.length > 0) {
            return this.state.tempUser.devSubCategories.map((category) => {
                return <div key={category} className="badge badge-pill mr-1 p-1" style={{backgroundColor: "#f2f2f2"}}>{category}</div>
            })
        } else {
            if (this.props.editable) {
                return <div className="badge badge-danger">Choose sub-categories</div>
            } else {
                return <div className="badge badge-danger">No sub-categories chosen</div>
            }
        }
    }

    renderDescription() {
        if (this.state.tempUser.profileDescription.length > 4) {
            return <p className="w-50 text-white mb-5 mx-auto" >{this.state.tempUser.profileDescription}</p>
        } else {
            if (this.props.editable) {
                return (
                    <div className="bg-custom-secondary text-white mx-auto mb-5" style={{width: "75px", height: "75px"}}>
                        <p className="mt-2 mb-0 font-weight-bold" style={{fontSize: "12px"}}>Write a description</p>
                        <p className="font-weight-bold" style={{fontSize: "24px"}}>+</p>
                    </div>
                )
            } else {
                return (
                    <div className="text-white mx-auto mb-5" style={{width: "75px", height: "75px"}}>
                        <p className="mt-2 mb-0 font-weight-bold" style={{fontSize: "12px"}}>No description</p>
                    </div>
                )
            }
        }
    }

    renderSkillImages() {
        if (this.state.tempUser.skills.length > 0) {
            return this.state.tempUser.skills.map((skill) => {
                return (
                    <div key={skill} className="mr-3" style={{width: "75px"}}>
                        <img style={{width: "50px", height: "50px"}} src={allSkills.getIconPath(skill)} alt=""/>
                        <p className="font-italic mt-2 text-main" >{skill}</p>
                    </div>
                )
            })
        } else {
            if (this.props.editable) {
                return (
                    <div className="bg-custom-secondary text-white" style={{width: "75px", height: "75px"}}>
                        <p className="mt-2 mb-0 font-weight-bold" style={{fontSize: "12px"}}>Add a Skill</p>
                        <p className="font-weight-bold" style={{fontSize: "24px"}}>+</p>
                    </div>
                )
            } else {
                return (
                    <div className="text-white" style={{width: "75px", height: "75px"}}>
                        <p className="mt-2 mb-0 font-weight-bold" style={{fontSize: "12px"}}>No Skills Chosen</p>
                    </div>
                )
            }
        }
    }

    renderProjects = () => {
        if (this.state.projects.length > 0) {
            return this.state.projects.map((project) => {
                return <div key={project._id} className="shadow-sm"><ProjectCard project={project} cardType="basic" /></div>
            });
        } else {
            return <p>No Projects</p>
        }
    }

    // Render methods for inputs
    renderInputSubCategories = () => {
        return this.state.tempUser.devSubCategories.map((subCategory) => {
            return <div key={subCategory} className="w-100 p-2 shadow-sm d-flex"><p className="my-auto" style={{height: "fit-content"}}>{subCategory}</p><button className="btn btn-danger btn-sm rounded-circle ml-auto mr-2" type="button" name="removeSubCategory" onClick={this.removeSubCategory.bind(this, subCategory)}>&times;</button></div>
        });
    }

    renderInputSkills = () => {
        return this.state.tempUser.skills.map((skill) => {
            return <div key={skill} className="w-100 p-2 shadow-sm d-flex"><p className="my-auto" style={{height: "fit-content"}}>{skill}</p><button className="btn btn-danger btn-sm rounded-circle ml-auto mr-2" type="button" name="removeSkill" onClick={this.removeSkill.bind(this, skill)}>&times;</button></div>
        })
    }
    // Main render method
    render() {
        return (
            <div className="container">
                
                <div className="w-100 bg-custom-secondary text-center shadow-lg mb-5 " style={{overflow: "hidden", borderRadius: "0 0 0.75rem 0.75rem"}}>
                    <button className="btn bg-main text-white float-left ml-3 mt-5" style={{display: (this.props.editable) ? "static" : "none"}} onClick={this.saveProfile}>Save Profile</button>
                    <h1 className="text-main mt-5 mb-1 mx-auto" style={{width: "fit-content"}}>{this.state.tempUser.fullName}</h1>
                    <div className="d-flex mb-5 mx-auto" style={{width: "fit-content"}}>
                        <div className={(this.props.editable) ? "editable" : ""} data-toggle="modal" data-target={(this.props.editable) ? "#editDevCategoriesModal" : ""}>{this.renderCategories()}</div>
                        <div className={(this.props.editable) ? "editable" : ""} data-toggle="modal" data-target={(this.props.editable) ? "#editDevSubCategoriesModal" : ""}>{this.renderSubCategories()}</div>
                    </div>
                </div>

                <div className="w-100 bg-main-alt text-center shadow-sm mb-3" style={{overflow: "hidden", borderRadius: "0.75rem"}}>
                    <img className={(this.props.editable) ? "editable rounded-circle my-5" : "rounded-circle my-5"} style={{width: "250px", height: "250px"}} src={this.state.tempUser.profilePic} alt="Profile" data-toggle="modal" data-target={(this.props.editable) ? "#editProfilePicModal" : ""}/>
                    <div className={(this.props.editable) ? "editable" : ""} data-toggle="modal" data-target={(this.props.editable) ? "#editDescriptionModal" : ""}>{this.renderDescription()}</div>
                </div>

                <div className="w-100 bg-custom-secondary-alt text-main text-center shadow-sm mb-3" style={{overflow: "hidden", borderRadius: "1.5rem"}}>
                    <h3 className="my-3">SKILLS</h3>
                    
                    <div className={(this.props.editable) ? "d-flex flex-row mb-3 justify-content-center editable" : "d-flex flex-row mb-3 justify-content-center"} data-toggle="modal" data-target={(this.props.editable) ? "#editSkillsModal" : ""}>
                        {this.renderSkillImages()}
                    </div>
                </div>

                <div className="w-100 text-center" style={{overflow: "hidden"}}>
                    <h3 className="text-main my-5">PROJECTS</h3>
                    <div className="d-flex justify-content-around mb-5">
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
                            <div className="d-flex mb-3">
                                <select className="form-control" id="selInputSkills" value={this.state.inputSkill} onChange={this.onChangeInputSkill}>
                                    <SkillOptions/>
                                </select>
                                <button className="btn btn-success rounded-circle ml-3 my-auto" onClick={this.addSkill}>+</button>
                            </div>

                            {this.renderInputSkills()}
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
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="modal fade" id="editDescriptionModal">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">

                        <div className="modal-header">
                            <h4 className="modal-title">Edit Profile Description</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div className="modal-body">
                            <textarea className="form-control" style={{height: "50vh"}} value={this.state.tempUser.profileDescription} onChange={this.onChangeProfileDescription}/>
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
                            <h4 className="modal-title">Edit Category</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div className="modal-body">
                            <select className="form-control" id="selDevCategories" value={this.state.tempUser.devCategories[0]} onChange={this.onChangeDevCategories}>
                                <CategoryOptions />
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
                            <div className="d-flex">
                                <select className="form-control" id="selDevSubCategories" value={this.state.inputSubCategory} onChange={this.onChangeInputSubCategory}>
                                    <SubCategoryOptions />
                                </select>

                                <button className="btn btn-success rounded-circle text-white ml-2" name="addSubCategory" onClick={this.addSubCategory}>+</button>
                            </div>
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

            </div>
        )
    }
}
