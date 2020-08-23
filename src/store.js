import {createStore,applyMiddleware} from 'redux'

import thunk from 'redux-thunk'

import  rootBeducer from './reducers'
export default createStore(
    rootBeducer,
    applyMiddleware(thunk)
)