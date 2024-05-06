import express from 'express'
import { authFilter, getV1Path } from './index'
import { DiaryRepository } from '../repositories/DiaryRepository'
import { Container } from 'inversify'
import { IDiaryRepository } from '../interfaces/IDiaryRepository'
import { IDiaryInteractor } from '../interfaces/IDiaryInteractor'
import { DiaryController } from '../controllers/diaryController'
import { DiaryInteractor } from '../interactors/DiaryInteractor'
import { INTERFACE_TYPES } from '../utils/beanFactory'

const container = new Container()

container.bind<IDiaryRepository>(INTERFACE_TYPES.DiaryRepository).to(DiaryRepository)
container.bind<IDiaryInteractor>(INTERFACE_TYPES.DiaryInteractor).to(DiaryInteractor)
container.bind<DiaryController>(INTERFACE_TYPES.DiaryController).to(DiaryController)

const router = express.Router()

const controller = container.get<DiaryController>(INTERFACE_TYPES.DiaryController)

const diaryPath = getV1Path('diary')

router.post(diaryPath, authFilter, controller.CreateDiary)
router.get(diaryPath, authFilter, controller.GetDiary)
router.get(getV1Path('diary/:id'), authFilter, controller.GetDiaryById)
router.put(diaryPath, authFilter, controller.UpdateDiary)

export default router