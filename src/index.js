import React from 'react'
import ReactDOM from 'react-dom'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import {LocaleProvider,ConfigProvider}from 'antd'

import App from './App'
ReactDOM.render(
    <ConfigProvider prefixCls="nbfee">
    <LocaleProvider locale={zhCN}>
    <App />
    </LocaleProvider>
    </ConfigProvider>,
    document.querySelector('#root')
)