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

    handleLoginInput(event) {
        event.preventDefault()
        this.props.loginToApp(this.state.username, this.state.password)
        console.log(this.state.username, this.state.password);
    }


    render() {

        
        return (
            <div class="login-div">
                <h1>Virksomheds Login</h1>
                <form>
                    <label>Username</label>
                    <br />
                    <input onChange={this.onChangeUsername} type="text" placeholder="Username..." />
                    <br />
                    <label>Password</label>
                    <br />
                    <input onChange={this.onChangePassword} type="password" placeholder="Password..." />
                    <br />
                    <button type="submit" onClick={this.handleLoginInput}>LOGIN</button>
                </form>

                <button class="front-btn">
                   <a href="/">Til forsiden</a> 
                </button>
            </div>
        )
    }
}
