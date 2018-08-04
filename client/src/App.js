import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Project from './components/Project'

class App extends Component {
  state = {
    projects: [],
  }
  componentDidMount() {
    axios
      .get('http://localhost:8000/api/projects')
      .then(response => {
        console.log(response);
        this.setState({ projects: response.data });
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    return (
      <div className="App">
        {
          this.state.projects.map(project => {
            return (
              <Project 
                key={project.id}
                name={project.name}
                description={project.description}
              />
            )
          })
        }
      </div>
    );
  }
}

export default App;
