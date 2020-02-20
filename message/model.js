const db = require("../db");
const Sequelize = require("sequelize");
const User = require("../User/model");

const Message = db.define("message", {
  text: Sequelize.STRING
});

Message.belongsTo(User);
User.hasMany(Message);

module.exports = Message;
