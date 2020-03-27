const crypto = require('crypto') 

module.exports = app => {
  const uniqueId = () => {
    return crypto.randomBytes(4).toString('HEX')
  }

  return {
    uniqueId
  }
}