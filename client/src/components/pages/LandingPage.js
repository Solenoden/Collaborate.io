import React from 'react'

export default function LandingPage() {
    return (
        <div>

            <div className="text-white text-center" style={{backgroundColor: "#593F59", height: "100vh", overflow: "hidden"}}>
                <h1 className="font-weight-bold" style={{marginTop: "40vh"}}>Collaborate.io</h1>
                <p>A place where software developers can come together to collaborate, and make something great.</p>
            </div>

            <div className="bg-custom-pink text-main" style={{overflow: "hidden"}}> 
                <div className="container mb-5">
                    <h3 className="text-center mt-5 font-weight-bold" style={{marginBottom: "75px"}}>WHAT COLLABORATE.IO CAN DO FOR YOU</h3>
                    <div className="d-flex justify-content-center">
                        <div style={{width: "200px", marginRight: "50px"}}>
                            <img className="mx-auto" style={{width: "50px", height: "50px"}} alt=""/>
                            <p className="text-main">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est eopksio laborum. Sed ut</p>
                        </div>
                        <div style={{width: "200px",  marginRight: "50px"}}>
                            <img className="mx-auto" style={{width: "50px", height: "50px"}} alt=""/>
                            <p className="text-main">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est eopksio laborum. Sed ut</p>
                        </div>
                        <div style={{width: "200px"}}>
                            <img className="mx-auto" style={{width: "50px", height: "50px"}} alt=""/>
                            <p className="text-main">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est eopksio laborum. Sed ut</p>
                        </div>
                    </div>

                
                </div>
            </div>

            <div className="bg-custom-secondary text-main text-center" style={{overflow: "hidden"}}>
                <div className="container mb-5">
                    <h3 className="my-5 font-weight-bold">OUR MISSION</h3>
                    <p className="w-25 mx-auto">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est eopksio laborum. Sed ut perspiciatis unde omnis istpoe natus error sit voluptatem accusantium doloremque eopsloi laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunot explicabo. Nemo ernim ipsam voluptatem quia</p>
                </div>
            </div>

            <div className="container text-center mx-auto pb-5" style={{overflow: "hidden"}}>
                <h3 className="text-main my-5 font-weight-bold">HOW TO USE COLLABORATE.IO</h3>

                <div className="d-flex flex-row justify-content-center mb-5">
                    <div className="shadow-lg p-3 mr-5" style={{width: "200px", height: "100px"}}><p className="my-auto mx-auto text-main">Make an account.<br />   Complete your profile.</p></div>
                    <div className="shadow-lg p-3 ml-5" style={{width: "200px", height: "100px"}}><p className="my-auto mx-auto text-main">Make an account.<br />   Complete your profile.</p></div>
                </div>
                <div className="d-flex flex-row justify-content-center">
                    <div className="shadow-lg p-3 mr-5" style={{width: "200px", height: "100px"}}><p className="my-auto mx-auto text-main">Make an account.<br />   Complete your profile.</p></div>
                    <div className="shadow-lg p-3 ml-5" style={{width: "200px", height: "100px"}}><p className="my-auto mx-auto text-main">Make an account.<br />   Complete your profile.</p></div>
                </div>
            </div>

        </div>
    )
}
