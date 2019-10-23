import React, { Component } from 'react';
import PropTypes from 'prop-types';
import allCategories from "../../utils/allCategories";
import {Link} from "react-router-dom";

export default class SearchProjectCategoriesPage extends Component {
    static propTypes = {
        prop: PropTypes
    }
    // Other render methods
    renderCategories() {
        return allCategories.getCategories().map((category) => {
            return <Link to={"/projects/" + category} className="text-main" style={{textDecoration: "none"}}><div className="shadow-lg text-center mb-3 mr-3" style={{width: "200px", height: "100px"}}><p>{category}</p></div></Link>
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
                    <h3 className="text-main my-3 text-center">FEATURED PROJECTS</h3>

                    <div className="d-flex">

                    </div>
                </div>

                <div style={{overflow: "hidden"}}>
                    <h3 className="text-main text-center mt-3 mb-5">FIND A PROJECT</h3>

                    <div className="d-flex flex-wrap w-50 mx-auto mb-5">
                        {this.renderCategories()}
                    </div>
                </div>
            </div>
        )
    }
}
