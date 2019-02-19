import {SecureStore} from 'expo'
import getAsync from './getAsync'

export function get(){

}

export const post = async() => {
  const { newPayments, 
          newAccounts, 
          newAttendance, 
          newFinances, 
          newCaregivers, 
          newCentres, 
    newQuestions } = await getAsync(true, true, true, true, true, true, true)

  console.log(newPayments,
    newAccounts,
    newAttendance,
    newFinances,
    newCaregivers,
    newCentres,
    newQuestions)
  let apiName = 'Kidogo'
  let path = '/centres'
  let myInit = {
    body: {

    }, // replace this with attributes you need
    
  }
}
