const { Sequelize, DataTypes } = require("sequelize");
const crypto = require('crypto');
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PWD,
  {
    host: process.env.DB_HOST,
    dialect: "mariadb", 
  }
);

//run node models/user.js to test connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Sequelize connected successfully to MariaDB");
  })
  .catch((err) => {
    console.error("Sequelize was not able to connect", err);
  });

//create model for table user form db_merlin_test database
const User = sequelize.define(
  "user",
  {
    mail: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    role: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        const salt = crypto.randomBytes(16).toString('hex');
        const hash = crypto.pbkdf2Sync(value, salt, 1000, 64, 'sha512').toString('hex');
        this.setDataValue('password', `${salt}:${hash}`);
      }
    }
  },
  {
    //room for options
    timestamps: false,
  }
);

User.sync({force: true});
module.exports = User;
