import {GET_ATTENDANCE, CHANGE_CHECK_IN} from '../actions/attendance'

const INITIAL_STATE = {
  '06-02-2019':{
    'a50496b9-15c5-4542-bbdb-221b85ac8c4e': {
      checkIn: false,
      checkOut: false,
      f_name: null,
      l_name: null,
      img_uri:null
    }
  }
}

const attendance = (state = INITIAL_STATE, {type, payload}) => {
  let newState
  switch(type){
    case GET_ATTENDANCE:
      return payload
    // case CHANGE_CHECK_IN:
    //   newState = {...state}
    //   newState[payload.date] = payload.newAttedance
    //   return newState
    default: 
      return state
  }
}


export default attendance
