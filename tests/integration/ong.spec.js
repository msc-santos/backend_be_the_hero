const request = require('supertest')
const app = require('../../src/app')

describe('ONG', () => {
  // executa alguma coisa antes dos testes
  beforeEach( async () => {
    await app.db.migrate.rollback()
    await app.db.migrate.latest()
  })

  // executa alguma coisa depois que termina de executar todos os testes
  // afterAll(async () => {
  //   await app.db.destroy()
  // })

  it('Criadno uma nova ONG', async () => {
    const response = await request(app).post('/ongs').send({
      nome: "ONG de teste 20",
      email: "ong@teste10.com",
      whatsapp: "1234567891",
      city: "Natal",
      uf: "RN"
    })

    expect(response.body).toHaveProperty('id')
    expect(response.body.id).toHaveLength(8)
  })
})
