import express from 'express'
import { INTERFACE_TYPES } from '../utils/beanFactory'
import { authFilter, getV1Path } from './index'
import { Container } from 'inversify'
import { DDayRepository } from '../repositories/DDayRepository'
import { IDDayRepository } from '../interfaces/IDDayRepository'
import { DDayController } from '../controllers/DDayController'

const container = new Container()

container.bind<IDDayRepository>(INTERFACE_TYPES.DDayRepository).to(DDayRepository)

container.bind<DDayController>(INTERFACE_TYPES.DDayController).to(DDayController)

const router = express.Router()

const controller = container.get<DDayController>(INTERFACE_TYPES.DDayController)

router.get(getV1Path('d-day'), authFilter, controller.GetDDay)
router.post(getV1Path('d-day'), authFilter, controller.PostDDay)

export default router