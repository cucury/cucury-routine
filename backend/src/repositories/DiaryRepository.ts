import { Diary } from '../entities/Diary'
import { IDiaryRepository } from '../interfaces/IDiaryRepository'
import { Prisma, PrismaClient } from '@prisma/client'
import { injectable } from 'inversify'

@injectable()
export class DiaryRepository implements IDiaryRepository {

  private prisma: Prisma
  constructor() {
    this.prisma = new PrismaClient()
  }

  async create(diary: Diary): Promise<Diary> {
    return this.prisma.diary.create({ data: diary })
  }

  async update(diary: Diary): Promise<Diary> {
    return this.prisma.diary.update({ where: { id: diary.id }, data: diary })
  }

  async find(userHash: string): Promise<Diary[]> {
    return this.prisma.diary.findMany({ where: { user_hash: userHash } })
  }

  async findById(id: number, userHash: string): Promise<Diary> {
    return this.prisma.diary.findFirst({ where: { user_hash: userHash, id } })
  }
}