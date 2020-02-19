const db = require("../db");
const Sequelize = require("sequelize");
const Message = require("../message/model");
const Game = require("../game/model");

const Room = db.define("room", {
  name: Sequelize.STRING
});

Message.belongsTo(Room);
Room.hasOne(Game);
Game.belongsTo(Room);
Room.hasMany(Message);

module.exports = Room;
