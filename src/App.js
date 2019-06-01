import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import io from 'socket.io-client'; 
import './App.css';
import Login from './Login'
import AuthService from './AuthService';





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

      this.addQuestion = this.addQuestion.bind(this);
      this.addAnswers = this.addAnswers.bind(this);    
  }


  SOCKET_URL = `${this.api_url}/my_app`;

  componentDidMount() {

      const socket = io(this.SOCKET_URL);

      socket.on('connect',() => {
          console.log("Connected to Socket.IO");
          socket.emit('Hey', "Way" , "Delay");
      });

      socket.on('new-data', (questions) => {
          console.log(`server msg: ${questions.msg}`);
          this.getData();
      });
      this.getData();
  }


  async getData(){
      fetch(`${this.api_url}/questions`)
          .then(response => {return response.json()})
          .then(data => this.setState({qas: data}))
          .catch(err => console.error(err))
  }


  addQuestion(name, questions) {
      fetch(`${this.api_url}/NewQuestion`, {
          method: 'POST',
          body: JSON.stringify({
              name: name,
              questions: questions
          }),
          headers: {
              "Content-type": "application/json; charset=UTF-8"
          }
      })
          .then(response => response.json())
          .then(json => {
              console.log("Result of posting a new Question");
              console.log(json);
          });
  }



  addAnswers(answers, id) {
      fetch(`${this.api_url}/answers/${id}`, {
          method: 'post',
          body: JSON.stringify({
              answers: answers,
          }),
          headers: {
              "Content-type": "application/json; charset=UTF-8"
          }
      })
          .then(response => response.json())
          .then(json => {
              console.log("Result of posting a new Answer");
              console.log(json);
          });
  }




  // GET QUESTION FROM ID
  getQuestionFromId(id) {
      console.log()
      return this.state.qas.find((elm) => elm._id === id);
  }

  // GET ANSWERS FROM ID
  getAnswersFromId(id) {
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
                  <Switch>
                      <Route exact path={'/'}
                             render={(props) =>
                              <React.Fragment>
                                  <h1>Du er nu logget ind</h1>
                              </React.Fragment>}
                      />
                  </Switch>

              </div>
          </Router>
      );
  }
}

export default App;
