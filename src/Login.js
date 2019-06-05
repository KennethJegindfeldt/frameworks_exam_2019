import React, { Component } from 'react'
import AuthService from './AuthService';

export default class Login extends Component {
    api_url = 'http://localhost:9090/api';
    constructor(props) {
        super(props)

        this.Auth = new AuthService(`${this.api_url}/users/authenticate`);

        this.state = {
            // TODO: This needs to come from a Login component.
            username: "",
            password: ""
        }

        this.handleLoginInput = this.handleLoginInput.bind(this)
        this.onChangeUsername = this.onChangeUsername.bind(this)
        this.onChangePassword = this.onChangePassword.bind(this)
    }

    componentDidMount() {
        console.log("App component has mounted");

        // TODO: Move this to a Login component
        this.Auth.login(
            this.state.username,
            this.state.password
        )
            .then(response => {
                console.log("Authentication:", response.msg);
                this.getData();
            })
            .catch(error => {
                // TODO: Inform the user about the error
                console.error("Error authenticating:", error);
            });
    }


    onChangeUsername(event) {
        this.setState({
            username: event.target.value
        })
    }

    onChangePassword(event) {
        this.setState({
            password: event.target.value
        })
    }

    handleLoginInput(event) {
        this.Auth.login(this.state.username, this.state.password)
        this.props.setUsername(this.state.username)
    }



    render() {
        return (
            <div>
                <h1>Login her</h1>
                <form>
                    <label>Username</label>
                    <input onChange={this.onChangeUsername} placeholder="Username..." />

                    <label>Password</label>
                    <input onChange={this.onChangePassword} placeholder="Password..." />

                    <button type="submit" onClick={this.handleLoginInput}>LOGIN</button>
                </form>
            </div>
        )
    }
}