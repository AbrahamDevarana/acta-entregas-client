import {
    CREATE_SECCION,
    CREATE_SECCION_SUCCESS,
    CREATE_SECCION_ERROR,
    VIEW_SECCION,
    VIEW_SECCION_SUCCESS,
    VIEW_SECCION_ERROR,
    DELETE_SECCION,
    DELETE_SECCION_SUCCESS,
    DELETE_SECCION_ERROR,
    EDIT_SECCION,
    EDIT_SECCION_SUCCESS,
    EDIT_SECCION_ERROR,
    UPDATE_SECCION,
    UPDATE_SECCION_SUCCESS,
    UPDATE_SECCION_ERROR,
} from '../types'

const initialState = {
    seccion: [],
    errors: false,
    loading: false,
    edit: false,
    delete: null
}


export default function foo (state = initialState, action ){
    switch (action.type) {

        case CREATE_SECCION:
        case EDIT_SECCION:
        case UPDATE_SECCION:
            return {
                ...state,
                loading: action.payload, 
            }
        case DELETE_SECCION:
            return {
                ...state,
                loading: true,
                delete: action.payload,
            }
        case CREATE_SECCION_SUCCESS:
            return {
                ...state,
                loading: false,
                seccion: [...state.seccion, action.payload],
                errors: null
            }
        case EDIT_SECCION_SUCCESS:
            return {
                ...state,
                loading: false,
                errors: null,
                edit: action.payload,
                edition: false
            }
        case CREATE_SECCION_ERROR:
        case VIEW_SECCION_ERROR:
        case EDIT_SECCION_ERROR:
        case DELETE_SECCION_ERROR:
        case UPDATE_SECCION_ERROR:
            return {
                ...state,
                loading: false,
                errors: action.payload
            }

        case VIEW_SECCION:
            return {
                ...state,
                loading: action.payload,
            }
        case VIEW_SECCION_SUCCESS:
            return {
                ...state,
                loading: false,
                seccion: action.payload,
                error: false
            }
        case UPDATE_SECCION_SUCCESS:
            return {
                ...state,
                edit: false,
                seccion: state.seccion.map ( item => item.id === action.payload.id ? item = action.payload : item )
            }
        case DELETE_SECCION_SUCCESS:
            return {
                ...state,
                seccion: state.seccion.filter( item => item.id !== state.delete ),
                delete: null
            }

        
        
        default: 
            return state
    }
}