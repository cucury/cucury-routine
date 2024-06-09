import { RoutineResponseWithCompletedDt } from './RoutineResponseWithCompletedDt'
import { RoutineGroupResponse } from './RoutineGroupResponse'

export class RoutineResponseByCompletedDt {
  routineGroup?: RoutineGroupResponse
  routines?: RoutineResponseWithCompletedDt[]

  constructor(
    routineGroup?: RoutineGroupResponse,
    routines?: RoutineResponseWithCompletedDt[]
  ) {
    // date
    // group1
    //   > routine
    //     > isComplete
    //   > routine
    //     > isComplete
    //   > routine
    //     > isComplete
    // group2
    //   > routine
    this.routineGroup = routineGroup
    this.routines = routines

  }

}
