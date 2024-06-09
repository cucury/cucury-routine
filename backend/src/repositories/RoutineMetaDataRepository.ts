import { RoutineMetaData } from '../entities/RoutineMetaData'
import { IRoutineMetaDataRepository } from '../interfaces/IRoutineMetaDataRepository'
import { Prisma, PrismaClient } from '@prisma/client'
import { injectable } from 'inversify'

@injectable()
export class RoutineMetaDataRepository implements IRoutineMetaDataRepository {

  private prisma: Prisma
  constructor() {
    this.prisma = new PrismaClient()
  }

  async create(routineMetaData: RoutineMetaData): Promise<RoutineMetaData> {
    return this.prisma.routine_items_meta_data.create({ data: routineMetaData })
  }

  async update(routineMetaData: RoutineMetaData): Promise<RoutineMetaData> {
    return this.prisma.routine_items_meta_data.update({ where: { id: routineMetaData.id } })
  }

  async delete(routineMetaData: RoutineMetaData): Promise<RoutineMetaData> {
    return this.prisma.routine_items_meta_data.delete({ where: { id: routineMetaData.id } })
  }

  async find(userHash: string): Promise<RoutineMetaData[]> {
    return this.prisma.routine_items_meta_data.findMany({
      select: {
        completed_dt: true,
        routine_group_by_user: {
          user_hash: true
        }
      },
      where: {
        routine_items_by_user: {
          user_hash: userHash
        }
      }
    })
  }

  async findById(routineId: number, completedDt: number, userHash: string): Promise<RoutineMetaData> {
    return this.prisma.routine_items_meta_data.findFirst({
      select: {
        completed_dt: true,
        routine_group_by_user: {
          user_hash: true
        }
      },
      where: {
        routine_group_by_user_id: routineId,
        completed_dt: completedDt,
        routine_items_by_user: {
          user_hash: userHash
        }
      }
    })
  }

  findByCompletedDt(completedDt: string, userHash: string): Promise<RoutineMetaData[]> {
    return this.prisma.routine_items_meta_data.findMany({
      select: {
        id: true,
        completed_dt: true,
        routine_items_user_work_id: true
      },
      where: {
        completed_dt: completedDt,
        routine_items_by_user: {
          user_hash: userHash
        }
      }
    })
  }
}