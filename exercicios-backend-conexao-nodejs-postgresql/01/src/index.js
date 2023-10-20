const express = require('express')
const { cadastrarAutor, obterAutor, cadastrarUmLivro, listarLivros } = require('./controladores/autor_livro')

const app = express()

app.use(express.json())

//* Rotas autor

app.post('/autor', cadastrarAutor)
app.get('/autor/:id', obterAutor)

//* Rotas livros

app.post('/autor/:id/livro', cadastrarUmLivro)
app.get('/livro', listarLivros)


app.listen(3333)