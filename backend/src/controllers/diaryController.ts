import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import { getUserHash } from "../utils"

const prisma = new PrismaClient()

export const CreateDiary = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body
    const user_hash: string = getUserHash(req)
    const args = { data: { user_hash, title, content } }
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

export const UpdateDiary = async (req: Request, res: Response) => {
  try {
    const { id, title, content } = req.body
    if (!id) {
      return res.status(400).json({ error: "Diary ID is required" })
    }
    const diary = await prisma.diary.findUnique({ where: { id } })
    if (!diary) {
      return res.status(404).json({ error: "Diary not found" })
    }
    diary.title = title || diary.title
    diary.content = content || diary.content
    await prisma.diary.update({ where: { id }, data: diary })
    res.status(200).json(diary)
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({error: error.message})
    }
  }
}