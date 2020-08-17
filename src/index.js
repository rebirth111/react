import React, {Component} from 'react'
import {render} from 'react-dom'
import classNames from 'classnames'

import './index.css'


 class App extends Component{
    render(){
        const style={color:'red'}
        return (
            <div>
                <h1 >元素中的样式</h1>
                <ol>
                    <li style={style}>使用style内联创建</li>
                    <li className="has-text-red">使用class的方式，但是在react里class要写成className</li>
                    <li className={classNames('a', {'b':true, 'c': false})}
                    >要动态添加不同的className，就可以借助第三方的包叫classnames.这里就只有a，b，没有c</li>
                    <li>stytle-components的使用</li>
                </ol>
            </div>
        )
    }
}  



render(
    <App  />,
    document.querySelector('#root')
)
