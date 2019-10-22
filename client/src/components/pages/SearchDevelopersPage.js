import React, { Component } from 'react';
import PropTypes from 'prop-types';

import axios from "axios";

import DeveloperCard from '../DeveloperCard';
import allSkills from "../../utils/allSkills";
import allCategories from "../../utils/allCategories";

export default class SearchDevelopersPage extends Component {
    state = {
        searchUsername: "",
        searchCategories: [],
        searchSubCategories: [],
        searchSkills: [],

        developers: []
    }

    static propTypes = {
        // prop: PropTypes
    }

    componentDidMount = async () => {
        this.setState({
            developers: await this.getDevelopers()
        });
    }

    getDevelopers = async () => {
        const res = await axios.get("http://localhost:5000/user/");

        return res.data;
    }

    filterDevelopers = () => {
        let filteredDevelopers = this.state.developers;

        if (this.state.searchUsername !== "") {
            filteredDevelopers = filteredDevelopers.filter((developer) => developer.fullName.toLowerCase().includes(this.state.searchUsername.toLowerCase()));

        }
        // if (this.state.searchCategories.length > 0) {
        //     filteredDevelopers = filteredDevelopers.filter((developer) => {
        //         developer.devCategories.filter((category) => this.state.searchCategories.contains(category)).length > 0
        //     });
        // }
        return filteredDevelopers;
    }

    removeSearchCategory = (category) => {
        console.log(category);
        let changedArray = this.state.searchCategories;
        changedArray = changedArray.filter((currCategory) => currCategory !== category);

        this.setState({
            searchCategories: changedArray
        });
    }
    removeSearchSubCategory = (subCategory) => {
        console.log(subCategory);
        let changedArray = this.state.searchSubCategories;
        changedArray = changedArray.filter((currSubCategory) => currSubCategory !== subCategory);

        this.setState({
            searchSubCategories: changedArray
        });
    }
    removeSearchSkill = (skill) => {
        console.log(skill);
        let changedArray = this.state.searchSkills;
        changedArray = changedArray.filter((currSkill) => currSkill !== skill);

        this.setState({
            searchSkills: changedArray
        });
    }

    // OnChange Methods
    onChangeSearchUsername = (e) => {
        this.setState({
            searchUsername: e.target.value
        });
    }
    onChangeSearchCategory = (e) => {
        if (e.target.value !== "Field" && this.state.searchCategories.indexOf(e.target.value) === -1) {
            let changedArray = this.state.searchCategories;
            changedArray.push(e.target.value);
            this.setState({
                searchCategories: changedArray 
            });

            
        }
        e.target.value = "Field";
    }
    onChangeSearchSubCategory = (e) => {
        if (e.target.value !== "Sub-Field" && this.state.searchSubCategories.indexOf(e.target.value) === -1) {
            let changedArray = this.state.searchSubCategories;
            changedArray.push(e.target.value);
            this.setState({
                searchSubCategories: changedArray 
            });

            
        }
        e.target.value = "Sub-Field";
    }
    onChangeSearchSkill = (e) => {
        if (e.target.value !== "Skill" && this.state.searchSkills.indexOf(e.target.value) === -1) {
            let changedArray = this.state.searchSkills;
            changedArray.push(e.target.value);
            this.setState({
                searchSkills: changedArray 
            });
            
        }
        e.target.value = "Skill";
    }
    // Other render methods
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
    renderSearchConstraints() {
        let searchCatogoryConstraints = this.state.searchCategories.map((category) => {
            return (<span key={category} className="badge badge-pill badge-primary mr-1 mt-1" onClick={this.removeSearchCategory.bind(this, category)}>{category}</span>)
        });

        let searchSubCatogoryConstraints = this.state.searchSubCategories.map((category) => {
            return (<span key={category} className="badge badge-pill badge-info mr-1 mt-1" onClick={this.removeSearchSubCategory.bind(this, category)}>{category}</span>)
        });

        let searchSkillConstraints = this.state.searchSkills.map((category) => {
            return (<span key={category} className="badge badge-pill badge-success mr-1 mt-1" onClick={this.removeSearchSkill.bind(this, category)}>{category}</span>)
        });

        return [...searchCatogoryConstraints, ...searchSubCatogoryConstraints, ...searchSkillConstraints];
    }

    renderDevelopers = (developers) => {
        if (developers.length > 0) {
            return developers.map((developer) => {
                return <div className="shadow-sm mr-3"><DeveloperCard developer={developer} cardType="basic" /></div>
            });
        } else {
            return (
                <div className="bg-white w-50 h-75 mx-auto border border-danger">
                    <h1 className="text-error text-center my-auto">Developers not found</h1>
                </div>
            )
        }
    }
    // Main render method
    render() {
        return (
            <React.Fragment>

                <div className="bg-custom-secondary" style={{overflow: "hidden"}}>
                    <h1 className="text-main text-center my-5">DEVELOPERS</h1>
                </div>

                <div className="bg-custom-pink" style={{overflow: "hidden"}}>
                    <h3 className="text-main text-center my-5">FEATURED DEVELOPERS</h3>

                    <div className="d-flex justify-content-center mb-5">
                        <div className="shadow-sm mr-4"><DeveloperCard cardType="featured"/></div>
                        <div className="shadow-sm mr-4"><DeveloperCard cardType="featured"/></div>
                        <div className="shadow-sm"><DeveloperCard cardType="featured"/></div>
                    </div>
                    
                </div>

                <div>
                    <h3 className="text-main text-center my-5">FIND A DEVELOPER</h3>

                    <div className="bg-main w-50 d-flex p-2 rounded-lg mx-auto">
                        <input className="form-control mr-3" style={{height: "40px", width: "200px"}} value={this.state.searchUsername} onChange={this.onChangeSearchUsername} placeholder="Developer's Username"/>
                        <select className="form-control mr-3" style={{height: "40px", width: "100px"}} onChange={this.onChangeSearchCategory}><option>Field</option>{this.renderCategoryOptions()}</select>
                        <select className="form-control mr-3" style={{height: "40px", width: "100px"}} onChange={this.onChangeSearchSubCategory}><option>Sub-Field</option>{this.renderSubCategoryOptions()}</select>
                        <select className="form-control mr-3" style={{height: "40px", width: "100px"}} onChange={this.onChangeSearchSkill}><option>Skill</option>{this.renderSkillOptions()}</select>
                    </div>

                    <div className="mx-auto mt-1 mb-5 d-flex justify-content-center flex-wrap" style={{width: "40%", maxWidth: "40%"}}>
                        {this.renderSearchConstraints()}
                    </div>

                    <div className="mx-auto d-flex justify-content-center w-75 mb-5">
                        {this.renderDevelopers(this.filterDevelopers())}
                    </div>

                </div>

            </React.Fragment>
        )
    }
}
