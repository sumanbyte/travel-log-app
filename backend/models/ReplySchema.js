const mongoose = require("mongoose");
const {Schema} = mongoose;

const replySchema = new Schema({
    commentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        required: true
    },
    text: {
        type: String,
        required: true
    },
})


module.exports = mongoose.model("Reply", replySchema);