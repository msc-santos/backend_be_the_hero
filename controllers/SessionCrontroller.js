module.exports = app => {

  const show = async (req, res) => {
    let { id } = req.body

    let ong = await app.db('ongs')
      .where('id', id)
      .select('nome')
      .first()

    if (!ong) return res.status(404).json({ message: "ONG não encontrada" })

    return res.status(200).json(ong)
  }

  return {
    show
  }
}