const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const Game = sequelize.define("gamesDbs", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
  },
  year: {
    type: DataTypes.TEXT,
  },
  price: {
    type: DataTypes.DECIMAL(5, 2)
  },
});

Game.sync().then((response) => {
    console.log("working")
}).catch((error) => console.log(error));


module.exports = Game;
