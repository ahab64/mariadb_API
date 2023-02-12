const User = require('../models/user');

//get all Users
exports.getAllUsers = (req, res) => {
    User.findAll()
        .then(allUsers => {
            res.json(allUsers);
            //res.send(allUsers);
        })
        .catch(err => {
            res.status(500).send(err);
        });
};