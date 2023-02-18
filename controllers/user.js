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

//get a User by id
exports.getUserById = (req, res) => {
    User.findByPk(req.params.id)
        .then(userById => {
            res.json(userById);
        })
        .catch(err => {
            res.status(500).send(err);
        })
};

//insert into user
exports.createUser = (req, res) => {
    User.create(req.body, { fields: ['mail', 'date_of_birth', 'land_of_residence', 'alias'] })
        .then(newUser => {
            res.json(newUser);
        })
        .catch(err => {
            res.status(500).send(err);
        });
};