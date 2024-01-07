import express, { type Application, type Request, type Response } from 'express'
import 'dotenv/config'
import cors from 'cors'
import router from './routes/routes'
import connectToMongo from './config/config'

const app: Application = express()
const PORT: number = 5000
const corsOptions = {
  origin: 'https://jadwalplus-client.vercel.app',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 204
}

void connectToMongo()
app.use(express.json())
app.use(cors(corsOptions))

app.get('/', (req: Request, res: Response): void => {
  res.json({
    status: 'success',
    message: 'welcome to my api'
  })
})

app.use('/', router)

app.listen(PORT, (): void => {
  console.log(`Server running on port:${PORT}`)
})
