const express = require("express");
const cors = require("cors");
const app = express();

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
app.listen(port, onListen);
