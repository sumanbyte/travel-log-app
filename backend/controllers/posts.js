const Post = require('../models/PostSchema')
const User = require('../models/UserSchema')
const Comment = require('../models/CommentSchema')
const mongoose = require('mongoose')


const createPost = async (req, res) => {


    if (!req.body.title || !req.body.description) {
        return res.status(400).json({ message: 'Title or Description cannot be blank' })
    }

    const userID = req.user.id;

    const user = await User.findById(userID);

    if (!user) {
        return res.status(400).json({ message: "User doesn't exists." })
    }


    const post = await Post.create({
        title: req.body.title,
        description: req.body.description,
        userName: user.name,
        userID,
        likes: 0,
    })

    if (post) {

        return res.status(200).json({ message: 'Posted Successfully', post })
    } else {
        return res.status(400).json({ message: 'Cannot post at the moment' })
    }

}

const editPost = async (req, res) => {
    const { title: newTitle, description: newDescription } = req.body
    const id = req.params.id
    if (!newTitle || !newDescription) {
        return res.status(401).json({ message: 'Title or Description cannot be blank' })
    }

    var valid = mongoose.Types.ObjectId.isValid(id);


    // find if a note exist in the database if not return no note exists
    if (valid) {
        let post = await Post.findById(req.params.id)
        if (post.userID.toString() !== req.user.id) {
            return res.status(401).json({ message: "Not Allowed." })
        }
        if (!post) {
            return res.status(400).json({ message: 'No Post available to edit with that id' })
        }
        post = await Post.findByIdAndUpdate(req.params.id, {
            ...req.body,
            updatedAt: Date.now()
        }, { new: true })
        res.status(200).json({ message: 'Post Updated Successfully', post })
    } else {
        return res.status(401).json({ message: "Not a valid id" })
    }


}
const deletePost = async (req, res) => {
    const { id } = req.params
    const isValidID = mongoose.Types.ObjectId.isValid(id)

    if (isValidID) {
        const post = await Post.findById(id);
        if (post.userID.toString() !== req.user.id) {
            return res.status(401).json({ message: "Not Allowed" });
        }
        const toBeDeleted = await Post.findByIdAndDelete(id)
        if (!toBeDeleted) {
            return res.json({ message: 'Nothing to delete' })
        }
        return res.json({ message: 'Your Post has been deleted', toBeDeleted })
    } else {
        return res.json({ message: 'The thing you are trying to delete does not exists' })
    }


}
const getPost = async (req, res) => {
    const id = req.params.id
    const isValidID = mongoose.Types.ObjectId.isValid(id)

    if (isValidID) {
        Post.findOne({_id: id}).populate({
            path: 'userID',
            select: 'name'
        }).exec(function (err, post) {
            if (err) {
                return res.json({ message: "some error occured" , err})
            } else {
                return res.status(200).json({status: true, post})
            }
        })
    } else {
        return res.json({status: false, message: 'The thing you are trying to get does not exists' })

    }

}
const getAllPost = async (req, res) => {
    const userID = req.user.id;
    const allposts = await Post.find({ userID })

    if (!allposts) {
        return res.status(400).json({ message: 'There are no posts available.' })
    }

    res.status(200).json(allposts)
}

const allPosts = async (req, res) => {
    Post.find({})
        .populate({
            path: 'userID',
            select: 'name' // Specify the field(s) to include in the populated document
        })
        .exec(function (err, posts) {
            if (err) {
                return res.status(400).json({
                    status: false,
                    message: 'Cannot get any posts.'
                })
                // Handle the error
            } else {
                // Access the populated user's username for each post
                return res.status(200).json({
                    status: true,
                    message: 'Got all posts successfully',
                    posts
                })
            }
        });
}



const likePost = async (req, res) => {
    const isValidID = mongoose.Types.ObjectId.isValid(req.params.id);

    if (isValidID) {
        const post = await Post.findById(req.params.id);
        const likes = post.likes;
        //Updating the likes
        if (!likes.includes(req.user.id)) {
            const likedPost = await Post.updateOne({ _id: req.params.id }, { likes: [...likes, req.user.id] });
            res.status(200).json({ message: 'Post liking success', status: true })
        } else {
            const filteredLikes = likes.filter(liker => {
                return liker !== req.user.id;
            })

            const removeLike = await Post.updateOne({ _id: req.params.id }, { likes: [...filteredLikes] });


     
            res.status(200).json({ message: 'Post like removed', status: false, removeLike })
        }
    } else {
        return res.status(400).json({ message: "not a valid id" })
    }

}


const commentPost = async (req, res) => {
    const { comment, userID } = req.body;
    const postID = req.params.id;
    const isValidID = mongoose.Types.ObjectId.isValid(postID);

    if (isValidID) {
        const commentCreated = await Comment.create({
            comment, postID, userID
        })
        res.status(200).json({ status: true, commentCreated });

    } else {
        res.status(200).json({ status: false });
    }
}

// get comments for a given post id function
const getCommentsForAPost = async (req, res) => {
    const postID = req.params.id;
    const isValidID = mongoose.Types.ObjectId.isValid(postID);

    if (isValidID) {
        Comment.find({ postID }).populate({
            path: 'userID',
            select: 'name'
        }).exec(function (err, comments) {
            if (err) {
                res.send('some error occured.')
            } else {
                return res.status(200).send(comments)
            }
        })

    } else {
        return res.send('invalid id');
    }
}

module.exports = {
    createPost,
    editPost,
    deletePost,
    getPost,
    getAllPost,
    allPosts,
    likePost,
    commentPost,
    getCommentsForAPost
}