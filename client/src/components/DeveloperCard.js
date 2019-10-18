import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class DeveloperCard extends Component {
    static propTypes = {
        // developer: PropTypes.object.isRequired,
        // cardType: PropTypes.string.isRequired
    }

    render() {
        if (this.props.cardType === "featured") {
            return (
                <div className="d-flex flex-column" style={{width: "175px", height: "260px"}}>
                    <div className="bg-white flex-fill">
                        <img className="rounded-circle mx-auto mt-3" style={{width: "92.5px", height: "92.5px", margin: "auto 25%"}}/>
                    </div>

                    <div className="bg-main-alt p-3 text-center text-white">
                        <h5>Name Surname</h5>
                        <h6>Position</h6>
                    </div>
                </div>
            )
        } else if (this.props.cardType === "basic") {
            return (
                <div className="d-flex flex-column" style={{width: "175px", height: "260px"}}>
                    <div className="bg-custom-secondary-alt flex-fill">
                        <img className="rounded-circle mx-auto mt-3" style={{width: "92.5px", height: "92.5px", margin: "auto 25%"}}/>
                    </div>
    
                    <div className="bg-main-alt p-2 text-center text-white">
                        <h5 className="my-1">Name Surname</h5>
                        <h6 style={{fontSize: "14px"}}>Field | Sub-Category, Sub-Category</h6>
                        <div className="d-flex flex-column mt-2">
                            <p className="my-0" style={{fontSize: "10px"}}>Skill 1</p>
                            <p className="my-0" style={{fontSize: "10px"}}>Skill 2</p>
                            <p className="my-0" style={{fontSize: "10px"}}>Skill 3</p>
                            <p className="my-0" style={{fontSize: "10px"}}>Skill 4</p>
                        </div>
                    </div>
                </div>
            )
        } else if (this.props.cardType === "team") {
            return (
                <div className="d-flex flex-column" style={{width: "175px", height: "260px"}}>
                    <div className="bg-white flex-fill">
                        <img className="rounded-circle mx-auto mt-3" style={{width: "92.5px", height: "92.5px", margin: "auto 25%"}}/>
                    </div>

                    <div className="bg-main-alt p-3 text-center text-white">
                        <h5>Name Surname</h5>
                        <h6>Position</h6>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <h1>Developer not found.</h1>
                </div>
            )
        }
    }
}
