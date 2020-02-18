const db = require("../db");
const Sequelize = require("sequelize");
const Room = require("../room/model");

const Game = db.define("game", {
  // roomId: {
  //   type: Sequelize.INTEGER,
  //   allowNull: false,
  //   unique: true
  // },
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
          Sequelize.ENUM(
            0,
            "I",
            "J",
            "L",
            "O",
            "S",
            "Z",
            "T",
            "clear",
            "merged"
          )
          // Sequelize.STRING
        )
      )
    ),
    // get: function() {
    //   return JSON.parse(this.getDataValue("boardState"));
    // },
    // set: function(board) {
    //   return this.setDataValue("boardState", JSON.stringify(board));
    // },
    allowNull: false
  }
});

Game.belongsTo(Room);

module.exports = Game;
