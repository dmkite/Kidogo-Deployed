import getAsync from '../utilities/getAsync'
import dateMath from 'date-arithmetic'
import { SecureStore } from 'expo';
import Dates from '../utilities/dates'

export const GET_FINANCES = 'GET_FINANCES'
export function getFinances(){
  return async dispatch => {
    try{
      const newFinances = await getAsync(false, false, false, true)
      dispatch({
        type: GET_FINANCES,
        payload: newFinances
      })
    }catch(err){
      console.error(err)
    }
  }
}

export const GET_WEEK_BALANCE = 'GET_WEEK_BALANCE'
export function getWeekBalances(dateMod = 0){
  return async dispatch => {
    const d = new Dates()
    const {newPayments, newFinances} = await getAsync(true, false, false, true)
    // const week = dateSpan(dateMod)
    const week = d.getSpan(dateMod)
    const income = getIncome(newPayments, week)
    const expenses = getExpenses(newFinances, week)
    dispatch({
      type: GET_WEEK_BALANCE,
      payload:{net: {income, expenses}, history: newFinances}
    })
  }
}

export const ADD_EXPENSE = 'ADD_EXPENSE'
export function addExpense(expense){
  return async dispatch => {
    try{
      const {newFinances} = await getAsync(false, false, false, true)
      if(!newFinances[expense.date]) newFinances[expense.date] = []
      newFinances[expense.date].unshift({
        memo: expense.memo,
        amount: expense.amount
      })
      let signedIn = await SecureStore.getItemAsync('_SIGNEDIN')
      const { user: { id } } = JSON.parse(signedIn)
      SecureStore.setItemAsync(`_FINANCES_${id}`, JSON.stringify(newFinances))
      dispatch({
        type: ADD_EXPENSE,
        payload:{history: newFinances, amount: expense.amount}
      })
    }catch(err){
      console.error(err)
    }
  }
}

// const dateSpan = (dateMod = 0) => {
//   const date = new Date()
//   const year = date.getFullYear()
//   const month = date.getMonth()
//   const day = date.getDate()
//   const dayOfWeek = date.getDay()
//   let today = new Date(year, month, day)
//   if (dateMod < 0) dateMod = -dateMod
//   today = dateMath.subtract(today, dateMod, 'day')
//   const upper = dateMath.add(today, 6 - dayOfWeek, 'day')
//   const lower = dateMath.subtract(today, dayOfWeek, 'day')
//   const endSpan = []
//   let endDate = upper.getDate()
//   while (endDate > 0 && endSpan.length < 7) {
//     let day = endDate < 10 ? '0' + endDate : endDate
//     let month = upper.getMonth() + 1 < 10 ? '0' + (upper.getMonth() + 1) : upper.getMonth() + 1
//     let year = upper.getFullYear()
//     endSpan.unshift(`${day}-${month}-${year}`)
//     endDate--
//   }
//   if (endSpan.length === 7) {
//     return endSpan
//   }
//   else {
//     let startDateLength = 7 - endSpan.length
//     let startDate = lower.getDate()
//     let startSpan = []
//     while (startSpan.length !== startDateLength) {
//       let day = startDate < 10 ? '0' + startDate : startDate
//       let month = lower.getMonth() + 1 < 10 ? '0' + (lower.getMonth() + 1) : lower.getMonth() + 1
//       let year = lower.getFullYear()
//       startSpan.push(`${day}-${month}-${year}`)
//       startDate++
//     }
//     return startSpan.concat(endSpan) 
//   }
// }

function getIncome(paymentObj, week){
  return Object.keys(paymentObj).reduce((acc, acctId) => {
    const paymentHistory = paymentObj[acctId]
    paymentHistory.map(payment => {
      if(payment.balanceBefore > payment.balanceAfter && week.includes(payment.date)) acc += Number(payment.amount)
    })
    return acc
  }, 0)
}

function getExpenses(financesObj, week){
  return week.reduce((acc, date) => {
    if(financesObj[date]){
      financesObj[date].map(exp => {
        acc += Number(exp.amount)
      })
    }
    return acc
  }, 0)
}