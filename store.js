import {combineReducers, createStore} from 'redux'
import accounts from './reducers/accounts'

const reducers = combineReducers({accounts})

export default createStore(reducers)