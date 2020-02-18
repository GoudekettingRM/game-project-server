const { Router } = require("express");
const Game = require("./model");

const router = new Router();

router.post("/games", async (request, response, next) => {
  // console.log(" New game endpoint! Hellooooooo");
  // response.status(200).send(" Hiyooooo");
  try {
    const { body } = request;
    console.log("body test:", body);
    const { maxPlayers, boardState, roomId } = body;
    const game = await Game.create({ maxPlayers, boardState, roomId });

    // const game = await Game.findByPk(ref.id);
    const action = {
      type: "NEW_GAME",
      payload: game
    };
    response.send(action);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
