import actionType from './actionType'

//action有两种写法

/* //第一种写成一个对象，这是标准的action，但是，问题是不方便传递参数
export const increment={
    type: actionType.CART_AMOUNT_INCREMENT
    payload：{
        id：123
    }
} */

//在工作中常用的一种方式是使用actionCeator，他是一个方法，返回一个对象，这个对象才是真正的action
export const increment =(id)=>{
    return {
        type:actionType.CART_AMOUNT_INCREMENT,
        payload:{
            id
        }
    }
    
}


export const decrement =(id)=>{
    return {
        type:actionType.CART_AMOUNT_DECREMENT,
        payload:{
            id
        }
    }
    
}

//异步action，使用redux-thunk之后没救可以在actionCreator里return一个方法，这个方法的参数就是dispatch
/* export const decrementAsync =(id)=>{
   return (dispatch)=>{
    setTimeout(()=>{
        dispatch(decrement()) 
    },2000)
   } 
} */
export const decrementAsync =id=>dispatch=>{
     setTimeout(()=>{
         dispatch(decrement(id)) 
     },2000)
    } 