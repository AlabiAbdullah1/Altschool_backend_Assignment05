const { Router } = require("express");
const postController = require("../controller/postController");

const postRouter = Router();

postRouter.get("/", postController.getPosts);
postRouter.get("/:id", postController.getPostByID);
postRouter.post("/", postController.createPost);
postRouter.put("/:id", postController.updatePost);
postRouter.delete("/:id", postController.deletePost);

module.exports = postRouter;
