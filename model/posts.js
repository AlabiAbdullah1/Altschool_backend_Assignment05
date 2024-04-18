const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: [true, "Please input the title"],
  },
  postbody: {
    title: String,
    // required: true,
  },
});

const Post = mongoose.model("posts", postSchema);
module.exports = Post;
