const Sequelize = require("sequelize");

const databaseUrl =
  process.env.DATABASE_URL ||
  "postgres://postgres:secret@localhost:5432/postgres";

const db = new Sequelize(databaseUrl);

try {
  db.sync({ force: false }).then(() => console.log("Database connected"));
} catch (err) {
  console.error("Error synching database ", err);
}

module.exports = db;
