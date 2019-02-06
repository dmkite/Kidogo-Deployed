import {AsyncStorage} from 'react-native'

export const GET_ATTENDANCE = 'GET_ATTENDANCE'
export function getAttendance(){
  //get attendance from storage 
  return async dispatch => {
    try{  
      const attendance = await AsyncStorage.getItem('_ATTENDANCE')
      let newAttendance
      if(!attendance) newAttendance = {}
      else newAttendance = {...attendance}
    }catch(err){

    }
  }

  //if there is no entry for today, create one with everyone being present
}