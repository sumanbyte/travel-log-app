const express = require("express");
const port = 3000
const connectToMongo = require("./database");
var cors = require('cors')
connectToMongo()

const bodyParser = require('body-parser'); // Middleware

const app = express(); 

//middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())
app.use(cors())
 
//Login and signup endpoints
app.use('/api/auth', require('./routes/auth'))
//Post content endpoints
app.use('/api/post', require('./routes/posts'))
//edit user info endpoint
app.use('/api/editinfo', require('./routes/edit'))

app.listen(port, ()=>{
    console.log('app listening on port ', port)
})




