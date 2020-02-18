const express = require("express");
const cors = require("cors");
const app = express();
const userRouter = require("./User/router");
const authenticationRouter = require("./Authentication/router");

const Sse = require("json-sse");
const Room = require("./room/model");
const Message = require("./message/model");
const messageFactory = require("./message/router");
const roomFactory = require("./room/router");

const port = process.env.PORT || 4000;

// ----------------------------- OTHER FUNCTIONS --------------------------- //

function onListen() {
  console.log(`Example app listening on port ${port}!`);
}
// ----------------------------- MIDDLEWARE --------------------------- //
const corsMiddleware = cors();
app.use(corsMiddleware);

const jsonMiddleware = express.json();
app.use(jsonMiddleware);

// ----------------------------- ROUTERS --------------------------- //

const stream = new Sse();

// // get on the stream
app.get("/stream", async (request, response, next) => {
  try {
    const rooms = await Room.findAll({ include: [Message] });

    const action = {
      type: "ALL_ROOMS",
      payload: rooms
    };

    const json = JSON.stringify(action);

    stream.updateInit(json);
    stream.init(request, response);
  } catch (error) {
    next(error);
  }
});

const messageRouter = messageFactory(stream);
app.use(messageRouter);

const roomRouter = roomFactory(stream);
app.use(roomRouter);

app.use(authenticationRouter);
app.use(userRouter);

app.use(messageFactory, roomFactory);

app.listen(port, onListen);
