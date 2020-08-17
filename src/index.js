import React, {Component} from 'react'
import {render} from 'react-dom'

//这里是使用类的形式创建的组件，这是jsx的语法，但不是合法的js代码
/* class App extends Component{
    render(){
        return (
            <div>
                <h1>JSX原理!!!!</h1>
                <p>类组件是继承React.Component的</p>
            </div>
        )
    }
}  */


//所以react在正真的渲染的时候会把上面的代码编译为下面这个样子来运行，下面的代码就是合法的js代码
class App extends Component{
    render(){
        return(
            //React.createElement是一个方法，用来创建元素，可以有很多的参数，前两个是固定的，第一个可以理解为标签名
            //第二个可以理解为标签的属性
            //剩下的，你就写更多的子元素吧
            //React.createElement（type，[props], [...children]
            React.createElement(
                'div',
                {
                    className: 'app',
                    id: 'appRoot'
                },
                React.createElement(
                    'h1',
                    {
                        className: 'title'
                    },
                    'jsx原理'
                ),
                React.createElement(
                    'p',
                    null,
                    '类组件是继承React.Component的'
                )
            )
        )
    }
}


render(
    <App  />,
    document.querySelector('#root')
)
