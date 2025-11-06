import express from "express";
import mongoose from "mongoose";
import { createPost, getMyPosts } from "../controllers/postController.js";
import { protect } from "../middleware/authMiddleware.js";
import Post from "../models/postModel.js";

const router = express.Router();

const validateObjectId=(req,res,next)=>{
  if(!mongoose.Types.ObjectId.isValid(req.params.id)){
    return res.status(400).json({message:"Invalid post id"});
  }
  next();
};

//user posts
router.get("/mine",protect,getMyPosts);

//create post
router.post("/",protect,createPost);

// Get all public posts (everyone’s blogs)
router.get("/", async (req, res) => {
  try {
    console.log("Fetching posts..");
    const posts = await Post.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (err) {
    console.error("Error fetching posts:",err);
    res.status(500).json({ message: "Error fetching posts" });
  }
}); 

//read more of post
router.get("/:id",protect,validateObjectId,async(req,res)=>{
  try{
    console.log("Fetching",req.params.id);
    const post=await Post.findById({_id:req.params.id,user:req.user.id})
      .populate("user","name email")
      .select("title content user createdAt");
    if(!post)return res.status(404).json({message:"Post not found"});
    res.status(200).json(post);
  }catch(err){
    console.log("Error fetching post by id",err);
    res.status(500).json({message:"Error not found"});
  }
});


//update
router.put("/:id", protect, validateObjectId, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    console.log("Logged in user",req.user?.id);
    console.log("Post owner:",post.user?.toString());

    if (post.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;

    const updatedPost = await post.save();
    res.status(200).json(updatedPost);
  } catch (err) {
    console.error("Error updating post:", err);
    res.status(500).json({ message: "Error updating post" });
  }
});

//Delete Post
router.delete("/:id", protect,validateObjectId, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await post.deleteOne();
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting post" });
  }
});
 
export default router;
