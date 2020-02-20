const express = require("express");
const Message = require("./model");
const Room = require("../room/model");
const Game = require("../game/model");
const { auth } = require("../Authentication/authMiddleware");

function factory(stream) {
  const { Router } = express;

  const router = Router();

  router.post("/message", auth, async function(request, response, next) {
    const { text, roomId } = request.body;
    const userId = request.user.dataValues.id;
    try {
      if (!request.body.text) {
        response.send("Enter text");
      }
      if (!request.body.roomId) {
        request.body.roomId = 1;
      }

      const message = await Message.create({ text, roomId, userId });

      const room = await Room.findByPk(request.body.roomId, {
        include: [Message, Game]
      });

      const action = {
        type: "NEW_MESSAGE_IN_EXISTING_ROOM",
        payload: room
      };

      const json = JSON.stringify(action);

      stream.send(json);

      response.send(message);
    } catch (error) {
      next(error);
    }
  });

  return router;
}

module.exports = factory;
