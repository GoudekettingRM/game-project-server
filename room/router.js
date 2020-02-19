const express = require("express");
const Room = require("./model");
const Message = require("../message/model");
const Game = require("../game/model");

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
        include: [Message, Game]
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

  router.get("/room/:id", async (request, response, next) => {
    const roomId = request.params.id;
    console.log("Room id test", roomId);

    try {
      const room = await Room.findByPk(roomId, { include: [Message, Game] });
      if (!room) {
        response
          .status(404)
          .send({ message: "Room not found" })
          .end();
      }

      const roomAction = {
        type: "FETCH_DATA_OF_ONE_ROOM",
        payload: room
      };

      // const jsonRoom = JSON.stringify(roomAction);

      // stream.send(jsonRoom);

      response.send(room);
    } catch (error) {
      next(error);
    }
  });

  return router;
}

module.exports = factory;
