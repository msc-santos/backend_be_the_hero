module.exports = app => {

  const store = async (req, res) => {
    const id = app.utils.generateUniqueId.uniqueId()
    const { nome, email, whatsapp, city, uf } = req.body

    await app.db('ongs').insert({
      id,
      nome, 
      email, 
      whatsapp, 
      city, 
      uf 
    })

    res.json({ id })
  }

  const index = async (req, res) => {
    let ongs = await app.db('ongs').select('*')

    return res.json(ongs)
  }

  return {
    store,
    index
  }
}