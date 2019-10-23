import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DeveloperCard from '../DeveloperCard'

export default class SearchProjectsPage extends Component {
    static propTypes = {
        prop: PropTypes
    }

    render() {
        return (
            <div>
                <div className="text-center text-main bg-custom-secondary" style={{overflow: "hidden"}}>
                    <h1 className="my-5">WEB DEVELOPMENT</h1>
                </div>

                <div className="bg-custom-pink" style={{overflow: "hidden"}}>
                    <h3 className="text-center my-3">LATEST WEB PROJECTS</h3>
                </div>

                <div style={{overflow: "hidden"}}>
                    <h3 className="text-center text-main my-3">FIND A PROJECT</h3>

                    <div className="text-white bg-main rounded-lg w-75 mx-auto p-2 mb-3 d-flex">
                        <input className="form-control" style={{width: "25%", height: "30px"}} placeholder="Project Name..."/>
                    </div>

                    <div className="d-flex" style={{overflow: "hidden"}}>

                    </div>
                </div>

                <div className="bg-custom-pink" style={{overflow: "hidden"}}>
                        <h3 className='text-main mt-3 mb-5 text-center'>TOP WEB DEVELOPERS</h3>

                        <div className="d-flex flex-row w-75 mx-auto mb-5 justify-content-center">
                            <div className="shadow-sm mr-4"><DeveloperCard cardType="featured"/></div>
                            <div className="shadow-sm mr-4"><DeveloperCard cardType="featured"/></div>
                            <div className="shadow-sm mr-4"><DeveloperCard cardType="featured"/></div>
                        </div>
                </div>
            </div>
        )
    }
}
