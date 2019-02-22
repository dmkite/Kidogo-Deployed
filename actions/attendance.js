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

      let signedIn = await SecureStore.getItemAsync('_SIGNEDIN')
      const { user: { id } } = JSON.parse(signedIn)
      
      await SecureStore.setItemAsync(`_ATTENDANCE_${id}`, JSON.stringify(newAttendance))
      
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
export function changeCheckInOut(date, cid, inOrOut){
  return async dispatch => {
    try{
      let { newAttendance } = await getAsync(false, false, true)
      // console.log(newAttendance)
      if (newAttendance[date][cid][inOrOut]) newAttendance[date][cid][inOrOut] = false
      else newAttendance[date][cid][inOrOut] = new Date().getTime()
      // let specificDay = newAttendance[date]
      // console.log(specificDay)
      // console.log('--------------------')
      // console.log(specificDay[cid])
      // console.log('--------------------')
      // console.log(specificDay[cid][inOrOut])
      // console.log('--------------------')
      // // if(!specificDay) specificDay = {}
      // // if(!specificDay[cid]) specificDay[cid] = {}
      // // if(!specificDay[cid][inOrOut]) specificDay[cid][inOrOut] = new Date().getTime()
      // // else specificDay[cid][inOrOut] = false
      // if (!specificDay[cid][inOrOut]) specificDay[cid][inOrOut] = new Date().getTime()
      // else specificDay[cid][inOrOut] = false
      // console.log(specificDay)
      // newAttendance[date] = specificDay
      let signedIn = await SecureStore.getItemAsync('_SIGNEDIN')
      const { user: { id } } = JSON.parse(signedIn)
      
      await SecureStore.setItemAsync(`_ATTENDANCE_${id}`, JSON.stringify(newAttendance))

      dispatch({
        type: CHANGE_CHECK_IN_OUT,
        payload: {newAttendance, date}
      })
    }catch(err){
      console.error(err)
    }
  }
}