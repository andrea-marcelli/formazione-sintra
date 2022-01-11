const db = require("../models");
const object = db.objects;

// Create and Save a new object
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a object
  const object = new object({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  });

  // Save object in the database
  object
    .save(object)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the object."
      });
    });
};

// Retrieve all objects from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  object.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving objects."
      });
    });
};

// Find a single object with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  object.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found object with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving object with id=" + id });
    });
};

// Update a object by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  object.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update object with id=${id}. Maybe object was not found!`
        });
      } else res.send({ message: "object was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating object with id=" + id
      });
    });
};

// Delete a object with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  object.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete object with id=${id}. Maybe object was not found!`
        });
      } else {
        res.send({
          message: "object was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete object with id=" + id
      });
    });
};

// Delete all objects from the database.
exports.deleteAll = (req, res) => {
  object.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} objects were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all objects."
      });
    });
};

// Find all published objects
exports.findAllPublished = (req, res) => {
  object.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving objects."
      });
    });
};
