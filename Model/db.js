const { Sequelize } = require('sequelize');


const sequelize =  new Sequelize('games', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql'
}

);

module.exports = sequelize;