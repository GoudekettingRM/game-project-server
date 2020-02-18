const db = require("../db");
const Sequelize = require("sequelize");

const Message = db.define("message", {
  text: Sequelize.STRING
});

module.exports = Message;
