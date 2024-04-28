import { Router } from 'express'
import { weatherInfo } from '~/controllers/weather'
import { register, verify } from '~/controllers/subscribe'

const routers = Router()

routers.get('/', (req, res) => {
  res.json({
    message: 'HELLO WORLD - 👋🌎🌏🌍'
  })
})

routers.get('/weather', weatherInfo)

routers.post('/register', register)

routers.get('/verify/:email/:token', verify)

export default routers
