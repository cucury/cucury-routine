import { Diary } from '../entities/Diary'

export interface IDiaryInteractor {
    createDiary({mood, content, time, user_hash}: Diary): Promise<Diary>
    updateDiary({id, mood, content, time, user_hash}: Diary): Promise<Diary>
    getDiaries(userHash: string): Promise<Diary[]>
    getDiaryById(id: number, userHash: string): Promise<Diary>
}