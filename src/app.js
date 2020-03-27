const express = require('express')
const consign = require('consign')
const db = require('../config/db')

const app = express()
app.db = db

consign()
  .then('./config/Middlewares.js')
  .then('./utils')
  .then('./controllers')
  .then('./config/Routes.js')
  .then('./validators')
  .into(app)



module.exports = app