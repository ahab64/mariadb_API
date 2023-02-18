const express = require('express');
const  constroller = require('../controllers/user');
const router = express.Router();

//Define routes
router.get('/', constroller.getAllUsers); //all users
router.get('/:id', constroller.getUserById); // user by id
router.post('/', constroller.createUser); //add new user


module.exports = router;