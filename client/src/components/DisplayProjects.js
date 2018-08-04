import React, { Component } from 'react';
import axios from 'axios';
import Project from './Project'

class DisplayProjects extends Component {
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

export default DisplayProjects;