const { Sequelize, DataTypes } = require("sequelize");
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
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    mail: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    date_of_birth: {
      type: DataTypes.DATEONLY,
    },
    land_of_residence: {
      type: DataTypes.STRING(100),
    },
    alias: {
      type: DataTypes.STRING(100),
    },
  },
  {
    //room for options
    timestamps: false,
  }
);

User.sync({alter: true});
module.exports = User;
