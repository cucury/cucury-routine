import { IRoutineRepository } from '../interfaces/IRoutineRepository'
import { Prisma, PrismaClient } from '@prisma/client'
import { injectable } from 'inversify'
import { Routine } from '../entities/Routine'

@injectable()
export class RoutineRepository implements IRoutineRepository {

  private prisma: Prisma
  constructor() {
    this.prisma = new PrismaClient()
  }

  async create(routine: Routine): Promise<Routine> {
    return this.prisma.routine_items_by_user.create({ data: routine, include: { routine_group_by_user: true } })
  }

  async update(routine: Routine): Promise<Routine> {
    return this.prisma.routine_items_by_user.update({ where: { id: routine.id }, data: routine, include: { routine_group_by_user: true } })
  }

  async find(userHash: string): Promise<Routine[]> {
    return this.prisma.routine_items_by_user.findMany({ where: { user_hash: userHash }, include: { routine_group_by_user: true, routine_items_meta_data: true } })
  }

  async findById(id: number, userHash: string): Promise<Routine> {
    return this.prisma.routine_items_by_user.findFirst({ where: { user_hash: userHash, id }, include: { routine_group_by_user: true, routine_items_meta_data: true } })
  }
}