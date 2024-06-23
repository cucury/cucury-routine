import express from 'express'
import { INTERFACE_TYPES } from '../utils/beanFactory'
import { authFilter, getV1Path } from './index'
import { Container } from 'inversify'
import { RoutineGroupController } from '../controllers/RoutineGroupController'
import { IRoutineGroupRepository } from '../interfaces/IRoutineGroupRepository'
import { RoutineGroupRepository } from '../repositories/RoutineGroupRepository'

const container = new Container()

container.bind<IRoutineGroupRepository>(INTERFACE_TYPES.RoutineGroupRepository).to(RoutineGroupRepository)

container.bind<RoutineGroupController>(INTERFACE_TYPES.RoutineGroupController).to(RoutineGroupController)

const router = express.Router()

const controller = container.get<RoutineGroupController>(INTERFACE_TYPES.RoutineGroupController)

const routinePath = getV1Path('routine-group')

router.get(routinePath, authFilter, controller.GetRoutineGroup)
router.get(getV1Path('routine-group/:id'), authFilter, controller.GetRoutineGroupById)

export default router