import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Login from './Login';
import AuthService from './AuthService';


class NewJob extends Component {

    api_url = process.env.REACT_APP_API_URL;

    constructor(props) {
        super(props);

        this.Auth = new AuthService(`${this.api_url}/users/authenticate`);

        this.state = {
            jobtitle: "",
            jobcategory: "",
            jobarea: "",
            description: "",
            company: "",
            email: "",
            input: "",

        };

        this.onChange = this.onChange.bind(this);

        this.onChangeJobTitle = this.onChangeJobTitle.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangeArea = this.onChangeArea.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeCompany = this.onChangeCompany.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.handleInput = this.handleInput.bind(this);

        this.handleLogout = this.handleLogout.bind(this)
      this.loginToApp= this.loginToApp.bind(this);
    
    }

    onChange(event) {
        this.setState({
            input: event.target.value
        });
    }

    onChangeJobTitle(event) {
        this.setState({
            jobtitle: event.target.value
        });
    }

    onChangeCategory(event) {
        this.setState({
            jobcategory: event.target.value
        });
    }

    onChangeArea(event) {
        this.setState({
            jobarea: event.target.value
        });
    }

    onChangeDescription(event) {
        this.setState({
            description: event.target.value
        });
    }

    onChangeCompany(event) {
        this.setState({
            company: event.target.value
        });
    }

    onChangeEmail(event) {
        this.setState({
            email: event.target.value
        });
    }
 

    handleInput(event) {
        this.props.addJob(this.state.jobtitle, this.state.jobcategory, this.state.jobarea, this.state.description, this.state.company, this.state.email);
    }


    // Logout
  handleLogout(event) {
    this.Auth.logout()
}

async loginToApp(username, password) {
    console.log(username, password)
    let res = await this.Auth.login(username, password)
    this.setState({
        res: res.msg,
        username: username
    })
}



    render() {

        
        let cat = [];
        this.props.cat.forEach( elm => {
            cat.push(<option value={elm.category}>{elm.category}</option>)
        })
        console.log(this.props.cat)


        let area = [];
        this.props.area.forEach( elm => {
            area.push(<option value={elm.area}>{elm.area}</option>)
        })
        console.log(this.props.area)


        if (localStorage.getItem("token") === "undefined") {
            return( <Login loginToApp={this.loginToApp} />  
                      
                )               
        
        }

       
        return (

                   
            <div className="newjob-div">   
                <h3>Velkommen til Job Index 2.0</h3>   
                    <form>
                        <button type="submit" class="logout" onClick={this.handleLogout}>Log ud</button>
                    </form> 

            <h2>Tilføj et nyt jobopslag</h2>
                <form>
                    <label>Jobtitel</label>
                    <br />
                    <input type="text" onChange={this.onChangeJobTitle} className="form-control single-input" id="jobtitle" placeholder="Jobtitel" required></input>
                    <br />
                    <label>Kategori</label>
                    <br />
                    <select onChange={this.onChangeCategory}>
                    <option value="" selected disabled hidden>Vælg Kategori</option>
                        {cat}
                    </select>
                    <br />  <br />
                    <label>Virksomhed</label>
                    <br />
                    <input type="text" onChange={this.onChangeCompany} className="form-control single-input" id="company" placeholder="Virksomhed" required></input>
                    <br />
                    <label>Kontakt</label>
                    <br />
                    <input type="email" onChange={this.onChangeEmail} className="form-control single-input" id="email" placeholder="Email" required></input>
                    <br />
                    <label>Område</label>
                    <br />  
                    <select onChange={this.onChangeArea}>
                    <option value="" selected disabled hidden>Vælg Område</option>
                        {area}
                    </select>
                    <br /><br />
                    <label>Job beskrivelse</label>
                    <br />
                    <textarea onChange={this.onChangeDescription} className="form-control text-input" id="description" placeholder="Job beskrivelse" required></textarea> 
                    <br /><br />
                    <button onClick={this.handleInput}
                            type="submit" class="newjob-btn" id="submitButton"> Tilføj et job
                    </button>
                    <p className="message text-danger">{this.state.message}</p>   
                </form>
                <b><Link to={'/'}>Gå til forsiden</Link></b>
            </div>
        );
    }
}
export default NewJob;
