import {GET_FINANCES, GET_WEEK_BALANCE} from '../actions/finances'

const INITIAL_STATE = {
  history: {},
  net: {
    expenses: 0,
    income:0
  }
}

const finances = (state=INITIAL_STATE, {type, payload}) => {
  switch(type){ 
    case GET_FINANCES:
      return {...state, history: payload}
    case GET_WEEK_BALANCE:
      return payload
    default: 
      return state
  }
}

export default finances