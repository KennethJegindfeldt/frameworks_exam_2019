import React, { Component } from 'react'
import AuthService from './AuthService';

export default class Login extends Component {
    
    api_url = process.env.REACT_APP_API_URL;
    
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

    /*handleLoginInput(event) {
        this.Auth.login(this.state.username, this.state.password)
    }*/

    handleLoginInput(event) {
        event.preventDefault()
        this.props.loginToApp(this.state.username, this.state.password)
        console.log(this.state.username, this.state.password);
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
