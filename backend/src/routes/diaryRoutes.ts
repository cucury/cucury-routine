import express from 'express'
import DiaryController from '../controllers/DiaryController'
import { authFilter, getV1Path } from './index'
import { DiaryRepository } from '../repositories/DiaryRepository'
import { DiaryInteractor } from '../interactors/DiaryInteractor'

const repository = new DiaryRepository()
const interactor = new DiaryInteractor(repository)
const controller = new DiaryController(interactor)

const router = express.Router()

const diaryPath = getV1Path('diary')

router.post(diaryPath, authFilter, controller.CreateDiary)
router.get(diaryPath, authFilter, controller.GetDiary)
router.get(getV1Path('diary/:id'), authFilter, controller.GetDiaryById)
router.put(diaryPath, authFilter, controller.UpdateDiary)

export default router