//createStore是react提供的一个用于创建store的方法，这个原理已经讲到过
import {createStore} from 'redux'
//引入合并后的redux
import thunk from 'redux-thunk'

import rootReducer from './reducers'
import { applyMiddleware } from 'redux'
//createStore的第一个参数必须是一个reducer，如果是多个，请在reducer目录下先使用conbineReducers全并之后再导出
export default createStore(
    rootReducer,
    applyMiddleware(thunk)
    )