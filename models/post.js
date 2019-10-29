const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    issue_type: String,
    summary: String,
    description: String,
    priority: Date
});

const Post = mongoose.model('Post', PostSchema);


module.exports = Post;