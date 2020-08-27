import actionTypes from '../actions/actionTypes'
const initState={
    isLoading: false,
    list:[{
        id:1,
        title: 'Lorem ipsum dolor sit 111',
        desc: '111 Relied upon by more than 11 million developers worldwide, npm is committed to making JavaScript development elegant, productive, and safe.',
        hasRead: false
    },{
        id:2,
        title: 'Lorem ipsum dolor sit 222',
        desc: '222 Relied upon by more than 11 million developers worldwide, npm is committed to making JavaScript development elegant, productive, and safe.',
        hasRead: false
    }]
}

export default (state=initState,action)=>{
    switch(action.type){
        case actionTypes.RECIVED_NOTIFICATIONS:
            return{
                ...state,
                list:action.payload.list
            }
        case actionTypes.START_NOTIFICATION_POST:
            return{
                ...state,
                isLoading:true
            }
            case actionTypes.FINISH_NOTIFICATION_POST:
            return{
                ...state,
                isLoading:false
            }
        case actionTypes.MARK_NOTIFICATION_AS_READ_BY_ID:
            const newList=state.list.map(item=>{
                if(item.id===action.payload.id){
                    item.hasRead=true
                }
                return item
            })
            return {
                ...state,
                list:newList
            }
            case actionTypes.MARK_ALL_NOTIFICATIONS_AS_READ:
            return {
                ...state,
                list:state.list.map(item=>{
                    item.hasRead=true
                    return item
                })
            }
        default:
            return state
    }
}