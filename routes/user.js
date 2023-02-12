const express = require('express');
const  constroller = require('../controllers/user');
const router = express.Router();

//Define routes
router.get('/', constroller.getAllUsers);

module.exports = router;