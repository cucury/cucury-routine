import express from 'express'
import { authFilter, getV1Path } from './index'
import { RoutineRepository } from '../repositories/RoutineRepository'
import { Container } from 'inversify'
import { IRoutineRepository } from '../interfaces/IRoutineRepository'
import { IRoutineInteractor } from '../interfaces/IRoutineInteractor'
import { RoutineController } from '../controllers/routineController'
import { RoutineInteractor } from '../interactors/routine/RoutineInteractor'
import { INTERFACE_TYPES } from '../utils/beanFactory'
import { IRoutineGroupRepository } from '../interfaces/IRoutineGroupRepository'
import { RoutineGroupRepository } from '../repositories/RoutineGroupRepository'
import { RoutineMetaDataRepository } from '../repositories/RoutineMetaDataRepository'
import { IRoutineMetaDataRepository } from '../interfaces/IRoutineMetaDataRepository'

const container = new Container()

container.bind<IRoutineRepository>(INTERFACE_TYPES.RoutineRepository).to(RoutineRepository)
container.bind<IRoutineInteractor>(INTERFACE_TYPES.RoutineInteractor).to(RoutineInteractor)
container.bind<RoutineController>(INTERFACE_TYPES.RoutineController).to(RoutineController)

container.bind<IRoutineGroupRepository>(INTERFACE_TYPES.RoutineGroupRepository).to(RoutineGroupRepository)

container.bind<IRoutineMetaDataRepository>(INTERFACE_TYPES.RoutineMetaDataRepository).to(RoutineMetaDataRepository)

const router = express.Router()

const controller = container.get<RoutineController>(INTERFACE_TYPES.RoutineController)

const routinePath = getV1Path('routine')

router.post(routinePath, authFilter, controller.CreateRoutine)
router.get(routinePath, authFilter, controller.GetRoutine)
router.get(getV1Path('routine/completed-dt/:completedDt'), authFilter, controller.GetRoutineByCompletedDt)
router.get(getV1Path('routine/:id'), authFilter, controller.GetRoutineById)
router.put(routinePath, authFilter, controller.UpdateRoutine)

export default router