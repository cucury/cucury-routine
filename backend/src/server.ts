import 'reflect-metadata'
import express from 'express'
import diaryRouter from './routes/diaryRoutes'
import routineRouter from './routes/routineRoutes'
import cors from 'cors'

const PORT = process.env.PORT || 9000

const app = express()

app.use(cors())

app.use(express.json())

app.use(diaryRouter)
app.use(routineRouter)

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT} port`)
})