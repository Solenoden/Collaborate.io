import React, { Component } from 'react';

export default class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        this.state = {
            email: "gavin@mitnet.co.za",
            password: "pw123"
        }
    }
    // OnChange Handlers
    onChangeEmail = (e) => {
        this.setState({
            email: e.target.value
        });
    }

    onChangePassword = (e) => {
        this.setState({
            password: e.target.value
        });
    }
    // onSubmit
    onSubmit = async (e) => {
        e.preventDefault();

        await this.props.loginUser(this.state.email, this.state.password);

        window.location = "/";
    }

    render() {
        return (
            <div className="shadow-lg d-flex flex-row" style={{width: "40vw", height: "20vw"}}>
                <div className="w-50 text-center p-4">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Email:</label>
                            <input className="form-control" type="email" name="email" value={this.state.email} onChange={this.onChangeEmail} placeholder="Email Address" required></input>
                        </div>

                        <div className="form-group">
                            <label>Password:</label>
                            <input className="form-control" type="password" name="password" value={this.state.password} onChange={this.onChangePassword} placeholder="Password" required></input>
                        </div>

                        <button className="font-weight-bold text-main-alt" style={{backgroundColor: "white", borderColor: "#583F59", borderWidth: "3px", padding: "5px 7px"}}>LOGIN</button>
                    </form>
                </div>
                
                    <div className="w-50 bg-custom-secondary text-white text-center">
                        <h3 className="mt-3">Don't have an account?</h3>
                        <h5 className="mt-5">    Signup for one.</h5>
                    </div>
                
            </div>
        )
    }
}
