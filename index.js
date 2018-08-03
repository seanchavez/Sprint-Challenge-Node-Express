const express = require('express');
const projectDb = require('./data/helpers/projectModel');
const actionDb = require('./data/helpers/actionModel');

const server = express();
server.use(express.json());

//===========Projects===========

server.get('/api/projects', (req, res) => {
  projectDb.get()
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500)
        .json({ error: "The projects information could not be retrieved"});
    });
});

server.get('/api/projects/:id', (req, res) => {
  projectDb.get(req.params.id)
    .then(response => {
      if (!response) {
        res.status(404)
          .json({ message: "The project with the specified ID does not exist" });
      } else {
        res.status(200).json(response);
      } 
    })
    .catch(err => {
      res.status(500)
        .json({ error: "The project information could not be retrieved"});
    });
});

server.post('/api/projects',(req, res) => {
  const name = req.body.name;
  if (!name || name.length > 128 || !req.body.description) {
    res.status(400)
      .json({ message: "Please provide a project name up to 128 characters long and a description of the project"});
    return;
  }
  projectDb.insert(req.body)
    .then(response => {
      res.status(201).json(response);
    })
    .catch(err => {
      res.status(500)
        .json({ error: "There was an error saving the project to the database"});
    });
});

server.delete('/api/projects/:id', (req,res) => {
  projectDb.remove(req.params.id)
    .then(response => {
      if (response === 0) {
        res.status(404)
          .json({ message: "The project with the specified ID does not exist"});
      } else {
        res.status(200);
      }
    })
    .catch(err => {
      res.status(500)
        .json({ error: "The project could not be deleted" });
    });
});

server.put('/api/projects/:id', (req, res) => {
  const name = req.body.name;
  if (!name || name.length > 128 || !req.body.description) {
    res.status(400)
      .json({ message: "Please provide a project name up to 128 characters long and a description of the project"});
    return;
  }
  projectDb.update(req.params.id, req.body)
    .then(response => {
      if (!response) {
        res.status(404)
          .json({ message: "The project with the specified ID does not exist" });
      } else {
        res.status(200);
      }
    })
    .catch(() => {
      res.status(500)
        .json({ error: "The project information could not be modified"});
    });
});

server.get('/api/projects/:id/actions/', (req, res) => {
  const id = req.params.id;
  projectDb.get(id)
    .then(response => {
      if (!response) {
        res.status(404).json({ message: "The project with the specified ID does not exist"})
      } else {
        projectDb.getProjectActions(id)
          .then(response => {
            if (response.length === 0) {
              res.status(404)
                .json({ message: "There are no actions associated with the specified project" });
            } else {
              res.status(200).json(response);
            }
          })
          .catch(err => {
            res.status(500).json({ error: "The actions could not be retrieved" });
          });
      };
    })
    .catch(err => {
      res.status(500).json({ error: "The projects could not be retrieved" });
    });
});

//============Actions============

server.get('/api/actions', (req, res) => {
  actionDb.get()
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500)
        .json({ error: "The actions information could not be retrieved"});
    });
});

server.get('/api/actions/:id', (req, res) => {
  actionDb.get(req.params.id)
    .then(response => {
      if (!response) {
        res.status(404)
          .json({ message: "The action with the specified ID does not exist" });
      } else {
        res.status(200).json(response);
      } 
    })
    .catch(err => {
      res.status(500)
        .json({ error: "The action information could not be retrieved"});
    });
});

server.listen(8000, () => console.log('API running on port 8000'));
