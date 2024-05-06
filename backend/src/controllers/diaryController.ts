import { Request, Response } from 'express'
import { IDiaryInteractor } from '../interfaces/IDiaryInteractor'
import { Diary } from '../entities/Diary'
import { getUserHash } from '../utils'

export default class DiaryController {

  private interactor: IDiaryInteractor

  constructor(interactor: IDiaryInteractor) {
    this.interactor = interactor
  }

  public CreateDiary = async (req: Request, res: Response) => {
    try {
      const { mood, content, time } = req.body
      const diary =
        await this.interactor.createDiary(
          new Diary({ mood, content, time, user_hash: getUserHash(req) }))
      res.status(201).json(diary)
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message })
      }
    }
  }

  public GetDiary = async (req: Request, res: Response) => {
    try {
      let diaries = []
      diaries = await this.interactor.getDiaries(getUserHash(req))
      diaries = diaries.map(diary => {
        return {...diary, user_hash: undefined}
      })
      if (diaries.length === 0) {
        return res.status(404).json({error: "No diary found"})
      }
      res.status(200).json(diaries)
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({error: error.message})
      }
    }
  }

  public GetDiaryById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const diary = await this.interactor.getDiaryById(Number(id), getUserHash(req))
      if (!diary) {
        return res.status(404).json({error: "No diary found"})
      }
      res.status(200).json(diary)
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({error: error.message})
      }
    }
  }

  public UpdateDiary = async (req: Request, res: Response) => {
    try {
      const { id, mood, content, time } = req.body
      if (!id) {
        return res.status(400).json({ error: "Diary ID is required" })
      }
      const diary = await this.interactor.getDiaryById(Number(id), getUserHash(req))
      if (!diary) {
        return res.status(404).json({ error: "Diary not found" })
      }
      const updatedDiary = await this.interactor.updateDiary(new Diary({ id, mood, content, time }), getUserHash(req))
      res.status(200).json(updatedDiary)
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({error: error.message})
      }
    }
  }

}
