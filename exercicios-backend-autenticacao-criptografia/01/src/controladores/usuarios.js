const pool = require('../conexao')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const senhaJWT = require('../senhaJWT')

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body

    if(!nome, !email, !senha){
        return res.status(400).json({ "mensagem": "Necessário preencher todos os campos"})
    }

    try{

        const emailExistente = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email])

        if(emailExistente.rowCount > 0){//para nao fazer uma conta com dois email iguais
            return res.status(400).json({ mensagem: 'Email já existe' })
        }

        const senhaCriptografada = await bcrypt.hash(senha, 8)

        const query = await pool.query('INSERT INTO usuarios (nome, email, senha) values ($1, $2, $3)', [nome, email, senhaCriptografada])

        const {senha, ...usuario} = rows[0]

        return res.status(201).json(usuario)

    }catch(error){
        console.log(error.message)
        return res.status(500).json({ mensagem: 'Erro interno do servidor' })
    }
}

const login = async (req, res) => {
    const { email, senha } = req.body

    try {
        const {rows, rowCount} = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email])

        if(rowCount === 0){
            return res.status(404).json({ "mensagem": "Email ou senha inválida"})
        }

        const senhaValida = await bcrypt.compare(senha, rows[0].senha)

        if(!senhaValida){
            return res.status(404).json({ "mensagem": "Email ou senha invalida"})
        }


        const token = jwt.sign({id: rows[0].id}, senhaJWT, {expiresIn: '8h'})

        const { senha: _, ...usuarioLogado} = rows[0]

        return res.status(201).json({usuario: usuarioLogado, token})

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ mensagem: 'Erro interno do servidor' })
    }
}

module.exports = {
    cadastrarUsuario,
    login
}