import React, { Component } from 'react'
import {
    TodoHeader,
    TodoInput,
    TodoList
} from './components'

export default class App extends Component {
    render() {
        return (
            <>
                <TodoHeader
                 /* desc="今日事，今日毕" x={1} y={2} */>
                <i>待办事项列表 </i>
                </TodoHeader>
                <TodoInput /* btnText="ADD" *//>
                <TodoList />
            </>
        )
    }
}
