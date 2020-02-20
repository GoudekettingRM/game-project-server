const Sequelize = require("sequelize");
const db = require("../db");
const Game = require("../game/model");

const User = db.define("user", {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

User.belongsTo(Game);
Game.hasMany(User);

module.exports = User;
