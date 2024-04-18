const express = require("express");
const bodyParser = require("body-parser");
const userRouter = require("./Routes/user");
const connectToMongoDB = require("./db");
const postRouter = require("./Routes/post");
const passport = require("passport");
require("dotenv").config();

const PORT = process.env.PORT;
const app = express();
app.use(express.json());

// Connect To Database:
connectToMongoDB();

app.use("/users", userRouter);
app.use("/posts", postRouter);

app.get("/", (req, res) => {
  res.send("Welcome to my API");
});

app.listen(`${PORT}`, () => {
  console.log(`Server listening on port ${PORT} `);
});
