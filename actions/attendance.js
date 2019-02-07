import {SecureStore} from 'expo'

export const GET_ATTENDANCE = 'GET_ATTENDANCE'
export function getAttendance(today){
  //get attendance from storage 
  console.log('hitting get attendance action')
  return async dispatch => {
    const now = new Date().getTime()
    try{  
      let accounts = await SecureStore.getItemAsync('_ACCOUNTS')
      if(!accounts) accounts = []
      else accounts = JSON.parse(accounts)
      const attendance = await SecureStore.getItemAsync('_ATTENDANCE')
      let newAttendance
      if(!attendance) newAttendance = {}
      else newAttendance = {...JSON.parse(attendance)}
      console.log('this is newAttendance at GET_ATTENDANCE', newAttendance)
      if (!newAttendance[today]){
        const children = accounts.reduce((acc, acct) => {
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

export const CHANGE_CHECK_IN = 'CHANGE_CHECK_IN'
export function changeCheckIn(date, id){
  return async dispatch => {
    try{
      let attendance = await SecureStore.getItemAsync('_ATTENDANCE')
      attendance = JSON.parse(attendance)
      let newAttendance = attendance[date]
      console.log('this is newAttendance: ', newAttendance)
      if(!newAttendance[id].checkIn) newAttendance[id].checkIn = new Date().getTime()
      else newAttendance[id].checkIn = false
      
      attendance[date] = newAttendance
      console.log(attendance, console.log(typeof(attendance)))
      await SecureStore.setItemAsync('_ATTENDANCE', JSON.stringify(attendance))

      dispatch({
        type: CHANGE_CHECK_IN,
        payload: {newAttendance, date}
      })
    }catch(err){
      console.error(err)
    }
  }
}