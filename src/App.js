import React, {Component} from 'react';
import io from 'socket.io-client'; 
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import './App.css';




class App extends Component {

  api_url = process.env.REACT_APP_API_URL;

  constructor(props) {
      super(props);

      // TODO: Move this data to the server
      this.state = {
          qas: [
          ],

      };

      this.addQuestion = this.addQuestion.bind(this);
      this.addAnswers = this.addAnswers.bind(this);

  }


  SOCKET_URL = `${this.api_url}/my_app`;

  componentDidMount() {

      const socket = io(this.SOCKET_URL);

      socket.on('connect',() => {
          console.log("Connected to Socket.IO");
          socket.emit('Hello', "Hey" , "Dav");
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


  render() {
      return (
          <Router>
              <div className="container">
                  <Switch>
                      <Route exact path={'/'}
                             render={(props) =>
                              <React.Fragment>
                                  <h1>Det virker PT.</h1>
                              </React.Fragment>}
                      />
                  </Switch>

              </div>
          </Router>
      );
  }
}

export default App;
