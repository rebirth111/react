import React from 'react'
import PropTypes from 'prop-types'
export default function TodoHeader(props) {
    return (
        <>
        <h1>
           {props.children} 
        </h1>
        <h2>{props.desc}</h2>
    <p>{props.x+props.y}</p>
        </>
    )
}
TodoHeader.propTypes={
    desc:PropTypes.string.isRequired,
    x:PropTypes.number.isRequired,
    y:PropTypes.number.isRequired,
    //children:PropTypes.isRequired
}
TodoHeader.defaultProps={
    desc: '如果还有明天'
}