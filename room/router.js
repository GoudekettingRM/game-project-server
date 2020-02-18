const express = require("express");
const Room = require("./model");
const Message = require("../message/model");

function factory(stream) {
  const { Router } = express;

  const router = Router();

  router.post("/room", async function(request, response, next) {
    try {
      const { body } = request;
      console.log("body test:", body);
      const { name } = body;
      const entity = { name };
      const ref = await Room.create(entity);

      const room = await Room.findByPk(ref.id, {
        include: [Message]
      });

      const action = {
        type: "ONE_ROOM",
        payload: room
      };

      const json = JSON.stringify(action);

      stream.send(json);

      response.send(room);
    } catch (error) {
      next(error);
    }
  });

  return router;
}

module.exports = factory;
