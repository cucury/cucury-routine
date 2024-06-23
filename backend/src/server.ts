import 'reflect-metadata'
import express from 'express'
import dDayRoutes from './routes/dDayRoutes'
import diaryRouter from './routes/diaryRoutes'
import routineRouter from './routes/routineRoutes'
import routineGroupRouter from './routes/routineGroupRoutes'
import routineMetaDataRouter from './routes/routineMetaDataRoutes'
import cors from 'cors'

const PORT = process.env.PORT || 9000

const app = express()

app.use(cors())

app.use(express.json())

app.use(dDayRoutes)
app.use(diaryRouter)
app.use(routineRouter)
app.use(routineGroupRouter)
app.use(routineMetaDataRouter)

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT} port`)
})