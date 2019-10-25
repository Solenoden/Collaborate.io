import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from "axios";

import allSkills from "../../utils/allSkills";
import allCategories from "../../utils/allCategories";

export default class ProfilePage extends Component {
    // Default value constants
    initialSubCategory = allCategories.getSubCategories[0];
    initialSkill = allSkills.getSkills[0];
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

        inputSubCategory: this.initialSubCategory,
        inputSkill: this.initialSkill
    }
    
    static propTypes = {
        user: PropTypes.object,
        editable: PropTypes.bool.isRequired
    }

    componentDidMount = async () => {
        if (!this.props.editable) {
            const user = await this.props.getUser(this.props.userID);
            this.setState({tempUser: user});
        } else {
            this.setState({tempUser: this.props.user});
        }
    }

    getProjects(userID) {
        const res = axios.get("http://localhost:5000/project/byUser/" + userID);
        const projects = res.data;
        console.log(projects);
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
            return <div className="badge badge-pill badge-primary">{this.state.tempUser.devCategories[0]}</div>
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
                return <div key={category} className="badge badge-pill badge-info mr-1">{category}</div>
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
                        <img style={{width: "50px", height: "50px"}}/>
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

    renderSkillOptions() {
        return allSkills.getSkills().map((skill) => {
            return <option key={skill}>{skill}</option>
        });
    }

    renderCategoryOptions() {
        return allCategories.getCategories().map((category) => {
            return <option key={category}>{category}</option>
        });
    }

    renderSubCategoryOptions() {
        return allCategories.getSubCategories().map((subCategory) => {
            return <option key={subCategory}>{subCategory}</option>
        });
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
            <React.Fragment>
                
                <div className="w-100 bg-custom-secondary text-center" style={{overflow: "hidden"}}>
                    <button className="btn btn-success" style={{position: "absolute", top: "3.5rem", left: "9vw", display: (this.props.editable) ? "static" : "none"}} onClick={this.saveProfile}>Save Profile</button>
                    <h1 className="text-main mt-5 mb-1 text-center">{this.state.tempUser.fullName}</h1>
                    <div className="d-flex justify-content-center mb-5">
                        <div data-toggle="modal" data-target={(this.props.editable) ? "#editDevCategoriesModal" : ""}>{this.renderCategories()}</div> 
                        <h6 className="text-main mx-2">|</h6> 
                        <div data-toggle="modal" data-target={(this.props.editable) ? "#editDevSubCategoriesModal" : ""}>{this.renderSubCategories()}</div>
                    </div>
                </div>

                <div className="w-100 bg-main-alt text-center" style={{overflow: "hidden"}}>
                    <img className="rounded-circle my-5" style={{width: "250px", height: "250px"}} src={this.state.tempUser.profilePic} alt="Profile" data-toggle="modal" data-target={(this.props.editable) ? "#editProfilePicModal" : ""}/>
                    <div data-toggle="modal" data-target={(this.props.editable) ? "#editDescriptionModal" : ""}>{this.renderDescription()}</div>
                </div>

                <div className="w-100 bg-custom-secondary-alt text-main text-center" style={{overflow: "hidden"}}>
                    <h3 className="my-3">SKILLS</h3>
                    
                    <div className="d-flex flex-row mb-3 justify-content-center" data-toggle="modal" data-target={(this.props.editable) ? "#editSkillsModal" : ""}>
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
                            <div className="d-flex mb-3">
                                <select className="form-control" id="selInputSkills" value={this.state.inputSkill} onChange={this.onChangeInputSkill}>
                                    {this.renderSkillOptions()}
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
                                {this.renderCategoryOptions()}
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
                                    {this.renderSubCategoryOptions()}
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

            </React.Fragment>
        )
    }
}
