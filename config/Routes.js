const { celebrate, Joi, Segments } = require('celebrate')

 module.exports = app => {
  
  app.route('/ongs')
    .get(app.controllers.OngsController.index)
    .post(celebrate({
      [Segments.BODY]: Joi.object().keys({
        nome: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required(),
        city: Joi.string().required(),
        uf: Joi.string().min(2)
      })
    }) ,app.controllers.OngsController.store)

  app.route('/incidents')
    .get(celebrate({
      [Segments.QUERY]: Joi.object().keys({
        page: Joi.number()
      })
    }) ,app.controllers.IncidentCrontroller.index)
    .post(celebrate({
      [Segments.BODY]: Joi.object().keys({
        titulo: Joi.string().required(),
        descricao: Joi.string().required(),
        value: Joi.string().required(),
      }),
      [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
      }).unknown()
    }) ,app.controllers.IncidentCrontroller.store)

  app.route('/incidents/:id')
    .delete(celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
      })
    }) ,app.controllers.IncidentCrontroller.del)

  app.route('/incidents/ong')
    .get(celebrate({
      [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
      }).unknown()
    }) ,app.controllers.IncidentCrontroller.show)

  app.route('/session')
    .post(celebrate({
      [Segments.BODY]: Joi.object().keys({
        id: Joi.string().required(),
      })
    }) ,app.controllers.SessionCrontroller.show)
    
}