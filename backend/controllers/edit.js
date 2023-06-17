const User = require('../models/UserSchema')
const editInfo = async (req, res, next)=> {
    const {name} = req.body;
    
    if(!name) {
        return res.status(401).json({status: false, message: 'Name must be provided'})
    }
    const newUser = await User.findByIdAndUpdate(req.user.id, req.body, {new: true})

    res.status(200).json({status: true, message: "Updated Successfully",newUser})
}

module.exports = {editInfo}