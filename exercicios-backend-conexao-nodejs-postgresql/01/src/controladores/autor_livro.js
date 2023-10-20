const pool = require('../conexao')


const cadastrarAutor = async (req, res) => {
    const { nome, idade } = req.body

    if (!nome) {
        return res.status(400).json({ "mensagem": "Campos nome obrigatório." })
    }

    if (!idade) {
        return res.status(400).json({ "mensagem": "Campos idade obrigatório." })
    }

    try {
        const query = await pool.query('insert into autores (nome, idade) values ($1, $2);', [nome, idade])

        const queryResultado = await pool.query('select * from autores where nome = $1;', [nome])

        console.log(queryResultado)

        return res.status(201).json(queryResultado.rows[0])

    } catch (error) {
        console.log(error.message)
    }
}

const obterAutor = async (req, res) => {
    const { id } = req.params

    try {
        const query = await pool.query('select * from autores where id = $1;', [id])

        if (query.rows.length < 1) {
            return res.status(404).json({ "mensagem": "Autor não encontrado" })
        }

        const query2 = await pool.query('select * from autores join livros on autores.id = livros.autor_id where autores.id = $1;', [id])

        if (query2.rows.length < 1) {
            return res.status(404).json({ "mensagem": "livro não encontrado" })
        }

        const resultado = {//CONSEGUI
            ...query.rows[0],
            livros: query2.rows
        }

        return res.status(200).json(resultado)

    } catch (error) {
        console.log(error.message)
    }
}

const cadastrarUmLivro = async (req, res) => {
    const { nome, genero, editora, data_publicacao } = req.body
    const { id } = req.params

    if (!nome) {
        return res.status(400).json({ "mensagem": "Campos nome obrigatório." })
    }

    if (!genero) {
        return res.status(400).json({ "mensagem": "Campos gênero obrigatório." })
    }

    if (!editora) {
        return res.status(400).json({ "mensagem": "Campos editora obrigatório." })
    }

    if (!data_publicacao) {
        return res.status(400).json({ "mensagem": "Campos data de publicação obrigatório." })
    }

    try {
        const query = await pool.query('insert into livros (nome, genero, editora, data_publicacao, autor_id) values ($1, $2, $3, $4, $5);', [nome, genero, editora, data_publicacao, id])

        const queryResultado = await pool.query('select * from livros where nome = $1;', [nome])

        return res.status(201).json(queryResultado.rows[0])

    } catch (error) {
        console.log(error.message)
    }
}

const listarLivros = async (req, res) => {
    try {

        const query = await pool.query('select * from livros;')


        return res.status(200).json(query.rows)

    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {
    cadastrarAutor,
    obterAutor,
    cadastrarUmLivro,
    listarLivros
}