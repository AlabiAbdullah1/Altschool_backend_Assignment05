const { Router } = require("express");
const userController = require("../controller/userController");

const userRouter = Router();

userRouter.get("/", userController.getAllUsers);
userRouter.post("/signup", userController.registerUser);
userRouter.post("/login", userController.loginUser);
userRouter.delete("/:id", userController.deleteuser);

module.exports = userRouter;
