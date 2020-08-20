import Rract,{useState} from 'react'
import {render} from 'react-dom'

const Counter=()=>{
    const [count,setCount] =useState(0)
    return(
        <div>
            <button onClick={()=>{setCount(count-1)}}>-</button>
            <span>{count}</span>
            <button onClick={()=>{setCount(count+1)}}>+</button>
        </div>
    )
}

render(
    <Counter />,
    document.querySelector('#root')
)