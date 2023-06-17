const jwt = require('jsonwebtoken')
require('dotenv').config()


const fetchUser = (req, res, next) => {
    // get user from jwt token and add the id to the request object.
    const token = req.header("auth-token")

    if (!token) {
        res.status(401).send({ error: 'Please provide auth token' })
    }

    const data = jwt.verify(token, process.env.JWT_SECRET)

    req.user = data.user

    next()
}



module.exports = fetchUser