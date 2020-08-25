//此页只是用于解释treact-loadable的原理，当然可以无缝切换

import React ,{Component} from 'react'


const Loadable=({
    loader,
    loading: Loading
})=>{
    return class Loadable extends Component{
        state={
            LoadedComponent: null
        }
        componentDidMount(){
            loader()
            .then(resp=>{
                this.setState({
                    LoadedComponent: resp.default
                })
            })
        }
        render(){
            const {
                LoadedComponent
            }=this.state
            return(
                LoadedComponent
                ?
                <LoadedComponent />
                :
                <Loading />
            )
        }
    }
}

export default Loadable