const actionDb = require('../data/helpers/actionModel');
const express = require('express');

const actionRouter = express.Router();

actionRouter.get('/', (req, res) => {
  actionDb.get()
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500)
        .json({ error: "The actions information could not be retrieved"});
    });
});

actionRouter.get('/:id', (req, res) => {
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

actionRouter.post('/',(req, res) => {
  const description = req.body.description;
  if (!description || description.length > 128 || !req.body.notes) {
    res.status(400)
      .json({ message: "Please provide a description up to 128 characters long and some notes"});
    return;
  }
  actionDb.insert(req.body)
    .then(response => {
      res.status(201).json(response);
    })
    .catch(err => {
      res.status(500)
        .json({ error: "There was an error saving the action to the database"});
    });
});

actionRouter.delete('/:id', (req,res) => {
  actionDb.remove(req.params.id)
    .then(response => {
      if (response === 0) {
        res.status(404)
          .json({ message: "The action with the specified ID does not exist"});
      } else {
        res.status(200);
      }
    })
    .catch(err => {
      res.status(500)
        .json({ error: "The action could not be deleted" });
    });
});

actionRouter.put('/:id', (req, res) => {
  const description = req.body.description;
  if (!description || description.length > 128 || !req.body.notes) {
    res.status(400)
      .json({ message: "Please provide a description up to 128 characters long and some notes"});
    return;
  }
  actionDb.update(req.params.id, req.body)
    .then(response => {
      if (!response) {
        res.status(404)
          .json({ message: "The action with the specified ID does not exist" });
      } else {
        res.status(200);
      }
    })
    .catch(() => {
      res.status(500)
        .json({ error: "The action information could not be modified"});
    });
});
 
module.exports = actionRouter;
