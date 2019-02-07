import {combineReducers, createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import accounts from './reducers/accounts'
import finances from './reducers/finances'
import attendance from './reducers/attendance'

const reducers = combineReducers({accounts, attendance, finances})

export default createStore(reducers, applyMiddleware(thunk))