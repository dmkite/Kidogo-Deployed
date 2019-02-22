import {combineReducers, createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import accounts from './reducers/accounts'
import finances from './reducers/finances'
import attendance from './reducers/attendance'
import payments from './reducers/payments'

const reducers = combineReducers({accounts, attendance, finances, payments})

export default createStore(reducers, applyMiddleware(thunk))