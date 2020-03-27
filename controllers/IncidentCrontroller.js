module.exports = app => {

  const store = async (req, res) => {
    let { titulo, descricao, value } = req.body
    let ong_id = req.headers.authorization

    await app.db('incidents').insert({
      titulo, descricao, value, ong_id
    })

    return res.json({ "message": "criado com sucesso" })
  }

  const index = async (req, res) => {
    let { page = 1 } = req.query

    let [ count ] = await app.db('incidents').count()

    let incidents = await app.db('incidents')
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        'incidents.*', 
        'ongs.nome', 
        'ongs.email', 
        'ongs.whatsapp', 
        'ongs.city', 
        'ongs.uf'])

    res.header('X-total-count', count['count'])
    return res.json(incidents)
  }

  const show = async (req, res) => {
    let ong_id = req.headers.authorization
    
    let incidents = await app.db('incidents')
      .where('ong_id', ong_id)
      .select('*')

    return res.json(incidents)
  }

  const del = async (req, res) => {
    let { id } = req.params
    let ong_id  = req.headers.authorization

    let incidents = await app.db('incidents')
      .where('id', id)
      .select('ong_id')
      .first()

    if (incidents.ong_id != ong_id) {
      return res.status(401).json({ message: "Sem autorização para excluir" })
    }

    await app.db('incidents')
      .where('id', id)
      .delete()

    return res.status(204).send()
  }

  return {
    store,
    index,
    show,
    del
  }
}