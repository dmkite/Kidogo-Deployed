import {SecureStore} from 'expo'

export default setAsync = async ([data], cb1, cb2) => {
  if(data){
    const {accounts, attendance, finances, daily_questions} = data
    const payments = accounts.reduce((acc, acct) => {
      acc[acct.id] = acct.payments
      return acc
    }, {})
    try{
      await SecureStore.setItemAsync('_ACCOUNTS', JSON.stringify(accounts))
      await SecureStore.setItemAsync('_ATTENDANCE', JSON.stringify(attendance))
      await SecureStore.setItemAsync('_FINANCES', JSON.stringify(finances))
      await SecureStore.setItemAsync('_QUESTIONS', JSON.stringify(daily_questions))
      await SecureStore.setItemAsync('_PAYMENTS', JSON.stringify(payments))
      return Promise.all([cb1(false, 'showDif'), cb2()])
    }catch(err){
      cb((err.message || err.error || 'Something went wrong when trying to store the new information. Try again later'), 'error')
    }
  }
  else{
    cb('Something went wrong. Please try again later.', 'error')
  }
}
