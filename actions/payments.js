import {SecureStore} from 'expo'

export const GET_PAYMENTS = 'GET_PAYMENTS'
export function getPayments() {
  return async dispatch => {
    try{
      let payments = await SecureStore.getItemAsync('_PAYMENTS')
      if(!payments) payments = {}
      else payments = JSON.parse(payments)
      dispatch({
        type: GET_PAYMENTS,
        payload: payments
      })
    }catch(err){
      console.error(err)
    }
  }
}

export const MAKE_PAYMENT = 'MAKE_PAYMENT'
export function makePayment(id, amount, balance, date){
  console.log(id, amount, balance, date)
  return async dispatch => {
    try {
      let payments = await SecureStore.getItemAsync('_PAYMENTS')
      if (!payments) payments = {}
      else payments = JSON.parse(payments)
      const newPayments = Object.assign(payments)
      const paymentDetails = {
        amount,
        balanceBefore: balance,
        balanceAfter: balance - amount,
        date
      }
      if(!newPayments[id]) newPayments[id] = []
      newPayments[id].push(paymentDetails)
      await SecureStore.setItemAsync('_PAYMENTS', JSON.stringify(newPayments))
      dispatch({
        type: GET_PAYMENTS,
        payload: newPayments
      })
      
    } catch (err) {
      console.error(err)
    }
  }
}