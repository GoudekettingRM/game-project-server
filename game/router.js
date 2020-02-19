const { Router } = require("express");
const Game = require("./model");

function factory(stream) {
  const router = new Router();

  router.post("/games", async (request, response, next) => {
    try {
      const { body } = request;
      console.log("body test:", body);
      const { maxPlayers, boardState, roomId } = body;
      const alreadyExistingGame = await Game.findOne({
        where: { roomId: roomId }
      });
      if (alreadyExistingGame) {
        response
          .status(400)
          .send({
            message:
              "This room already has a game that is running and therefore a new one cannot be created."
          })
          .end();
      } else {
        const game = await Game.create({ maxPlayers, boardState, roomId });

        const gameAction = {
          type: "NEW_GAME",
          payload: game
        };

        const jsonNewGameAction = JSON.stringify(gameAction);
        stream.send(jsonNewGameAction);
      }
    } catch (error) {
      next(error);
    }
  });

  router.patch("/games", async (request, response, next) => {
    const { id } = request.body;
    console.log("Request body", request.body);
    try {
      const updateBoardState = await Game.update(request.body, {
        where: {
          id: id
        }
      });
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
