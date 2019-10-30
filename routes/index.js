const express = require('express');
const { isEmpty } = require('lodash');
const Post = require('../models/post');
const router = express.Router();
const posts = require('../controllers/post.controller.js');

router.get('/posts', posts.get_all);

router.post('/add', posts.create);

router.get('/post/:postId', posts.get_post);

router.put('/post/:postId', posts.update);

router.delete('/post/:postId', posts.delete);

module.exports = router;