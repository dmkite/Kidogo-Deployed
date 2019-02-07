import {AsyncStorage} from 'react-native'

export const GET_ATTENDANCE = 'GET_ATTENDANCE'
export function getAttendance(today){
  //get attendance from storage 
  console.log('hitting get attendance action')
  return async dispatch => {
    const now = new Date().getTime()
    try{  
      let accounts = await AsyncStorage.getItem('_ACCOUNTS')
      if(!accounts) accounts = []
      const attendance = await AsyncStorage.getItem('_ATTENDANCE')
      let newAttendance
      if(!attendance) newAttendance = {}
      else newAttendance = {...JSON.parse(attendance)}
      
      if (!newAttendance[today]){
        const children = JSON.parse(accounts).reduce((acc, acct) => {
          acct.children.forEach(child => {
            child.acctId = acct.id
            child.checkIn = now
            child.checkOut = false
            delete child.notes
            delete child.gender
            delete child.birthday
          })
          acc = acc.concat(acct.children)
          return acc
        }, [])
        
        newAttendance[today] = children.reduce((acc, child) => {
          acc[child.id] = {...child}
          return acc
        }, {})
      }

      await AsyncStorage.setItem('_ATTENDANCE', JSON.stringify(newAttendance))
      
      dispatch({
        type: GET_ATTENDANCE,
        payload: newAttendance
      })
    }catch(err){
      console.error(err)
    }
  }

}

export const CHANGE_CHECK_IN = 'CHANGE_CHECK_IN'
export function changeCheckIn(date, id){
  return async dispatch => {
    try{
      const attendance = await AsyncStorage.getItem('_ATTENDANCE')
      let newAttendance = JSON.parse(attendance)[date]
      if(!newAttendance[id].checkIn) newAttendance[id].checkIn = new Date().getTime()
      else newAttendance[id].checkIn = false

      attendance[date] = newAttendance
      attendance = JSON.stringify(attendance)
      await AsyncStorage.setItem('_ATTENDANCE', JSON.stringify(attendance))

      dispatch({
        type: CHANGE_CHECK_IN,
        payload: {newAttendance, date}
      })
    }catch(err){
      console.error(err)
    }
  }
}