const express = require('express')
const router = express.Router()
const { createPost, editPost, deletePost, getPost, getAllPost, allPosts, likePost, commentPost, getCommentsForAPost } = require('../controllers/posts')
const fetchUser = require('../middleware/fetchUser')
// create, edit, delete,getposts endpoints
router.route('/getAllPost').get(fetchUser, getAllPost)
router.route('/createpost').post(fetchUser, createPost)
router.route('/editpost/:id').patch(fetchUser, editPost)
router.route('/deletepost/:id').delete(fetchUser, deletePost)

//like comment routes (login required)
router.route('/likepost/:id').get(fetchUser, likePost)
router.route('/commentpost/:id').post(fetchUser, commentPost)
// get comments for a given post id route
router.route('/getcomments/:id').get(getCommentsForAPost)

//no login required route
router.route('/getpost/:id').get(getPost)
router.route('/allposts').get(allPosts)


module.exports = router