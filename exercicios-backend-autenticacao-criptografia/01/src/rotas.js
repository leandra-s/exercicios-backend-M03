const express = require('express')
const usuarioLogado = require('./intermediarios/autenticacao')
const { login, cadastrarUsuario } = require('./controladores/usuarios')
const { cadastrarPokemon, atualizacaoApelido, listagemPokemons, detalharPokemon, excluirPokemon } = require('./controladores/pokemon')

const rota = express()

//* ROTAS PARA USUARIO

rota.post('/usuarios', cadastrarUsuario)
rota.post('/login', login)

//* ROTAS PARA OS POKEMONS

rota.use(usuarioLogado)

rota.post('/pokemon/cadastro', cadastrarPokemon)
rota.put('/pokemon/apelido/:id', atualizacaoApelido)
rota.get('/pokemon', listagemPokemons)
rota.get('/pokemon/:id', detalharPokemon)
rota.delete('/pokemon/deletar/:id', excluirPokemon)


module.exports = rota