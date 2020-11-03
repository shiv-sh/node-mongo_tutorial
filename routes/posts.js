const express = require('express');
const router = express.Router();
const Posts = require('../models/Post');


// GET all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Posts.find();
        res.json(posts);
    } catch(err) {
        res.json({message: err})
    }
});


// SUBMIT a post
router.post('/', async (req, res) => {
    const post = new Posts({
        title: req.body.title,
        description: req.body.description
    });
    try {
    const savedPost = await post.save()
    res.json(savedPost);
    }
    catch(err) {
        res.json({message: err});
    }
});

// SPECIFIC post by ID

router.get('/:postId', async (req,res) => {
    console.log("params>>",req.params.postId)
    try {
        const post = await Posts.findById(req.params.postId);
        res.json(post);
    } catch(err) {
        res.json({message:err})
    }
});

// DELETE a specific post

router.delete('/:postId', async (req,res) => {
    try {
        const response  =  await Posts.remove({_id:req.params.postId});
        res.json(response);
    } catch(err) {
        res.json({message:err})
    }
})

// Update post

router.patch('/:postId', async (req,res) => {
    try {
        const updatedPost  =  await Posts.updateOne({_id:req.params.postId},
            {$set:{title: req.body.title}});
        res.json(updatedPost);
    } catch(err) {
        res.json({message:err})
    }
})

module.exports = router;