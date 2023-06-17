const express = require('express')
const router = express.Router()
const User = require('../models/UserSchema')
const { createUser, loginUser, getUser } = require('../controllers/auth')
const fetchUser = require('../middleware/fetchUser')

// Route 1 : Signup and login endpoint
router.route('/signup').post(createUser)
router.route('/login').post(loginUser)
router.route('/getuser').get(fetchUser, getUser)

module.exports = router