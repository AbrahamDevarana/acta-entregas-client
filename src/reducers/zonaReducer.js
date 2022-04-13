
import {
    CREATE_ZONA,
    CREATE_ZONA_SUCCESS,
    CREATE_ZONA_ERROR,
    VIEW_ZONA,
    VIEW_ZONA_SUCCESS,
    VIEW_ZONA_ERROR,
    DELETE_ZONA,
    DELETE_ZONA_SUCCESS,
    DELETE_ZONA_ERROR,
    EDIT_ZONA,
    EDIT_ZONA_SUCCESS,
    EDIT_ZONA_ERROR,
    UPDATE_ZONA,
    UPDATE_ZONA_SUCCESS,
    UPDATE_ZONA_ERROR,
    CLEAN_ZONA,
    REDIRECT
} from '../types'

const initialState = {
    zona: [],
    errors: false,
    loading: false,
    edit: false,
    delete: null,
    redirectTo: false
}


export default function foo (state = initialState, action ){
    switch (action.type) {

        case CREATE_ZONA:
        case EDIT_ZONA:
        case UPDATE_ZONA:
            return {
                ...state,
                loading: action.payload, 
            }
        case DELETE_ZONA:
            return {
                ...state,
                loading: true,
                delete: action.payload,
            }
        case CREATE_ZONA_SUCCESS:
            return {
                ...state,
                loading: false,
                zona: [...state.zona, action.payload],
                errors: null
            }
        case EDIT_ZONA_SUCCESS:
            return {
                ...state,
                loading: false,
                errors: null,
                edit: action.payload,
                edition: false
            }
        case CREATE_ZONA_ERROR:
        case VIEW_ZONA_ERROR:
        case EDIT_ZONA_ERROR:
        case DELETE_ZONA_ERROR:
        case UPDATE_ZONA_ERROR:
            return {
                ...state,
                loading: false,
                errors: action.payload
            }

        case VIEW_ZONA:
            return {
                ...state,
                loading: action.payload,
            }
        case VIEW_ZONA_SUCCESS:
            return {
                ...state,
                loading: false,
                zona: action.payload,
                error: false
            }
        case UPDATE_ZONA_SUCCESS:
            return {
                ...state,
                edit: false,
                zona: state.zona.map ( item => item.id === action.payload.id ? item = action.payload : item )
            }
        case DELETE_ZONA_SUCCESS:
            return {
                ...state,
                zona: state.zona.filter( item => item.id !== state.delete ),
                delete: null
            }
        case CLEAN_ZONA:
            return {
                ...state,
                errors: false,
                edit: false,
                delete: null,
                redirectTo: false,
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