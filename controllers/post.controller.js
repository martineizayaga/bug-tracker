const Post = require('../models/post.js');

exports.create = async (req, res) => {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        return res.status(403).json({
            message: 'Body should not be empty',
            statusCode: 403
        });
    }
    const { issue_type, summary, description, priority, done } = req.body;

    const newPost = new Post({
        issue_type,
        summary,
        description,
        priority,
        done,
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
            priority,
            done
        });
    } catch (error) {
        console.log('Error: ', error);
        res.status(500).json({
            message: 'Internal Server error',
            statusCode: 500
        });
    }
};

exports.get_all = async (req, res) => {
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
};

exports.update = (req, res) => {
    if (!req.body.issue_type) {
        return res.status(400).send({
            message: "Post content can not be empty"
        });
    }

    Post.findByIdAndUpdate(req.params.postId, {
        issue_type: req.body.issue_type,
        summary: req.body.summary,
        description: req.body.description,
        priority: req.body.priority,
        done: req.body.done,
    }, {new: true})
    .then(post => {
        if (!post) {
            return res.status(404).send({
                message: "Post not found with id " + req.params.postId
            });
        }
        res.send(post);
    }).catch(err => {
        if(err.kind === "ObjectId") {
            return res.status(404).send({
                message: "Post not found with id " + req.params.postId
            });
        }
        return res.status(500).send({
            message: "Error updating post with id " + res.params.postId
        });
    });
};

exports.delete = (req, res) => {
    Post.findByIdAndRemove(req.params.postId)
    .then(post => {
        if (!post) {
            return res.status(404).send({
                message: "Post not found with id " + req.params.postId
            });
        }
        res.send({message: "Post deleted successfully!"});
    }).catch(err => {
        if (err.kind === "ObjectId" || err.name === "NotFound") {
            return res.status(404).send({
                message: "Post not found with id " + req.params.postId
            });
        }
        return res.status(500).send({
            message: "Could not delete post with id " + req.params.postId
        });
    });
};

exports.get_post = (req, res) => {
    Post.findById(req.params.postId)
    .then(post => {
        if (!post) {
            return res.status(404).send({
                message: "Post not found with id " + req.params.postId,
            });
        }
        res.send(post)
    }).catch(err => {
        if (err.kind === "ObjectId" || err.name === "NotFound") {
            return res.status(404).send({
                message: "Post not found with id " + req.params.postId
            });
        }
        return res.status(500).send({
            message: "Error retrieving post with id " + req.params.postId
        });
    });
};