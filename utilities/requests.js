import {SecureStore} from 'expo'
import getAsync from './getAsync'
import Amplify, { API } from 'aws-amplify';
import awsmobile from '../aws-exports';
Amplify.configure(awsmobile);

export const get = async () => {
  const path = "/centres"; // you can specify the path

  const apiResponse = await API.get("Kidogo", path) //request) //replace the API name
    .catch(err => {
      console.error(err)
    })
  console.log('response:' + apiResponse);
  // this.setState({ apiResponse })
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
  
  const apiResponse = await API.post(apiName, path, body)//, myInit)
  .then(res => Promise.all([addMessage('Upload successful!'), stopLoading()])
  .catch(err => {
    if(err.message) return Promise.all([addMessage(err.message), stopLoading()])
    else if (err.error) return Promise.all([addMessage(err.error), stopLoading()])
    else return Promise.all([addMessage("Something went wrong. Try again later."), stopLoading()])
  })
}
