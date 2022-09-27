const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const Sequelize = require("./Model/db");
const Game = require("./Model/gamesDb");
const jwt = require("jsonwebtoken");

var passwordSecret = "5^7zbG!o";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

function authToken(req, res, next) {
  const authToken = req.headers["authorization"];

  if (authToken !== undefined) {
    const bearerToken = authToken.split(" ");
    var token = bearerToken[1];

    jwt.verify(token, passwordSecret, (err, data) => {
      if (err) {
        res.status(401);
        res.json({ err: "Token Invalido" });
      } else {
        res.status(200);
        next();
      }
    });
  }
}
app.get("/games", authToken, async (req, res) => {
  await Game.findAll().then((response) => {
    var HATEOAS = [
      {
        href: "http://localhost:3000/game/0",
        method: "DELETE",
        rel: "delete_game",
      },
      {
        href: "http://localhost:3000/game/1",
        method: "POST",
        rel: "get_game",
      },
      {
        href: "http://localhost:3000/auth",
        method: "POST",
        rel: "authentication",
      },
    ];
    res.json({response,_links: HATEOAS});
    res.status(200);
  });
});

app.get("/game/:id", (req, res) => {
  if (isNaN(req.params.id)) {
    res.sendStatus(400);
  } else {
   
    var id = parseInt(req.params.id);

    var HATEOAS = [
      {
        href: "http://localhost:3000/game/" + id,
        method: "DELETE",
        rel: "delete_game",
      },
      {
        href: "http://localhost:3000/game/" + id,
        method: "PUT",
        rel: "edit_game",
      },
      {
        href: "http://localhost:3000/games",
        method: "Get",
        rel: "get_all_games",
      },
      
    ];

    var game = Game.findOne({ _id: id }).then((response) => {
      if (game != undefined) {
        res.status(200);
        res.json({game: response, link: HATEOAS});
      } else {
        res.sendStatus(404);
      }
    });
  }
});

app.post("/game", async (req, res) => {
  var { title, price, year } = req.body;

  if ((title, price, year == undefined)) {
    res.status(400);
    res.json({ error: "valores indefinidos" });
  } else {

   var game = await Game.create({ title: title, price: price, year: year }).catch(
      function (err) {
        res.status(400);
        res.json({ err: "erro ao criar um novo game" });
      }
    );
    res.status(200);
    res.json({game:game, link: HATEOAS });
  }
});

app.delete("/game/:id", (req, res) => {
  
  if (isNaN(req.params.id)) {
    res.sendStatus(400);
  } else {
    var id = parseInt(req.params.id);
    var exlude = Game.destroy({ where: { id: id } });
  }
});

app.put("/game/:id", async (req, res) => {
  if (isNaN(req.params.id)) {
    res.sendStatus(400);
  } else {
    
    var id = parseInt(req.params.id);

    var game = await Game.findOne({ _id: id });

    if (game != undefined) {
      var { title, price, year } = req.body;

      if (title != undefined) {
        await Game.update({ title: title }, { where: { id: id } });
      }

      if (price != undefined) {
        await Game.update({ price: price }, { where: { id: id } });
      }

      if (year != undefined) {
        await Game.update({ year: year }, { where: { id: id } });
      }

      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  }
});

app.post("/auth", (req, res) => {
  var bd = {
    email: "teste",
    password: "password",
  };

  jwt.sign(
    { email: bd.email, password: bd.password },
    passwordSecret,
    { expiresIn: "36h" },
    (err, token) => {
      if (err) {
        res.status(400);
        res.json({ err: "falha interna" });
      } else {
        res.status(200);
        res.json({ token: token });
      }
    }
  );
  res.status(200);
});

app.listen(3000, () => {
  console.log("API RODANDO!");
});
