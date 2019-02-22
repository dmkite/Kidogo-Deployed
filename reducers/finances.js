import {GET_FINANCES, GET_WEEK_BALANCE, ADD_EXPENSE} from '../actions/finances'
import {UPDATE_FINANCES} from '../actions/payments'

const INITIAL_STATE = {
  history: {},
  net: {
    expenses: 0,
    income:0
  }
}

const finances = (state=INITIAL_STATE, {type, payload}) => {
  let newNet
  switch(type){ 
    case GET_FINANCES:
      return {...state, history: payload}
    case GET_WEEK_BALANCE:
      return payload
    case ADD_EXPENSE: 
      newNet = {...state.net}
      newNet.expenses = Number(newNet.expenses) + Number(payload.amount)
      return {net: newNet, history: payload.history}
    case UPDATE_FINANCES:
      const {expenses = 0, income = 0} = payload
      newNet = {...state.net}
      newNet.expenses = Number(newNet.expenses) + Number(expenses)
      newNet.income = Number(newNet.income) + Number(income)
      return {...state, net:newNet}
    default: 
      return state
  }

}

export default finances