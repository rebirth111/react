import React, { Component } from 'react'

export default class Like extends Component {
    constructor(){
        super()
        this.state={
            isLiked: false
        }
    }
    handleLikedClick=()=>{
        //使用这种方式修改数据在react里是不允许的，能修改数据，但是界面不会重新渲染
        //this.state.isLiked=!this.state.isLiked
        //要修改数据就用setState方法，setState方法可以有两个参数
        //第一个参数又有两种情况，第一种情况是一个对象
        //this.setState({
        //    isLiked: !this.state.isLiked
        //})
        //第二种情况是一个方法
        this.setState((prevState)=>{
            return {
                isLiked: !prevState.isLiked
            }
        })
    }
    render() {
        return (
            <div>
                <span onClick={this.handleLikedClick}>
                {
                    this.state.isLiked ? '取消 ❤️' : ' 喜欢 💚'
                }
                </span>
            </div>
        )
    }
}
