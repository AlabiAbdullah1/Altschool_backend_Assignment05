const Users = require("../model/user");
const passport = require("passport");
require("dotenv").config();

module.exports.getAllUsers = function (req, res) {
  Users.find({})
    .then((user) => {
      res.status(200).json({
        message: "Success",
        count: Users.length,
        data: {
          user,
        },
      });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

module.exports.registerUser = function (req, res) {
  const info = req.body;
  Users.create(info)
    .then((user) => {
      res.status(201).json({
        message: "User created Succesfully!",
        data: {
          id: user._id,
          name: req.body.name,
          email: req.body.email,
          updatedAt: Date.now(),
          createdAt: Date.now(),
        },
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: "An error occured while creating the user",
        errorMessaage: err.message,
      });
    });
};

module.exports.loginUser = function (req, res, next) {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err) {
        return next(err);
      }
      if (!user) {
        const error = new Error("Username or password is incorrect");
        return next(error);
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const body = { _id: user._id, email: user.email };
        const token = jwt.sign({ user: body }, process.env.JWT_SECRET, {
          expiresIn: 60 * 60 * 24,
        });

        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  });
};

module.exports.deleteuser = function (req, res) {
  const id = req.params.id;
  Users.findByIdAndDelete(id)
    .then((user) => {
      res.status(200).json({
        message: "User deleted Successfully!",
      });
    })
    .catch((err) => {
      res.json({
        message: err.message,
      });
    });
};
