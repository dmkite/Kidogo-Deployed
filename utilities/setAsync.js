import {SecureStore} from 'expo'

export default setAsync = async ([data], cb1, cb2) => {
  let signedIn = await SecureStore.getItemAsync('_SIGNEDIN') 
  const { user: { id } } = JSON.parse(signedIn)
  if(data){
    const {accounts, attendance, finances, daily_questions} = data
    const payments = accounts.reduce((acc, acct) => {
      acc[acct.id] = acct.payments
      return acc
    }, {})
    try{
      await SecureStore.setItemAsync(`_ACCOUNTS_${id}`, JSON.stringify(accounts))
      await SecureStore.setItemAsync(`_ATTENDANCE_${id}`, JSON.stringify(attendance))
      await SecureStore.setItemAsync(`_FINANCES_${id}`, JSON.stringify(finances))
      await SecureStore.setItemAsync(`_QUESTIONS_${id}`, JSON.stringify(daily_questions))
      await SecureStore.setItemAsync(`_PAYMENTS_${id}`, JSON.stringify(payments))
      return Promise.all([cb1(false, 'showDif'), cb2()])
    }catch(err){
      cb((err.message || err.error || 'Something went wrong when trying to store the new information. Try again later'), 'error')
    }
  }
  else{
    cb('Something went wrong. Please try again later.', 'error')
  }
}
