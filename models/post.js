const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    issue_type: {
        type: String,
        enum: ['Improvement', 'Task', 'New Feature']
    },
    summary: String,
    description: String,
    priority: {
        type: String,
        enum: ['Highest', 'High', 'Low']
    },
    done: Boolean
});

const Post = mongoose.model('Post', PostSchema);


module.exports = Post;