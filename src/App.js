import React, { Component, Fragment } from 'react'
import {
    TodoHeader,
    TodoInput,
    TodoList,
    Like
} from './components'

export default class App extends Component {
   /*  state={
        title: "待办事项列表"
    } */
    constructor(){
        super()
        this.state={
            title: "待办事项列表",
            desc: '今日事，今日毕',
            article: '<div>shfdeuifrgfregervnfved   <i>asdewrew</i></div>',
            todos:[{
                id: 1,
                title: '写作',
                assignee: '老舍',
                isCompleted: true
            },
            {
                id: 2,
                title: '睡觉',
                assignee: '八戒',
                isCompleted: false
            }]
        }
    }

    addTodo=(todoTitle)=>{
        //这样写出错了，3不是一个数组，因为push语句返回的是数组长度
       /*  this.setState({
            todos:this.state.todos.push({
                id: Math.random(),
                title: todoTitle,
                isCompleted: false
            })
        }) */

        //const newTodos=this.state.todos.slice()
        const newTodos=[...this.state.todos]
        newTodos.push({
                id: Math.random(),
                title: todoTitle,
                isCompleted: false
        })
        this.setState({
            todos:newTodos
        })

       /* //这个代码是对的，不会出错
        this.setState({
            todos:this.state.todos.concat({
                id: Math.random(),
                title: todoTitle,
                isCompleted: false
            })
        }) 
 */
    }

    render() {
        return (
            <Fragment>
{/*                 {
                    <div dangerouslySetInnerHTML={{__html:this.state.article}} />
                } */}
           {/*  {
                this.state.todos.map(todo=>{
                    return<div key={todo.id}>{todo.title}</div>
                })
            } */}
                <TodoHeader
                 desc={this.state.desc} >
                {this.state.title}
                </TodoHeader>
                <TodoInput 
                addTodo={this.addTodo}
                />
                <TodoList todos={this.state.todos}/> 
                <Like />
            </Fragment>
        )
    }
}
