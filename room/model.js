const db = require("../db");
const Sequelize = require("sequelize");
const Message = require("../message/model");

const Room = db.define("room", {
  name: Sequelize.STRING
});

Message.belongsTo(Room);
Room.hasMany(Message);

module.exports = Room;
