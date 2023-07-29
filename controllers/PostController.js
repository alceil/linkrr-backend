
const PostModel = require("../models/post");

 const getPosts = async (req, res) => {
  try {
    const allNotif = await PostModel.find({}).sort({ _id: -1 });
    if (allNotif) {
      return res.status(200).json(allNotif);
    }
  } catch (error) {
    return res.status(400).json(error);
  }
  };



  const deletePost = async (req, res) => {
    const { id } = req.params;
    try {
      if (id) {
        const getDeletedData = await PostModel.findByIdAndDelete(id);
        return res.status(200).json(getDeletedData);
      } else {
        return res.status(400).json({ message: "Id not found" });
      }
    } catch (error) {
      return res.status(400).json(error);
    }
  };

  const addComment = async (req, res) => {
    const { id,content,userName,avatarUrl,date} = req.body;
  
    // console.log(req.body)
    try {
      if (id) {
        const addComment = await PostModel.findByIdAndUpdate(id, { $push:{comments:{content,userName,avatarUrl,date}}});
        return res.status(200).json(addComment);
      } else {
        return res.status(400).json({ message: "Id not found" });
      }
    } catch (error) {
      console.log(error)
      return res.status(400).json(error);
    }
  };


 const createPost = async (req, res) => {

  const tempPost = new PostModel(req.body);
  try {
    const post = await tempPost.save();
    res.status(200).json({ post});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

  };


  module.exports = {getPosts,createPost,deletePost,addComment}