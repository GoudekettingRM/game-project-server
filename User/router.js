const { Router } = require("express");
const bcrypt = require("bcrypt");
const User = require("./model");

const router = new Router();

router.post("/users", async (req, res, next) => {
  const { email, username } = req.body;
  if (!username || !email || !req.body.password) {
    res
      .status(400)
      .send({
        message: "Please provide valid information to sign up a new user"
      })
      .end();
  }
  try {
    const user = await User.create({
      username: username,
      email: email,
      password: bcrypt.hashSync(req.body.password, 10)
    });

    const { password, ...userData } = user.dataValues;

    res.send(userData);
  } catch (error) {
    next(error);
  }
});

router.get("/users", async (req, res, next) => {
  try {
    const users = await User.findAll();
    if (!users.length) {
      res
        .status(404)
        .send({ message: "No users yet." })
        .end();
    }
    const usersWithoutPassword = users.map(user => {
      const { password, ...userWithoutPassword } = user.dataValues;
      return userWithoutPassword;
    });

    res.json(usersWithoutPassword);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
