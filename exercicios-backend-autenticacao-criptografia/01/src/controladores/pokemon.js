const pool = require('../conexao')

const cadastrarPokemon = async (req, res) => {
    const { nome, apelido, habilidades, imagem } = req.body
    const {id} = req.usuario

    try {

        const query = await pool.query('INSERT INTO pokemons (usuario_id, nome, habilidades, imagem, apelido) values ($1, $2, $3, $4, $5)', [id, nome, habilidades, imagem, apelido])

        res.status(201).json(query.rows[0])
    } catch (error) {
		console.log(error.message)
        return res.status(500).json({ mensagem: 'Erro interno do servidor' })
    }
}

const atualizacaoApelido = async (req, res) => {
    const {apelido} = req.body
    const { id } = req.params

    try {
        const query = await pool.query( 'select * from pokemons where id = $1 and usuario_id = $2', [id, req.usuario.id])
        
        if (query.rowCount === 0) {
            return res.status(404).json({ mensagem: 'Pokemon não existe' })
        }

        const queryAtualizacao = await pool.query('UPDATE pokemons SET apelido = $1 where id = $2', [apelido, id])
    
    
        return res.status(204).send()
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' })
    }
}

const listagemPokemons = async (req, res) => {
    try {
		const { rows: pokemons } = await pool.query(
			'select id, nome, habilidades, apelido, imagem from pokemons where usuario_id = $1',
			[req.usuario.id]
		)

		for (const pokemon of pokemons) {
			pokemon.habilidades = pokemon.habilidades.split(', ')
			pokemon.usuario = req.usuario.nome
		}

		return res.json(pokemons)
	} catch (error) {
		return res.status(500).json({ mensagem: 'Erro interno do servidor' })
	}
}

const detalharPokemon = async (req, res) => {
	const { id } = req.params

	try {
		const { rows, rowCount } = await pool.query(
			'select  id, nome, habilidades, apelido, imagem from pokemons where id = $1 and usuario_id = $2',
			[id, req.usuario.id]
		)

		if (rowCount === 0) {
			return res.status(404).json({ mensagem: 'Pokemon não existe' })
		}

		const pokemon = rows[0]

		pokemon.habilidades = pokemon.habilidades.split(', ')
		pokemon.usuario = req.usuario.nome

		return res.json(pokemon)
	} catch (error) {
		return res.status(500).json({ mensagem: 'Erro interno do servidor' })
	}
}

const excluirPokemon = async (req, res) => {
	const { id } = req.params

	try {
		const { rows, rowCount } = await pool.query(
			'select  id, nome, habilidades, apelido, imagem from pokemons where id = $1 and usuario_id = $2',
			[id, req.usuario.id]
		)

		if (rowCount === 0) {
			return res.status(404).json({ mensagem: 'Pokemon não existe' })
		}

		await pool.query('delete from pokemons where id = $1', [id])

		return res.status(204).send()
	} catch (error) {
		return res.status(500).json({ mensagem: 'Erro interno do servidor' })
	}
}

module.exports = {
	cadastrarPokemon,
	atualizacaoApelido,
	listagemPokemons,
	detalharPokemon,
	excluirPokemon,
}