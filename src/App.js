import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import io from 'socket.io-client'; 
import './App.css';
import AuthService from './AuthService';
import NotFound from './NotFound';
import NewJob from './NewJob';
import Job from './Job';
import Category from './Job';
import Area from './Area';

// Lister
import CategoryList from './CategoryList';
import AreaList from './AreaList';
import JobList from './JobList';


class App extends Component {

  api_url = process.env.REACT_APP_API_URL;
  
  constructor(props) {
      super(props);
      
      this.Auth = new AuthService(`${this.api_url}/users/authenticate`);

      // TODO: Move this data to the server
      this.state = {
          jobList: [],
          categoryList: [],
          areaList: [],
          loggedIn: false,
          username: ""
      };

      this.handleLogout = this.handleLogout.bind(this)
      this.getJobs = this.getJobs.bind(this);

      this.addJob= this.addJob.bind(this);
      this.addCategory= this.addCategory.bind(this);
      this.addArea= this.addArea.bind(this);
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
      this.getJobs();
      this.getCategories();
      this.getAreas();
  }



  // Henter jobs
  getJobs(){
    this.Auth.fetch(`${this.api_url}/jobs`)
        .then(data => this.setState({jobList: data}))
        .catch(err => console.error(err))
}

// Henter Job kategorier
getCategories(){
    this.Auth.fetch(`${this.api_url}/category`)
        .then(data => this.setState({categoryList: data}))
        .catch(err => console.error(err))
}

// Henter områder kategorier
getAreas(){
    this.Auth.fetch(`${this.api_url}/areas`)
        .then(data => this.setState({areaList: data}))
        .catch(err => console.error(err))
}

addJob(jobtitle, jobcategory, jobarea, description, company, email) {
    this.Auth.fetch(`${this.api_url}/NewJob`, {
        method: 'POST',
        body: JSON.stringify({
            jobtitle: jobtitle,
            jobcategory: jobcategory,
            jobarea: jobarea,
            description: description,
            company: company,
            email: email
        }),
    })
        .then(json => {
            console.log("Result of posting a // New Job");
            console.log(json);
        });
}


addArea(area) {
    this.Auth.fetch(`${this.api_url}/NewArea`, {
        method: 'POST',
        body: JSON.stringify({
            area: area,
        }),
    })
        .then(json => {
            console.log("Result of posting a // Area");
            console.log(json);
        });
}


addCategory(category) {
    this.Auth.fetch(`${this.api_url}/NewCategory`, {
        method: 'POST',
        body: JSON.stringify({
            category: category,
        }),
    })
        .then(json => {
            console.log("Result of posting a // Area");
            console.log(json);
        });
}



  // GET Job FROM ID
  getJobFromId(id) {
      console.log()
      return this.state.jobList.find((elm) => elm._id === id);
  }

 // GET Category FROM ID
  getCategoryFromId(id) {
    console.log()
    return this.state.categoryList.find((elm) => elm._id === id);
}

 // GET Area FROM ID
getAreaFromId(id) {
    console.log()
    return this.state.areaList.find((elm) => elm._id === id);
}

// Logout
  handleLogout(event) {
    this.Auth.logout()
}


  render() {


    if (localStorage.getItem("token") === "undefined") {
        return( <Login setUsername={this.setUsername}/>  
                  
            )               
    
    }

      return (
          
         <Router>
                <div className="container">
                    <div class="div-header">
                        <h3>Velkommen</h3>   
                        <form>
                            <button type="submit" class="logout" onClick={this.handleLogout}>Log ud</button>
                        </form>  
                    </div>
                <Switch>

                <Route exact path={'/'}
                               render={(props) =>
                                <React.Fragment>
                                   <CategoryList {...props} categoryList={this.state.categoryList}/>
                                </React.Fragment>}
                        />


                <Route exact path={'/jobs/:category'}
                               render={(props) =>
                                <React.Fragment>
                                   <JobList {...props} category={props.match.params.jobcategory} jobList={this.state.jobList}/>
                                </React.Fragment>}
                        />


                <Route exact path={'/area'}
                               render={(props) =>
                                <React.Fragment>
                                   <AreaList {...props} areaList={this.state.areaList}/>
                                </React.Fragment>}
                        />
                        

                <Route exact path={'/admin'}
                               render={(props) =>
                                <React.Fragment>
                                   <NewJob 
                                   {...props} 
                                   addJob={this.addJob} 
                                   cat={this.state.categoryList}
                                   area={this.state.areaList}></NewJob>
                                </React.Fragment>}
                        />

                

                <Route exact path={'/jobs/:category/:id'}
                               render={(props) =>
                                   <Job {...props}
                               jobs={this.getJobFromId(props.match.params.id) }  />

                               }
                        />

        
                <Route exact path={'/category/:id'}
                               render={(props) =>
                                   <Category {...props}
                               category={this.getCategoryFromId(props.match.params.id) }  />

                               }
                        />

                <Route exact path={'/area/:id'}
                               render={(props) =>
                                   <Area {...props}
                               areas={this.getAreaFromId(props.match.params.id) }  />

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
