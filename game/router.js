const { Router } = require("express");
const Game = require("./model");

function factory(stream) {
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

  router.patch("/games", async (request, response, next) => {
    const { boardState, id } = request.body;
    console.log("Request body", request.body);
    try {
      const updateBoardState = await Game.update(
        { boardState },
        {
          where: {
            id: id
          }
        }
      );
      console.log("Updated board state test:", updateBoardState);

      const updatedGame = await Game.findByPk(id);

      const updatedGameAction = {
        type: "BOARD_UPDATED",
        payload: updatedGame
      };

      const jsonupdatedGameAction = JSON.stringify(updatedGameAction);
      stream.send(jsonupdatedGameAction);

      response.send({ message: "Game Updated Succesfully" });
    } catch (error) {
      next(error);
    }
  });
  return router;
}
module.exports = factory;
