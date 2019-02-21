import {SecureStore} from 'expo'
import getAsync from '../utilities/getAsync'
export const GET_ATTENDANCE = 'GET_ATTENDANCE'

export function getAttendance(today){
  return async dispatch => {
    const now = new Date().getTime()
    try{  
      let { newAccounts, newAttendance } = await getAsync(false, true, true)
      if (!newAttendance[today]){
        const children = newAccounts.reduce((acc, acct) => {
          acct.children.forEach(child => {
            child.acctId = acct.id
            child.checkIn = now
            child.checkOut = false
            delete child.notes
            delete child.gender
            delete child.birthdate
          })
          acc = acc.concat(acct.children)
          return acc
        }, [])
        
        newAttendance[today] = children.reduce((acc, child) => {
          acc[child.id] = {...child}
          return acc
        }, {})
      }

      await SecureStore.setItemAsync('_ATTENDANCE', JSON.stringify(newAttendance))
      
      dispatch({
        type: GET_ATTENDANCE,
        payload: newAttendance
      })
    }catch(err){
      console.error(err)
    }
  }

}

export const CHANGE_CHECK_IN_OUT = 'CHANGE_CHECK_IN_OUT'
export function changeCheckInOut(date, id, inOrOut){
  return async dispatch => {
    try{
      let { newAccounts, newAttendance } = await getAsync(false, false, attendance)
      newAttendance = newAttendance[date]
      if(!newAttendance[id][inOrOut]) newAttendance[id][inOrOut] = new Date().getTime()
      else newAttendance[id][inOrOut] = false
      attendance[date] = newAttendance
      await SecureStore.setItemAsync('_ATTENDANCE', JSON.stringify(attendance))

      dispatch({
        type: CHANGE_CHECK_IN_OUT,
        payload: {newAttendance, date}
      })
    }catch(err){
      console.error(err)
    }
  }
}