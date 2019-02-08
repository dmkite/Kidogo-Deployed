import {SecureStore} from 'expo'
import Dates from '../utilities/dates'
import { FULLSCREEN_UPDATE_PLAYER_DID_PRESENT } from 'expo/build/av/Video';

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

export const ADD_FEES = 'ADD_FEES'
export function addFees(){
  return async dispatch => {
    try{
      const dates = new Dates()

      const { newPayments, newAccounts, newAttendance } = await getFromSecureStore(true, true, true)
      const { previousAttendance, dayToCheck, needsToPay } = checkIfPaymentNeeded(newAttendance, dates)

      if(needsToPay){
        newAccounts.forEach((acct) => {
          const paymentHistory = newPayments[acct.id]

          let paymentNeeded = needToPayDailyFee(paymentHistory, dayToCheck, acct, previousAttendance) 
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
        let {date, amount} = payment

        if (date === expectedPaymentDay && amount == acct.rate) return false
      }
    }
    //check to see if any child was present on day in question
    if(previousAttendance){
      for(let child of acct.children){
        if(previousAttendance[child.id].checkIn !== false) return true
      }
    }

    return false
  }

  const getFromSecureStore = async (payments, accounts, attendance) => {
    const dataObj = {}
    if(payments){
      let payments = await SecureStore.getItemAsync('_PAYMENTS')
      if (!payments) payments = {}
      else payments = JSON.parse(payments)
      const newPayments = { ...payments }
      dataObj.newPayments = newPayments
    }
    if(accounts){
      let accounts = await SecureStore.getItemAsync('_ACCOUNTS')
      if (!accounts) accounts = []
      else accounts = JSON.parse(accounts)
      const newAccounts = [...accounts]
      dataObj.newAccounts = newAccounts
    }
    if(attendance){
      let attendance = await SecureStore.getItemAsync('_ATTENDANCE')
      if (!attendance) attendance = {}
      else attendance = JSON.parse(attendance)
      const newAttendance = { ...attendance }
      dataObj.newAttendance = newAttendance
    }
    // console.log(dataObj)
    // console.log(dataObj)
    return dataObj
  }

  function checkIfPaymentNeeded(newAttendance, dates){
    const yesterday = dates.getDifferentDay('subtract')
    let needsToPay = true

    let dayToCheck = yesterday
    const previousAttendance = newAttendance[dayToCheck]

    if (!newAttendance[yesterday]) {
      dayToCheck = dates.getDifferentDay('subtract', yesterday)
      previousAttendance = newAttendance[dayToCheck]
    }
    if (!previousAttendance) {
      dayToCheck = dates.getDifferentDay('subtract', dayToCheck)
      previousAttendance = newAttendance[daytoCheck]
    }
    if (!previousAttendance) needsToPay = false

    return {previousAttendance, dayToCheck, needsToPay}

  }
//check yesterday to see if payment was made
//check yesterday to see if child at account was present
//if yesterday was sunday, check saturday