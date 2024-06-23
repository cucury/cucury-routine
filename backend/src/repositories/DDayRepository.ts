import { IDDayRepository } from '../interfaces/IDDayRepository'
import { Prisma, PrismaClient } from '@prisma/client'
import { injectable } from 'inversify'
import { DDay } from '../entities/DDay'

@injectable()
export class DDayRepository implements IDDayRepository {

  private prisma: Prisma
  constructor() {
    this.prisma = new PrismaClient()
  }

  async create(dDay: DDay): Promise<DDay> {
    return this.prisma.d_day_by_user.create({ data: dDay })
  }

  async delete(dDay: DDay): Promise<DDay> {
    return this.prisma.d_day_by_user.delete({ where: { id: dDay.id } })
  }

  async find(userHash: string): Promise<DDay[]> {
    return this.prisma.d_day_by_user.findMany({
      where: {
        user_hash: userHash
      }
    })
  }

  async findById(id: number, userHash: string): Promise<DDay> {
    return this.prisma.d_day_by_user.findFirst({
      where: {
        routine_group_by_user_id: id,
        routine_items_by_user: {
          user_hash: userHash
        }
      }
    })
  }
}