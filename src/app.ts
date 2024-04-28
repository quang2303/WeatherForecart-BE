import express from 'express'
import dotenv from 'dotenv'
import routers from './routes/index'
import cors from 'cors'
import conn from './config/mongodbConnect'

dotenv.config()
const app = express()

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true
  })
)
conn()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
  console.log(`${req.method}:${req.url}`)
  next()
})

app.use('/api/v1', routers)

export default app
