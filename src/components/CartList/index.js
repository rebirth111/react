import React, { Component } from 'react'
//connect方法执行后就是一个高阶组件
import {connect} from 'react-redux'

//导入actionCreators
import {increment,decrement} from '../../actions/cart'


class CartList extends Component {
    render() {
        return (
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>商品名称</th>
                        <th>价格</th>
                        <th>数量</th>
                        <th>操作</th>
                        
                    </tr>
                </thead>
            <tbody>
               { 
                   this.props.cartList.map(item=>{
                       return (
                        <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.title}</td>
                        <td>{item.price}</td>
                        <td>
                            <button onClick={this.props.decrement.bind(this,item.id)}>-</button>
                            <span>{item.amount}</span>
                            <button onClick={this.props.decrement.bind(this,item.id)}>+</button>
                        </td>
                        <td></td>
                    </tr>
                       )
                   }) 
               }
            </tbody>
            </table>
        )
    }
}
//mapStateToProps,这里的state实际上就是store.getState()的值
const mapState =(state)=>{
    //这里return了什么，在组件里就可以通过this.props来获取
    return{
        cartList:state.cart
    }
}

//connect方法有四个参数，常用的就是前面两个
//第一个参数mapStateToProps,作用就是从store里把state注入到当前组件的props上
//第二个参数可以是mapStateToProps，这个的只要作用是把action生成的方法注入到当前组件的props上，一般来说也没有必要这样用
//export default connect(mapStateToProps)(CartList)
//直接第二个参数传递一个对象，这里面的对象就是actionCreatore，只要传入了actionCreatore，在组件内就可以通过
//actionCreatore,在组件内就通过this.props.actionCreatore来调用，这样的话在调用之后，那个actionCreatore就会自动
//帮你把它内部的action dispatch出去
export default connect(mapState,{increment,decrement})(CartList)