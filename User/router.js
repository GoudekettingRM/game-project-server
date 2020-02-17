const { Router } = require("express");
const db = require("../db");
const User = require("./model");

const router = new Router();

router.post("/users", async (req, res, next) => {
  const { password, email, username } = req.body;
  if (!username || !email || !password) {
    res
      .status(400)
      .send({
        message: "Please provide valid information to sign up a new user"
      })
      .end();
  }
  try {
    const user = await User.create(req.body);
    res.send(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
