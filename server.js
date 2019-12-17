// var express = require("express");
// var path = require("path")

// var PORT = process.env.PORT || 8080;

// var app = express();

// app.use(express.static(path.join(__dirname, 'public')));

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// var routes = require("./controllers/burgers_controller.js");

// app.use(routes);

// app.listen(PORT, function() {
//   console.log("Server listening on: http://localhost:" + PORT);
// });

// sequelized

var express = require("express");

var app = express();
var PORT = process.env.PORT || 8080;

var db = require("./models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
