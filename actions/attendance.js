import {AsyncStorage} from 'react-native'

export const GET_ATTENDANCE = 'GET_ATTENDANCE'
export function getAttendance(){
  //get attendance from storage 
  const today = `${new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}`
  return async dispatch => {
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
            child.isPresent = true
            delete child.notes
            delete child.gender
            delete child.birthday
          })
          acc = acc.concat(acct.children)
          return acc
        }, acc)
        
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
      const attendance = await AsyncStorage.getItem('_ACCOUNTS')
      const newAttendance = JSON.parse(attendance)[date]
      if(newAttendance[id].checkIn) newAttendance[id].checkIn = new Date().getTime()
      else newAttendance[id].checkIn = false

      attendance[date] = newAttendance
      await AsyncStorage.setItem('_ACCOUNTS', JSON.stringify(attendance))
      
      dispatch({
        type: CHANGE_CHECK_IN,
        payload: {newAttendance, date}
      })
    }catch(err){
      console.error(err)
    }
  }
}