const { Router } = require("express");
const Game = require("./model");

const router = new Router();

router.post("/games", async (request, response, next) => {
  console.log(" New game endpoint! Hellooooooo");
  response.status(200).send(" Hiyooooo");
});

module.exports = router;
