const {mongoose} = require('mongoose')
const {Schema} = mongoose;

const commentSchema = new Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    postID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
})

module.exports = mongoose.model('Comment', commentSchema)