import express from 'express'
import router from './routes'
import cors from 'cors'

const PORT = process.env.PORT || 9000

const app = express()

app.use(cors())

app.use(express.json())

app.use(router)

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT} port`)
})