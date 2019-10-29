const express = require('express');
const { isEmpty } = require('lodash');
const Post = require('../models/post');
const router = express.Router();

router.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find({});

        return res.json({
            posts
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server error'
        });
    }
});

router.post('/add', async (req, res) => {
    if (isEmpty(req.body)) {
        return res.status(403).json({
            message: 'Body should not be empty',
            statusCode: 403
        });
    }
    const { issue_type, summary, description, priority } = req.body;

    const newPost = new Post({
        issue_type,
        summary,
        description,
        priority,
        date: Date.now()
    });
    try {
        await newPost.save();
        res.json({
            message: 'Data successfully saved',
            statusCode: 200,
            issue_type,
            summary,
            description,
            priority
        });
    } catch (error) {
        console.log('Error: ', error);
        res.status(500).json({
            message: 'Internal Server error',
            statusCode: 500
        });
    }
});

module.exports = router;