const express = require('express');
const router = express.Router();
const { registerUser, getUsers } = require('../controllers/usersCtrl');

router.post('/', registerUser);   // register
router.get('/', getUsers);        // list users (example)

module.exports = router;
