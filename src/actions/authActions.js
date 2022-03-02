import clientAxios from '../config/axios'
import {LOGIN_SUCCESS, LOGIN_ERROR, GET_USER, LOG_OUT,} from '../types'
import tokenAuth from '../config/tokenAuth'

export function loginAction(login){
    return (dispatch) => {
        clientAxios.post('/login', login)
        .then ( response => {
            dispatch( loginSuccess(response.data) ) 
            dispatch(getUserInfo()) 
        })
        .catch( error => {
            dispatch(loginError())
        })
    }
}

const loginSuccess = payload => ({
    type: LOGIN_SUCCESS,
    payload
})

const loginError = () => ({
    type: LOGIN_ERROR
})

export function getUserInfo() {
    return async (dispatch) => {
        const token = localStorage.getItem('Bearer')
        if( token ){
            tokenAuth(token)
        }else{
            return null
        }
        await clientAxios.get('user')
        .then( response => {
            dispatch({
                type: GET_USER,
                payload: response.data
            })
        }).catch ( error => {
            dispatch({
                type: LOGIN_ERROR
            })
        })
    }
}

export function logOutAction(){
    return (dispatch) => dispatch({
        type: LOG_OUT
    })
}
