import React, { Component } from 'react'


const withCopyright=(YourComponent)=>{
    return class withCopyright extends Component {
        render() {
            return (
                <>
                    <YourComponent {...this.props}/>
                    <div>&copy; 2020 &emsp;一川烟草</div>
                </>
            )
        }
    }
}

export default withCopyright

