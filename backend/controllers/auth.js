const User = require('../models/UserSchema')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

// login endpoint 
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({
        email
    });



    if (user) {
        if (await bcrypt.compare(password, user.password)) {
            //generating jwt payload and data
            const data = {
                user: {
                    id: user._id,
                    email: user.email,
                    name: user.name
                }
            }
            const authToken = jwt.sign(data, process.env.JWT_SECRET);
            return res.status(200).json({
                success: true,
                message: "you are logged in.",
                authToken
            })
        } else {
            res.status(400).json({ success: false, message: 'Either email or password is incorrect.' })
        }
    } else {
        return res.status(400).json({
            success: false,
            message: "Either email or password is incorrect."
        })
    }


}

// signup endpoint
const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    // salting the password
    let salt = await bcrypt.genSalt(10);
    // hashing the password using the salt
    let hashedPassword = await bcrypt.hash(password, salt);

    //querying db to check if a user already exists
    const user = await User.findOne({
        email: email
    });

    if (user) {
        return res.status(400).json({ message: "User with the same email already exists." })
    } else {
        const user = await User.create({
            name, email, password: hashedPassword
        });

        //generating jwt payload and data
        const data = {
            user: {
                id: user._id,
                email: user.email,
                name: user.name
            }
        }
        const authToken = jwt.sign(data, process.env.JWT_SECRET);

        return res.status(201).json({ success: true, message: "User Created Successfully", user, authToken })
    }

}

const getUser = async (req, res) => {
    let userId = req.user.id;
    const user = await User.findById(userId).select('-password');
    res.status(200).json({ status: 'ok', user })
}



module.exports = {
    loginUser,
    createUser,
    getUser
}