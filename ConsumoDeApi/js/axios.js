
    axiosConfig = {
        headers: {
          Authorization: "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RlIiwicGFzc3dvcmQiOiJwYXNzd29yZCIsImlhdCI6MTY2NDI4MzYxMSwiZXhwIjoxNjY0NDEzMjExfQ.7ZpFA1RXkS72RV6WPj4Sa5yDT5wvVaefvvYGZK5MwLU"
        }
      }
  
      function createGame() {
        var titleInput = document.getElementById("title");
        var yearInput = document.getElementById("price");
        var priceInput = document.getElementById("price");
  
        var game = {
          title: titleInput.value,
          year: yearInput.value,
          price: priceInput.value,
        };
  
        
  
        axios
          .post("http://localhost:3000/game", game)
          .then((response) => {
            if (response.status == 200) {
              alert("game cadastrado!!");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
  
      function deleteGame(ListItem) {
          var id = ListItem.getAttribute("data-id");
          console.log(ListItem);
          console.log(id);
  
          axios
            .delete("http://localhost:3000/game/" + id)
            .then((response) => {
              alert("Game deletado");
            })
            .catch((error) => console.log(error));
        }
  
      function LoadForm(ListItem) {
        var id = ListItem.getAttribute("data-id");
        var title = ListItem.getAttribute("data-title");
        var year = ListItem.getAttribute("data-year");
        var price = ListItem.getAttribute("data-price");
        document.getElementById("idEdit").value = id;
        document.getElementById("titleEdit").value = title;
        document.getElementById("yearEdit").value = year;
        document.getElementById("priceEdit").value = price;
       }
  
       function updateGame() {
        var idInput = document.getElementById("idEdit");
        var titleInput = document.getElementById("titleEdit");
        var yearInput = document.getElementById("yearEdit");
        var priceInput = document.getElementById("priceEdit");
  
        var game = {
          title: titleInput.value,
          year: yearInput.value,
          price: priceInput.value,
        };
      
      var id = idInput.value;
        axios
          .put("http://localhost:3000/game/" + id, game)
          .then((response) => {
            if (response.status == 200) {
              alert("Game atualizado!!");
            }
          })
          .catch((error) => console.log(error));
       }
  
      axios
        .get("http://localhost:3000/games", axiosConfig)
        .then((request) => {
          var games = request.data;
          var list = document.getElementById("games");
  
          games.forEach((game) => {
            var item = document.createElement("li");
            item.setAttribute("data-id", game.id);
            item.setAttribute("data-title", game.title);
            item.setAttribute("data-price", game.price);
            item.setAttribute("data-year", game.year);
  
            item.innerHTML =
              game.id + "<br> Game: " + game.title + "<br> price: R$ " +  game.price + "<br> Year:  "+ game.year + "<br>";
  
            
  
            var deleteBtn = document.createElement("button");
            deleteBtn.innerHTML = "Deletar";
            deleteBtn.addEventListener("click", function() {
              deleteGame(item);
            });
  
            var editBtn = document.createElement("button");
            editBtn.innerHTML = "Editar";
            editBtn.addEventListener("click", function () {
              LoadForm(item)});
  
  
            item.appendChild(deleteBtn);
            item.appendChild(editBtn);
  
            list.appendChild(item);
          });
        })
        .catch((error) => {
          console.error(error);
        });