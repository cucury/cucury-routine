import { RoutineGroup } from '../entities/RoutineGroup'
import { IRoutineGroupRepository } from '../interfaces/IRoutineGroupRepository'
import { Prisma, PrismaClient } from '@prisma/client'
import { injectable } from 'inversify'

@injectable()
export class RoutineGroupRepository implements IRoutineGroupRepository {

  private prisma: Prisma
  constructor() {
    this.prisma = new PrismaClient()
  }

  async create(routineGroup: RoutineGroup): Promise<RoutineGroup> {
    return this.prisma.routine_group_by_user.create({ data: routineGroup })
  }

  async update(routineGroup: RoutineGroup): Promise<RoutineGroup> {
    return this.prisma.routine_group_by_user.update({ where: { id: routineGroup.id }, data: routineGroup })
  }

  async find(userHash: string): Promise<RoutineGroup[]> {
    return this.prisma.routine_group_by_user.findMany({ where: { user_hash: userHash } })
  }

  async findById(id: number, userHash: string): Promise<RoutineGroup> {
    return this.prisma.routine_group_by_user.findFirst({ where: { user_hash: userHash, id } })
  }
}