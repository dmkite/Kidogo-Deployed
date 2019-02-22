import {GET_ATTENDANCE, CHANGE_CHECK_IN_OUT} from '../actions/attendance'

const INITIAL_STATE = {
}

const attendance = (state = INITIAL_STATE, {type, payload}) => {
  let newState
  switch(type){
    case GET_ATTENDANCE:
      return payload
    case CHANGE_CHECK_IN_OUT:
      newState = {...state}
      // newState[payload.date] = payload.newAttendance
      // console.log(newState[payload.date])

      
      // return newState
      return payload.newAttendance
    default: 
      return state
  }
}


export default attendance
