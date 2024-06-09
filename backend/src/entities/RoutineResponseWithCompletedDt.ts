import { Routine } from './Routine'
import { RoutineResponse } from './RoutineResponse'

export class RoutineResponseWithCompletedDt extends RoutineResponse {
  isCompleted: boolean = false

  constructor(routine: Routine, isCompleted: boolean) {
    super(routine)
    this.isCompleted = isCompleted
  }

}
