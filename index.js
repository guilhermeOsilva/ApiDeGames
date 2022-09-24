const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const Sequelize = require("./Model/db");
const Game = require("./Model/gamesDb");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get("/games", async (req, res) => {
  res.statusCode = 200;
  await Game.findAll().then((response) => {
    res.send(response);
  });
});

app.get("/game/:id", (req, res) => {
  if (isNaN(req.params.id)) {
    res.sendStatus(400);
  } else {
    var id = parseInt(req.params.id);

    var game = Game.findOne({ _id: id }).then((response) => {
      if (game != undefined) {
        res.statusCode = 200;
        res.send(response);
      } else {
        res.sendStatus(404);
      }
    });
    console.log(game);
  }
});

app.post("/game", (req, res) => {
  var { title, price, year } = req.body;
  var insertGame = Game.create({ title: title, price: price, year: year });
  res.sendStatus(200);
});

app.delete("/game/:id", (req, res) => {
  if (isNaN(req.params.id)) {
    res.sendStatus(400);
  } else {
    var id = parseInt(req.params.id);
    var exlude = Game.destroy({ where: { id: id } });
  }
});

app.put("/game/:id", (req, res) => {
  if (isNaN(req.params.id)) {
    res.sendStatus(400);
  } else {
    var id = parseInt(req.params.id);

    var game = DB.games.find((g) => g.id == id);

    if (game != undefined) {
      var { title, price, year } = req.body;

      if (title != undefined) {
        game.title = title;
      }

      if (price != undefined) {
        game.price = price;
      }

      if (year != undefined) {
        game.year = year;
      }

      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  }
});

app.listen(3000, () => {
  console.log("API RODANDO!");
});
