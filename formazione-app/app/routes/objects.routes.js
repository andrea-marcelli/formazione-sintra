module.exports = app => {
  const objects = require("../controllers/objects.controller.js");

  var router = require("express").Router();

  // Create a new object
  router.post("/", objects.create);

  // Retrieve all objects
  router.get("/", objects.findAll);

  // Retrieve all published objects
  router.get("/published", objects.findAllPublished);

  // Retrieve a single object with id
  router.get("/:id", objects.findOne);

  // Update a object with id
  router.put("/:id", objects.update);

  // Delete a object with id
  router.delete("/:id", objects.delete);

  // Create a new object
  router.delete("/", objects.deleteAll);

  app.use("/api/objects", router);
};
