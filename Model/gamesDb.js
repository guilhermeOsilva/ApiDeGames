const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const Game = sequelize.define("gamesDbs", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
  },
  title: {
    type: DataTypes.STRING,
  },
  year: {
    type: DataTypes.TEXT,
  },
  price: {
    type: DataTypes.DECIMAL(3, 2),
  },
});

Game.sync().then((response) => {
  response.sendStatus(200);
});


module.exports = Game;
