import {
    VIEW_RESIDENCIA,
    VIEW_RESIDENCIA_SUCCESS,
    VIEW_RESIDENCIA_ERROR,
    DELETE_RESIDENCIA,
    DELETE_RESIDENCIA_SUCCESS,
    DELETE_RESIDENCIA_ERROR,
    EDIT_RESIDENCIA,
    EDIT_RESIDENCIA_SUCCESS,
    EDIT_RESIDENCIA_ERROR,
    UPDATE_RESIDENCIA,
    UPDATE_RESIDENCIA_SUCCESS,
    UPDATE_RESIDENCIA_ERROR,
    CLEAN_RESIDENCIA,
    REDIRECT,

} from '../types'

const initialState = {
    residencia: [],
    errors: false,
    loading: false,
    edit: false,
    delete: null,
    redirectTo: false,
    seccionDpto:[]
}


export default function foo (state = initialState, action ){
    switch (action.type) {
        case EDIT_RESIDENCIA:
        case UPDATE_RESIDENCIA:
            return {
                ...state,
                loading: action.payload, 
            }
        case DELETE_RESIDENCIA:
            return {
                ...state,
                loading: true,
                delete: action.payload,
            }
        case EDIT_RESIDENCIA_SUCCESS:
            return {
                ...state,
                loading: false,
                errors: null,
                edit: action.payload,
                edition: false
            }
        case VIEW_RESIDENCIA_ERROR:
        case EDIT_RESIDENCIA_ERROR:
        case DELETE_RESIDENCIA_ERROR:
        case UPDATE_RESIDENCIA_ERROR:
            return {
                ...state,
                loading: false,
                errors: action.payload
            }

        case VIEW_RESIDENCIA:
            return {
                ...state,
                loading: action.payload,
            }
        case VIEW_RESIDENCIA_SUCCESS:
            return {
                ...state,
                loading: false,
                residencia: action.payload,
                error: false
            }
        case UPDATE_RESIDENCIA_SUCCESS:
            return {
                ...state,
                edit: false,
                residencia: state.residencia.map ( item => item.id === action.payload.id ? item = action.payload : item )
            }
        case DELETE_RESIDENCIA_SUCCESS:
            return {
                ...state,
                residencia: state.residencia.filter( item => item.id !== state.delete ),
                delete: null
            }
        case CLEAN_RESIDENCIA:
            return {
                ...state,
                errors: false,
                edit: false,
                delete: null,
                redirectTo: false
            }

        case REDIRECT:
            return {
                ...state,
                redirectTo: action.payload
            }
        
        default: 
            return state
    }
}