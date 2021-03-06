// // Import the ORM to create functions that will interact with the database.
// var orm = require("../config/orm.js");

// var burger = {
//   selectAll: function(cb) {
//     orm.all("burgers", function(res) {
//       cb(res);
//     });
//   },
//   insertOne: function(cols, vals, cb) {
//     orm.create("burgers", cols, vals, function(res) {
//       cb(res);
//     });
//   },
//   updateOne: function(objColVals, condition, cb) {
//     orm.update("burgers", objColVals, condition, function(res) {
//       cb(res);
//     });
//   },

//   delete: function(condition, cb) {
//     orm.delete("burgers", condition, function(res) {
//       cb(res);
//     });
//   }
// };

// // Export the database functions for the controller.
// module.exports = burger;

//sequelized

module.exports = function(sequelize, DataTypes) {
    var Post = sequelize.define("Post", {
        id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        validate: {
          len: [1]
        }
      },
        burger_name: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
       devoured: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    });
    return Post;
  };
  