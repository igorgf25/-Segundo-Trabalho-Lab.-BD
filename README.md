# NodeJS API integrated with MongoDB(For Data Base Lab Lecture)

## Developed By
Igor Guilherme Feliciano

Pedro Henrique da Silva Fernandes

## Packages
```
npm i express
npm i mongodb
npm i dotenv
npm i cors
npm i express-validator
npm i nodemon --dev
```

## Inspiration

https://github.com/ricardoleme/mongodbApi#nodejs-api-integrated-with-mongodb-without-mongoose

## Routes

<br>

### *GET /livros/*
Returns all books in the database.

### *GET /livros/{id}*
Returns a book by id.

### *GET /livros/ano/{ano}*
Returns all the books published in the informed year and that is registered in the database.

### *GET /livros/autor/{autor}*
Returns all the books written by the informed author and that is registered in the database.

### *GET /livros/genero/{genero}*
Returns all the books of the informed genre and that is registered in the database.

### *GET /livros/titulo/{titulo}*
Returns all the books that the title contains the informed word(s) and that is registered in the database.

### *GET /livros/maxpreco/{preco}*
Returns all the books that the price is under the informed price and that is registered in the database.

### *POST /livros/*
Insert a new book to the data base. You must send a Json following this format:

    {
        "titulo": "",
        "descricao": "",
        "anoPublicacao": ,
        "autor": "",
        "preco": ,
        "genero": ""
    }

### *PUT /livros/*
Update an existing book using the _id property as parameter. You must send a Json following this format:

    {
        "_id": "",
        "titulo": "",
        "descricao": "",
        "anoPublicacao": ,
        "autor": "",
        "preco": ,
        "genero": ""
    }

### *DELETE /livros/{id}*
Delete an existing book using the _id property as parameter.