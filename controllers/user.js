const User = require('../models/user');
const crypto = require('crypto');
const { json } = require('body-parser');
const { Op, where } = require("sequelize");


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
exports.createUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body, 
            { fields: ['mail', 'alias', 'role', 'password'] })
            res.status(201).json({
                status: 'success',
                data: {
                    newUser
                }
            });
    } catch(err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

//login function
checkCredentials = async(mail, password) => {
    try {
        const user = await User.findOne({ where: { mail } });
        if (!user) {
          return { success: false, message: 'User not found' };
        }
        const [salt, storedHash] = user.password.split(':');
        console.log(salt);
        const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
        console.log(hash);
        if (hash !== storedHash) {
          return { success: false, message: 'Invalid password' };
        }
        return { success: true, message: 'Login successful', user };
      } catch (err) {
        console.error(`Error during login: ${err.message}`);
        return { success: false, message: 'Login failed' };
      }
    }

//login
exports.login = async(req, res) => {
    try {
        const { mail, password } = req.body;
        const result = await checkCredentials(mail, password);
        if (result.success) {
          res.status(200).json(result);
        } else {
          res.status(401).json(result);
        }
      } catch (err) {
        console.error(`Error during login: ${err.message}`);
        res.status(500).json({ success: false, message: 'Server error' });
      }
}
