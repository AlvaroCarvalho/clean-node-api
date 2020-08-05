import request from 'supertest'
import app from '../config/app'

describe('Body Parser Test', () => {
  test('Should parse body as json', async () => {
    app.post('/body_parser_test', (req, res) => {
      res.send(req.body)
    })

    await request(app)
      .post('/body_parser_test')
      .send({ name: 'Alvaro' })
      .expect({ name: 'Alvaro' })
  })
})
