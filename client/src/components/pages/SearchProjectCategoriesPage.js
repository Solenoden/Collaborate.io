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
            return <div className="shadow-sm mr-4 mb-4"><ProjectCard cardType="category" category={category} /></div>
        });
    }
    // Main render method
    render() {
        return (
            <div>
                <div className="text-main text-center bg-custom-secondary" style={{overflow: "hidden"}}>
                    <h1 className="my-5">PROJECTS</h1>
                </div>

                <div className="bg-custom-pink" style={{overflow: "hidden"}}>
                    <h3 className="text-main my-5 text-center">FEATURED PROJECTS</h3>

                    <div className="d-flex justify-content-between w-75 mx-auto mb-5">
                        <div className="shadow-lg"><ProjectCard cardType="featured"/></div>
                        <div className="shadow-lg"><ProjectCard cardType="featured"/></div>
                        <div className="shadow-lg"><ProjectCard cardType="featured"/></div>
                    </div>
                </div>

                <div style={{overflow: "hidden"}}>
                    <h3 className="text-main text-center mt-5 mb-5">FIND A PROJECT</h3>

                    <div className="d-flex flex-wrap mx-auto mb-5" style={{width: "51%"}}>
                        {this.renderCategories()}
                    </div>
                </div>
            </div>
        )
    }
}
