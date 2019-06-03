import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import io from 'socket.io-client'; 
import './App.css';
import Login from './Login'
import AuthService from './AuthService';
import NotFound from './NotFound';
import NewJob from './NewJob';
import Job from './Job';
import JobList from './JobList';


class App extends Component {

  api_url = process.env.REACT_APP_API_URL;
  
  constructor(props) {
      super(props);
      
      this.Auth = new AuthService(`${this.api_url}/users/authenticate`);

      // TODO: Move this data to the server
      this.state = {
          qas: [],
          loggedIn: false
      };

      this.handleLogout = this.handleLogout.bind(this)
      this.getData = this.getData.bind(this);

      this.addJob= this.addJob.bind(this);
  }


  SOCKET_URL = `${this.api_url}/my_app`;

  componentDidMount() {

      const socket = io(this.SOCKET_URL);

      socket.on('connect',() => {
          console.log("Connected to Socket.IO");
          socket.emit('Hej', "Med" , "Dig");
      });

      socket.on('new-data', (jobs) => {
          console.log(`server msg: ${jobs.msg}`);
          this.getData();
      });
      this.getData();
  }


  getData(){
    this.Auth.fetch(`${this.api_url}/jobs`)
        .then(data => this.setState({qas: data}))
        .catch(err => console.error(err))
}

addJob(jobtitle, category, area, description) {
    this.Auth.fetch(`${this.api_url}/NewJob`, {
        method: 'POST',
        body: JSON.stringify({
            jobtitle: jobtitle,
            category: category,
            area: area,
            description: description
        }),
    })
        .then(json => {
            console.log("Result of posting a // New Job");
            console.log(json);
        });
}



  // GET QUESTION FROM ID
  getJobFromId(id) {
      console.log()
      return this.state.qas.find((elm) => elm._id === id);
  }

// Logout
  handleLogout(event) {
    this.Auth.logout()
}

  render() {

    if (localStorage.getItem("token") === "undefined") {
        return( <Login/>  )               
    
    }

      return (
         <Router>
              <div className="container">
                    <div class="div-header">
                        <h3>Du er nu logget ind</h3>   
                        <form>
                            <button type="submit" onClick={this.handleLogout}>Log ud</button>
                        </form>        
                    </div>
              
                <Switch>
                <Route exact path={'/'}
                               render={(props) =>
                                <React.Fragment>
                                <NewJob {...props} addJob={this.addJob}></NewJob>
                                   <JobList {...props}
                                         qas={this.state.qas}/>
                                </React.Fragment>}
                        />

                <Route exact path={'/jobs/:id'}
                               render={(props) =>
                                   <Job {...props}
                               jobs={this.getJobFromId(props.match.params.id) }  />

                               }
                        />

                    <Route component={NotFound} />
                </Switch>
                </div>
         </Router>
           
      );
  }
}

export default App;
