import {legacy_createStore as createStore} from 'redux'

const initialState={authId:0,isLoggedIn:false,externalUserId:0}

const loginReducer=(state=initialState,action)=>{
    if(action.type==='update'){
        return{
            authId:action.user_id,
            isLoggedIn:!state.isLoggedIn,
            externalUserId:state.externalUserId
        }
    }
    if(action.type==='logout'){
        return{
            authId:0,
            isLoggedIn:!state.isLoggedIn,
            externalUserId:state.externalUserId
        }
    }
    if(action.type==='userView'){
        return{
            authId:state.authId,
            isLoggedIn:state.isLoggedIn,
            externalUserId:action.externalUserId
        }
    }
    return state
}

const store=createStore(loginReducer)

export default store