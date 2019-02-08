import {GET_PAYMENTS, MAKE_PAYMENT} from '../actions/payments'

const INITIAL_STATE = {
  id: [
    {
      date: null,
      balanceBefore: 0,
      amount: 0,
      balanceAfter: 0
    }
  ]
}

function payments(state=INITIAL_STATE, {type, payload}){
  switch(type){
    case GET_PAYMENTS:
      return payload
    case MAKE_PAYMENT:
      return payload
    default: 
      return state
  }
}

export default payments