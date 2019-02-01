import {combineReducers, createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import accounts from './reducers/accounts'
import finances from './reducers/finances'

const reducers = combineReducers({accounts, finances})

export default createStore(reducers, applyMiddleware(thunk))