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

server.listen(8000, () => console.log('API running on port 8000'));
