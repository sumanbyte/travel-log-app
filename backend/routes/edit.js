const express = require('express');
const { editInfo } = require('../controllers/edit');
const fetchUser = require('../middleware/fetchUser')
const router = express.Router();

router.route('/edit').patch(fetchUser, editInfo)

module.exports = router