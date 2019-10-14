import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class SideNav extends Component {
    static propTypes = {
        user: PropTypes.object
    }

    render() {
        return (
            <div className="d-flex flex-column justify-content-between" style={{width: "8vw", height: "100vh", backgroundColor: "#260223"}}>
                <div className="d-flex flex-column p-2">
                    <img className="mx-auto my-3" style={{width: "50px", height: "50px"}} src="https://cdn-prod.medicalnewstoday.com/content/images/articles/279/279359/eggplants.jpg" alt="Profile"/>
                    <h6 className="text-white text-center">Username</h6>
                </div>

                <div className="p-2 text-main text-center" style={{backgroundColor: "#A4BF44"}}>
                    <h6 className="mb-3">HOME</h6>
                    <h6 className="mb-3">PROJECTS</h6>
                    <h6 className="mb-3">DEVELOPERS</h6>
                    <h6>HELP</h6>
                </div>

                <div>

                </div>
            </div>
        )
    }
}
