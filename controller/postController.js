const Posts = require("../model/posts");

// GET ALL POSTS:
module.exports.getPosts = function (req, res) {
  Posts.find({})
    .then((book) => {
      res.status(200).json({
        message: "Success",
        data: {
          book,
        },
      });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

// GET A POST BY ID:
module.exports.getPostByID = function (req, res) {
  const id = req.params.id;
  Posts.findById(id)
    .then((book) => {
      res.status(200).json({
        message: "Success",
        data: {
          book,
        },
      });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

// CREATE A POST
module.exports.createPost = function (req, res) {
  const post = req.body;
  Posts.create(post)
    .then((post) => {
      res.status(201).json({
        message: "Post created successfully!",
        data: {
          post,
        },
      });
    })
    .catch((err) => {
      res.status(400).send(err.message);
    });
};

// UPDATE A POST
module.exports.updatePost = function (req, res) {
  const id = req.params.id;
  const postToUpdate = req.body;
  Posts.findByIdAndUpdate(id, postToUpdate).then((post) => {
    res.status(200).json({
      message: "Post updated Successfully!",
    });
  });
};

//DELETE APOST
module.exports.deletePost = function (req, res) {
  const id = req.params.id;
  const postToDelete = req.body;
  Posts.findByIdAndDelete(id, postToDelete)
    .then((post) => {
      res.status(200).json({
        message: "Post Deleted Successfully!",
      });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};
