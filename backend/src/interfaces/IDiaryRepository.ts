import { Diary } from '../entities/Diary'

export interface IDiaryRepository {
  create(diary: Diary): Promise<Diary>
  update(diary: Diary): Promise<Diary>
  find(userHash: string): Promise<Diary[]>
  findById(id: number, userHash: string): Promise<Diary>
}