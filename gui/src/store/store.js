import {legacy_createStore as createStore} from 'redux'

const initialState={authId:0,isLoggedIn:false}

const loginReducer=(state=initialState,action)=>{
    if(action.type==='update'){
        return{
            authId:action.user_id,
            isLoggedIn:!state.isLoggedIn
        }
    }
    if(action.type==='logout'){
        return{
            authId:0,
            isLoggedIn:!state.isLoggedIn
        }
    }
    return state
}

const store=createStore(loginReducer)

export default store