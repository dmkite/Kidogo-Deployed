import {SecureStore} from 'expo'
import getAsync from './getAsync'
import Amplify, { API } from 'aws-amplify';
import awsmobile from '../aws-exports';
Amplify.configure(awsmobile);

export const get = async (addMessage, changeLoading) => {
  let userInfo = await SecureStore.getItemAsync('_SIGNEDIN')
  
  const { user:{centre_id} } = JSON.parse(userInfo)
  const apiName = 'KidogoApi'
  const path = `/centres/${centre_id}`

  // const apiResponse = await 
  API.get(apiName, path)
    .then(res => {
      return Promise.all([addMessage('Download successful!'), changeLoading()])
    })  
    .catch(err => {
      console.log(err)
      let error = err.message || err.error || 'Something went wrong. Try again later.'
      return Promise.all([addMessage(error), changeLoading()])
    })
  // console.log(path)
  // console.log(`|||||||||||${apiResponse}||||||||||`);
}

const createBody = async () => {
  const { newPayments,
    newAccounts,
    newAttendance,
    newFinances,
    newCaregivers,
    newCentres,
    newQuestions } = await getAsync(true, true, true, true, true, true, true)
  let userInfo = await SecureStore.getItemAsync('_SIGNEDIN')
  const { user } = JSON.parse(userInfo)

  const accounts = newAccounts.map(acct => {
    acct.payments = newPayments[acct.id]
    return acct
  })
  const centre = newCentres.reduce(centre => centre.id === user.centre_id)
  return {
    id: user.centre_id,
    accounts,
    attendance: newAttendance,
    finances: newFinances,
    caregiver: user,
    daily_questions: newQuestions,
    address: {
      centre_address_1: centre.centre_address_1,
      centre_address_2: centre.centre_address_2
    }
    
  }
}

export const post = async(addMessage, stopLoading) => {
  const body = {
    body: await createBody()
  }
  let apiName = 'KidogoApi'
  let path = '/centres' 
  
  API.post(apiName, path, body)//, myInit)
  .then((res) => {
    console.log(res)
    return Promise.all([addMessage('Upload successful!'), stopLoading()])
  })
  .catch(err => {
    let error = err.message || err.error || 'Something went wrong. Try again later.'
    return Promise.all([addMessage(error), stopLoading()])
  })
}
