const User = require("../User/model");
const Game = require("../game/model");

async function changeUserWithControl(request, response, next) {
  const gameId = request.body.id;
  try {
    //find the game
    const game = await Game.findByPk(gameId);
    if (!game) {
      response
        .status(404)
        .send({ message: "game not found" })
        .end();
    }

    const playerCurrentlyInControl = game.playerWithControl;
    //find the players in that game
    const playersInGame = await User.findAll({
      where: {
        gameId: gameId
      }
    });

    if (!playersInGame.length) {
      response
        .status(404)
        .send({ message: "No players in game" })
        .end();
    }

    //set player has control to id of player currently not in control
    const nextPlayer = playersInGame.filter(
      player => player.dataValues.id !== playerCurrentlyInControl
    );
    console.log("Next player test", nextPlayer);

    const expandedRequestBody = {
      ...request.body,
      playerWithControl: nextPlayer[0].dataValues.id
    }; //this will not work if there are more than two players, because some people wont get turns.
    request.body = { ...expandedRequestBody };
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = { changeUserWithControl };
