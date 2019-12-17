// *********************************************************************************
// Requiring our Todo model
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  app.get("/api/burgers", function(req, res) {
    db.Post.findAll({}).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // POST route for saving a new post
  app.post("/api/burgers", function(req, res) {
    console.log(req.body);
    db.Post.create({
      id: req.body.id,
      burger_name: req.body.burger_name,
      devoured: req.body.devoured
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  app.delete("/api/burgers/:id", function(req, res) {
    db.Post.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  app.put("/api/burgers", function(req, res) {

    db.Post.update(req.body,{}, 
      {
      where: {
        id: req.body.id
      }
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });
};