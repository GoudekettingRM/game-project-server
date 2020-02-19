const express = require("express");
const Message = require("./model");
const Room = require("../room/model");

function factory(stream) {
  const { Router } = express;

  const router = Router();

  router.post("/message", async function(request, response, next) {
    try {
      if (!request.body.text) {
        response.send("Enter text");
      }
      if (!request.body.roomId) {
        request.body.roomId = 1;
      }

      const message = await Message.create(request.body);

      const room = await Room.findByPk(request.body.roomId, {
        include: [Message]
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