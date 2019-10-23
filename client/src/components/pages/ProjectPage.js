import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DeveloperCard from '../DeveloperCard'

export default class ProjectPage extends Component {
    static propTypes = {
        prop: PropTypes
    }

    render() {
        return (
            <React.Fragment>
                <div className="bg-custom-pink text-main text-center" style={{overflow: "hidden"}}>
                    <h1 className="mt-5 mb-3">PROJECT TITLE</h1>
                    <p className="mb-5">Web, Mobile</p>
                </div>

                <div className="bg-main-alt text-white" style={{overflow: "hidden"}}>
                    <h3 className="my-5 text-center">PROJECT DESCRIPTION</h3>
                    <p className="mb-5 w-50 mx-auto">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est eopksio laborum. Sed ut perspiciatis unde omnis istpoe natus error sit voluptatem accusantium doloremque eopsloi laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunot explicabo. Nemo ernim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sedopk quia consequuntur magni dolores eos qui rationesopl voluptatem sequi nesciunt. Neque porro quisquameo est, qui dolorem ipsum quia dolor sit amet, eopsmiep consectetur, adipisci </p>
                </div>

                <div className="bg-custom-pink text-main" style={{overflow: "hidden"}}>
                    <h3 className="my-3 text-center">TECHNOLOGIES</h3>

                    <div className="d-flex flex-row w-75 mx-auto justify-content-center">
                        <div>
                            <img className="mb-1 mr-2" style={{width: "50px", height: "50px"}} />
                            <p>React</p>
                        </div>
                        <div>
                            <img className="mb-1 mr-2" style={{width: "50px", height: "50px"}} />
                            <p>React</p>
                        </div>
                        <div>
                            <img className="mb-1 mr-2" style={{width: "50px", height: "50px"}} />
                            <p>React</p>
                        </div>
                    </div>
                </div>

                <div style={{height: "50vh", overflow: "hidden"}}>
                    <div id="projectCarousel" className="carousel slide w-100 h-100" data-ride="carousel">

                        <ul className="carousel-indicators">
                            <li data-target="#projectCarousel" data-slide-to="0" className="active"></li>
                            <li data-target="#projectCarousel" data-slide-to="1"></li>
                            <li data-target="#projectCarousel" data-slide-to="2"></li>
                        </ul>

                        <div className="carousel-inner mx-auto w-75 h-100">
                            <div className="carousel-item active">
                                <img  className="w-100 h-100" src="https://www.mht.net/wp-content/uploads/2016/10/Cover-ERP-PM.png" alt="Los Angeles"/>
                            </div>
                            <div className="carousel-item">
                                <img className="w-100 h-100" src="https://www.ntaskmanager.com/wp-content/uploads/2019/07/top-pivotal-tracker-alternatives-for-agile-project-manager.jpg" alt="Chicago"/>
                            </div>
                            <div className="carousel-item">
                                <img  className="w-100 h-100" src="https://2k4s4k3wofhp2b3qaf1365bl-wpengine.netdna-ssl.com/wp-content/uploads/2018/10/The-Triple-Constraints-of-Project-Management-Explained.jpg" alt="New York"/>
                            </div>
                        </div>

                        <a className="carousel-control-prev" href="#projectCarousel" data-slide="prev">
                        <span className="carousel-control-prev-icon"></span>
                        </a>
                        <a className="carousel-control-next" href="#projectCarousel" data-slide="next">
                        <span className="carousel-control-next-icon"></span>
                        </a>

                    </div>
                </div>

                <div className="bg-custom-secondary" style={{overflow: "hidden"}}>
                    <h2 className="my-5 text-center">MEET OUR TEAM</h2>
                    <DeveloperCard type="founder"/>
                    <div>
                        <DeveloperCard type="team"/>
                        <DeveloperCard type="team"/>
                        <DeveloperCard type="team"/>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
