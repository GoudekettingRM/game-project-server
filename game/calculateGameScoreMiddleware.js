const Game = require("../game/model");

async function updateGameScore(request, response, next) {
  const gameId = request.body.id;
  const { clearedRows } = request.body;
  if (!clearedRows) {
    next();
  } else {
    try {
      const game = await Game.findByPk(gameId);
      const { level, score, rows } = game.dataValues;

      const linePoints = [40, 100, 300, 1200];

      const newScore = score + linePoints[clearedRows - 1] * (level + 1);
      const newRows = rows + clearedRows;

      const newLevel = newRows > (level + 1) * 10 ? level + 1 : level;

      request.body = {
        ...request.body,
        level: newLevel,
        rows: newRows,
        score: newScore
      };
      next();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = { updateGameScore };
