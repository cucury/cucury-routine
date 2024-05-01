import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import { getUserHash } from './../utils'

const prisma = new PrismaClient()

export const CreateDiary = async (req: Request, res: Response) => {
  try {
    const { mood, content, time } = req.body
    const user_hash: string = getUserHash(req)
    const args = { data: { user_hash, mood, content, time } }
    const diary = await prisma.diary.create(args)
    res.status(201).json(diary)
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message })
    }
  }
}

export const GetDiary = async (req: Request, res: Response) => {
  try {
    const user_hash: string = getUserHash(req)
    const diaries = await prisma.diary.findMany({ where: { user_hash } })
    res.status(200).json(
      diaries.map(diary => {
        return {...diary, user_hash: undefined}
      }))
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({error: error.message})
    }
  }
}

export const GetDiaryById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id)
    const user_hash: string = getUserHash(req)
    const diaries = await prisma.diary.findMany({ where: { user_hash, id } })
    res.status(200).json(
      diaries.map(diary => {
        return {...diary, user_hash: undefined}
      }))
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({error: error.message})
    }
  }
}

export const UpdateDiary = async (req: Request, res: Response) => {
  try {
    const { id, mood, content, time } = req.body
    if (!id) {
      return res.status(400).json({ error: "Diary ID is required" })
    }
    const diary = await prisma.diary.findUnique({ where: { id } })
    if (!diary) {
      return res.status(404).json({ error: "Diary not found" })
    }
    diary.mood = mood || diary.mood
    diary.content = content || diary.content
    diary.time = time || diary.time
    await prisma.diary.update({ where: { id }, data: diary })
    res.status(200).json(diary)
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({error: error.message})
    }
  }
}