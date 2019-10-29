import React, { Component } from 'react';
import PropTypes from 'prop-types';
import allCategories from "../../utils/allCategories";
import {Link} from "react-router-dom";
import ProjectCard from '../ProjectCard';

export default class SearchProjectCategoriesPage extends Component {
    static propTypes = {
        prop: PropTypes
    }
    // Other render methods
    renderCategories() {
        return allCategories.getCategories().map((category) => {
            return <div className="shadow-sm mb-4"><ProjectCard cardType="category" category={category} /></div>
        });
    }
    // Main render method
    render() {
        return (
            <div className="container">
                <div className="text-white text-center bg-main-alt mb-5 shadow-lg" style={{overflow: "hidden", borderRadius: "0 0 0.75rem 0.75rem"}}>
                    <h1 className="my-5">PROJECTS</h1>
                </div>

                <div className="bg-custom-secondary shadow-sm mb-3" style={{overflow: "hidden", borderRadius: "1.5rem"}}>
                    <h3 className="text-main my-5 text-center">FEATURED PROJECTS</h3>

                    <div className="d-flex justify-content-around w-100 mx-auto mb-5">
                        <div className="shadow-lg"><ProjectCard cardType="featured"/></div>
                        <div className="shadow-lg"><ProjectCard cardType="featured"/></div>
                        <div className="shadow-lg"><ProjectCard cardType="featured"/></div>
                    </div>
                </div>

                <div style={{overflow: "hidden"}}>
                    <h3 className="text-main text-center my-3">FIND A PROJECT</h3>

                    <div className="bg-main w-75 d-flex p-2 rounded-lg mx-auto mb-3"><div style={{height: "30px"}}></div></div>

                    <div className="d-flex flex-wrap mx-auto mb-5 justify-content-between" style={{width: "51%"}}>
                        {this.renderCategories()}
                    </div>
                </div>
            </div>
        )
    }
}
