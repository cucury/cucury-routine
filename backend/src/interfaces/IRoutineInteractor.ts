import { Routine } from '../entities/Routine'

export interface IRoutineInteractor {
    createRoutine({mood, content, time, user_hash}: Routine): Promise<Routine>
    updateRoutine({id, mood, content, time, user_hash}: Routine): Promise<Routine>
    getDiaries(userHash: string): Promise<Routine[]>
    getRoutineById(id: number, userHash: string): Promise<Routine>
}