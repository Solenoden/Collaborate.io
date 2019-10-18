import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from "axios";

export default class SignupForm extends Component {
    state = {
        inputFullName: "",
        inputUsername: "",
        inputEmail: "",
        inputPassword: "",
        inputConfirmPassword: ""
    }

    static propTypes = {
        prop: PropTypes
    }
    // onSubmit Handler
    onSubmit = (e) => {
        e.preventDefault();

        const user = {
            email: this.state.inputEmail,
            fullName: this.state.inputFullName,
            username: this.state.inputUsername,
            password: this.state.inputPassword,

        }

        axios.post("http://localhost:5000/user/new", user);


        this.props.loginUser(this.state.inputEmail, this.state.inputPassword);

        window.location("/profile/me");
    }
    // OnChange Handlers
    onChangeInputFullName = (e) => {
        this.setState({
            inputFullName: e.target.value
        });
    }
    onChangeInputUsername = (e) => {
        this.setState({
            inputUsername: e.target.value
        });
    }
    onChangeInputEmail = (e) => {
        this.setState({
            inputEmail: e.target.value
        });
    }
    onChangeInputPassword = (e) => {
        this.setState({
            inputPassword: e.target.value
        });
    }
    onChangeInputConfirmPassword = (e) => {
        this.setState({
            inputConfirmPassword: e.target.value
        });
    }
    // Main render method
    render() {
        return (
            <div className="shadow-lg d-flex flex-row" style={{width: "40vw"}}>
                <div className="w-50 text-center p-4">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Full Name:</label>
                            <input className="form-control" type="text" name="fullName" value={this.state.inputFullName} onChange={this.onChangeInputFullName} placeholder="Name &amp; Surname" required></input>
                        </div>

                        <div className="form-group">
                            <label>Username:</label>
                            <input className="form-control" type="text" name="username" value={this.state.inputUsername} onChange={this.onChangeInputUsername} placeholder="Username" required></input>
                        </div>

                        <div className="form-group">
                            <label>Email:</label>
                            <input className="form-control" type="email" name="email" value={this.state.inputEmail} onChange={this.onChangeInputEmail} placeholder="example@gmail.com" required></input>
                        </div>

                        <div className="form-group">
                            <label>Password:</label>
                            <input className="form-control" type="password" name="password" value={this.state.inputPassword} onChange={this.onChangeInputPassword} placeholder="Password" required></input>
                        </div>

                        <div className="form-group">
                            <label>Confirm Password:</label>
                            <input className="form-control" type="password" name="confirmPassword" value={this.state.inputConfirmPassword} onChange={this.onChangeInputConfirmPassword} placeholder="Confirm Password" required></input>
                        </div>


                        <button className="font-weight-bold text-main-alt" style={{backgroundColor: "white", borderColor: "#583F59", borderWidth: "3px", padding: "5px 7px"}}>CREATE ACCOUNT</button>
                    </form>
                </div>
                
                    <div className="w-50 bg-custom-secondary text-white text-center">
                        <h3 className="mt-3">Already have an account?</h3>
                        <h5 className="mt-5">    Sign into it.</h5>
                    </div>
                
            </div>
        )
    }
}
