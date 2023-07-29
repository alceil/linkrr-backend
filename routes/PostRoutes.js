


const express = require('express');
const { createPost , getPosts,deletePost,addComment} = require('../controllers/PostController');

const router = express.Router();
router.get('/all', getPosts)
router.post('/create', createPost)
router.put('/addComment', addComment)
router.delete('/:id', deletePost)

module.exports = router







