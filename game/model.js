const db = require("../db");
const Sequelize = require("sequelize");
// const User = require("../User/model");

const Game = db.define("game", {
  maxPlayers: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  full: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  boardState: {
    type: Sequelize.ARRAY(
      Sequelize.ARRAY(
        Sequelize.ARRAY(
          // Sequelize.ENUM(
          //   0,
          //   "I",
          //   "J",
          //   "L",
          //   "O",
          //   "S",
          //   "Z",
          //   "T",
          //   "clear",
          //   "merged"
          // )
          Sequelize.STRING
        )
      )
    ),
    allowNull: false
  },
  gameStarted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  status: {
    type: Sequelize.STRING,
    defaultValue: null
  },
  playerWithControl: {
    type: Sequelize.INTEGER
  }
});

module.exports = Game;
