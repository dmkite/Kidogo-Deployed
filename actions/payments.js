import {SecureStore} from 'expo'
import Dates from '../utilities/dates'
import getAsync from '../utilities/getAsync'
import { UPDATE_ACCOUNTS } from './accounts';


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
export const UPDATE_FINANCES = 'UPDATE_FINANCES'
export function makePayment(id, amount, balance, date){
  if(!date) date = new Dates().getToday()
  return async dispatch => {
    try {
      
      const {newPayments, newAccounts} = await getAsync(true, true)
      const paymentDetails = {
        amount,
        balanceBefore: balance,
        balanceAfter: Number(balance) - Number(amount),
        date
      }
      if(!newPayments[id]) newPayments[id] = []
      newPayments[id].push(paymentDetails)
      newAccounts.forEach(acct => {
        if(acct.id === id) acct.balance = Number(acct.balance) - Number(amount)
      })
      await SecureStore.setItemAsync('_PAYMENTS', JSON.stringify(newPayments))
      await SecureStore.setItemAsync('_ACCOUNTS', JSON.stringify(newAccounts))
      dispatch({
        type: GET_PAYMENTS,
        payload: newPayments
      })
      dispatch({
        type: UPDATE_ACCOUNTS,
        payload: newAccounts
      })
      dispatch({
        type:UPDATE_FINANCES,
        payload:{income:amount}
      })
      
    } catch (err) {
      console.error(err)
    }
  }
}

export const ADD_FEES = 'ADD_FEES'
export function addFees(){  
  return async dispatch => {
    try{
      const dates = new Dates()
      const { newPayments, newAccounts, newAttendance } = await getAsync(true, true, true)
      let { previousAttendance, dayToCheck, needsToPay } = checkIfPaymentNeeded(newAttendance, dates)

      if(needsToPay){
        newAccounts.forEach((acct) => {
          const paymentHistory = newPayments[acct.id]
          let paymentNeeded
          
          if(acct.frequency === 'daily') paymentNeeded = needToPayDailyFee(paymentHistory, dayToCheck, acct, previousAttendance) 
          else if(acct.frequency === 'weekly') paymentNeeded = needToPayWeeklyOrTermlyFee(paymentHistory, acct, 7)
          else paymentNeeded = needToPayWeeklyOrTermlyFee(paymentHistory, acct, 90) //NOTE: this assumes a 90 day term

          if(paymentNeeded){
            if(!newPayments[acct.id]) newPayments[acct.id] = []
            newPayments[acct.id].push({
              amount: acct.rate,
              balanceBefore: acct.balance,
              balanceAfter:Number(acct.balance) + Number(acct.rate),
              date: dates.getToday()
            })
            acct.balance = Number(acct.balance) + Number(acct.rate)
          }
        })
      }

      await SecureStore.setItemAsync('_PAYMENTS', JSON.stringify(newPayments))
      await SecureStore.setItemAsync('_ACCOUNTS', JSON.stringify(newAccounts))
      dispatch({
          type: ADD_FEES,
          payload:{payments: newPayments, accounts:newAccounts}
        })
      }catch(err){
        console.error(err)
      }
    }
  }
  
  function needToPayDailyFee(paymentHistory, dayToCheck, acct, previousAttendance){
    //if fee was already added, return false
    let expectedPaymentDay = new Dates().getDifferentDay('add', dayToCheck)

    if(paymentHistory){
      for (let payment of paymentHistory) {
        let {date, amount, balanceAfter, balanceBefore} = payment

        if (date === expectedPaymentDay && balanceBefore < balanceAfter) return false
      }
    }
    //check to see if any child was present on day in question
    if(previousAttendance){
      for(let child of acct.children){
        if(previousAttendance && previousAttendance[child.id] && previousAttendance[child.id].checkIn !== false) return true
      }
    }

    return false
  }

  function checkIfPaymentNeeded(newAttendance, dates){
    const yesterday = dates.getDifferentDay('subtract')
    let needsToPay = true

    let dayToCheck = yesterday
    let previousAttendance = newAttendance[dayToCheck]

    if (!newAttendance[yesterday]) {
      dayToCheck = dates.getDifferentDay('subtract', yesterday)
      previousAttendance = newAttendance[dayToCheck]
    }
    if (!previousAttendance) {
      dayToCheck = dates.getDifferentDay('subtract', dayToCheck)
      previousAttendance = newAttendance[dayToCheck]
    }
    if (!previousAttendance) needsToPay = false

    return {previousAttendance, dayToCheck, needsToPay}

  }

function needToPayWeeklyOrTermlyFee(paymentHistory, acct, days){
  if(!paymentHistory) return true
  let date = new Dates()
  let lastPaymentDate
  for(let i = paymentHistory.length - 1; i >= 0; i--){
    let {amount, balanceBefore, balanceAfter } = paymentHistory[i]
    if (amount == acct.rate && balanceBefore < balanceAfter){
      if(!lastPaymentDate){
        lastPaymentDate = paymentHistory[i].date
        continue
      }
      let [d1, m1, y1] = lastPaymentDate.split('-')
      let [d2, m2, y2] = paymentHistory[i].date.split('-')
      if(Number(y2) > Number(y1) ) lastPaymentDate = paymentHistory[i]
      else if(Number(y2) === Number(y1) && Number(m2) > Number(m1)) lastPaymentDate = paymentHistory[i]
      else if(Number(y2) === Number(y1) && Number(m2) === Number(m1) && Number(d2) > Number(d1)) lastPaymentDate = paymentHistory[i]
    }
  }
  if(!lastPaymentDate) return true
  const today = date.getToday()
  
  let difference = date.compareDates(today, lastPaymentDate)
  if(difference >= days) return true
  return false
}
