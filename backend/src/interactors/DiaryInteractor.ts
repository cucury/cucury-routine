import { IDiaryInteractor } from '../interfaces/IDiaryInteractor'
import { Diary } from '../entities/Diary'
import { IDiaryRepository } from '../interfaces/IDiaryRepository'
import { inject, injectable } from 'inversify'
import { INTERFACE_TYPES } from '../utils/beanFactory'

@injectable()
export class DiaryInteractor implements IDiaryInteractor {
  private repository: IDiaryRepository

  constructor(
    @inject(INTERFACE_TYPES.DiaryRepository) repository: IDiaryRepository
  ) {
    this.repository = repository
  }

  async createDiary({mood, content, time, user_hash}: Diary): Promise<Diary> {
    return this.repository.create(new Diary({ mood, content, time, user_hash }))
  }

  async updateDiary({id, mood, content, time, user_hash}: Diary): Promise<Diary> {
    const diary: Diary = await this.getDiaryById(Number(id), user_hash)
    diary.mood = mood || diary.mood
    diary.content = content || diary.content
    diary.time = time || diary.time
    return this.repository.update(diary)
  }

  async getDiaries(userHash: string): Promise<Diary[]> {
    return this.repository.find(userHash)
  }

  async getDiaryById(id: number, userHash: string): Promise<Diary> {
    return this.repository.findById(id, userHash)
  }
}
