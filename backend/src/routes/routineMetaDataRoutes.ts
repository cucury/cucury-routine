import express from 'express'
import { INTERFACE_TYPES } from '../utils/beanFactory'
import { authFilter, getV1Path } from './index'
import { Container } from 'inversify'
import { RoutineMetaDataRepository } from '../repositories/RoutineMetaDataRepository'
import { IRoutineMetaDataRepository } from '../interfaces/IRoutineMetaDataRepository'
import { RoutineMetaDataController } from '../controllers/routineMetaDataController'

const container = new Container()

container.bind<IRoutineMetaDataRepository>(INTERFACE_TYPES.RoutineMetaDataRepository).to(RoutineMetaDataRepository)

container.bind<RoutineMetaDataController>(INTERFACE_TYPES.RoutineMetaDataController).to(RoutineMetaDataController)

const router = express.Router()

const controller = container.get<RoutineMetaDataController>(INTERFACE_TYPES.RoutineMetaDataController)

router.post(getV1Path('routine-meta-data'), authFilter, controller.PostRoutineMetaData)
router.delete(getV1Path('routine-meta-data/routine-id/:routineId/completed-dt/:completedDt'), authFilter, controller.DeleteRoutineMetaData)

export default router