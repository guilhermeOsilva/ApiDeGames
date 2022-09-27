# ApiDeGames
Uma API de cadastro, edição e exclusão de games

## EndPoints:

### GET /games 
Esse endpoint é responsavel por retornar a listagem de games cadastrados no banco de dados.
#### Parametros :
Nenhum
##### Respostas OK! 200
Caso a resposta ocorra, será mostrado a listagem de dados.
##### Exemplo De Resposta: 
```
[
    {
        "id": 1,
        "title": "Terraria",
        "year": "2020",
        "price": "100.00",
        "createdAt": "2022-09-24T15:23:17.000Z",
        "updatedAt": "2022-09-24T15:36:47.000Z"
    }
]
```
##### Falha na autenticação! 401
Caso essa falha ocorra, isso significa que aconteceu alguma falha no processo de autenticação. Motivos : Token invalido/expirado.
##### Exemplo De Resposta:
```
{
    "err": "Token Invalido"
}
```

# ApiDeGames
Uma API de cadastro, edição e exclusão de games

## EndPoints:

### POST /game
Esse endpoint é responsavel por cadastrar um novo game no banco de dados.
#### Parametros :
title: titulo do jogo;
year: ano do jogo;
price: preço do jogo;
##### Exemplo:
```
{
    "title": "COD",
    "year":"2010",
    "price":100.20

}
```
##### Respostas OK! 200
Caso a resposta ocorra, será mostrado uma resposta : game criado.
##### Exemplo De Resposta: 
```
{
    "message": "game criado"
}
```
##### Falha na autenticação! 400
Caso essa falha ocorra, isso significa que aconteceu alguma falha no processo de criação. Motivos : valores nulos ou indefinidos.
##### Exemplo De Resposta:
```
{
    "error": "valores indefinidos"
}
```

### POST /auth
Esse endpoint é responsavel por fazer o processo de authenticação utilizando um login.
#### Parametros :
email: Email para autenticação
password: senha para autenticação
##### Respostas OK! 200
##### Exemplo: 
 ```
  {
    email: "teste",
    password: "password",
  }
 ```
Caso a resposta ocorra, será mostrado o token JWT para acessar endpoints protegidos
##### Exemplo De Resposta: 
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RlIiwicGFzc3dvcmQiOiJwYXNzd29yZCIsImlhdCI6MTY2NDI4MzYxMSwiZXhwIjoxNjY0NDEzMjExfQ.7ZpFA1RXkS72RV6WPj4Sa5yDT5wvVaefvvYGZK5MwLU"
}
```
##### Falha na autenticação! 400
Caso essa falha ocorra, isso significa que aconteceu alguma falha no processo de autenticação. Motivos : falha interna
##### Exemplo De Resposta:
```
{ 
    err: "falha interna"
}
```
# Em Desenvolvimento
