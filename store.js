import {combineReducers, createStore} from 'redux'
import accounts from './reducers/accounts'
import finances from './reducers/finances'

const reducers = combineReducers({accounts, finances})

export default createStore(reducers)