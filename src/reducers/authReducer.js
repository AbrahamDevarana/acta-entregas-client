import { LOGIN_SUCCESS, LOGIN_ERROR, GET_USER, LOG_OUT } from '../types'


// Cada reducer tiene su state
const initialState = {
    user: [],
    auth: false,
    token: false,
    loading: true
}

export default function foo (state = initialState, action){
    
    switch (action.type) {
        case LOGIN_SUCCESS:
            localStorage.setItem('Bearer', action.payload.access_token)
            return {
                ...state,
                auth:true,
                loading:false,
                token:true
            }
        case LOGIN_ERROR:
        case LOG_OUT:
            localStorage.removeItem('Bearer')
            return {
                ...state,
                token: false,
                auth: false,
                loading: false,
                user: false
            }
        case GET_USER:
            return{
                ...state,
                auth: true,
                user: action.payload,
                loading: false
            }
        default:
            return state;
    }
}