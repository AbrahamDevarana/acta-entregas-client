import {
    CREATE_DESARROLLO,
    CREATE_DESARROLLO_SUCCESS,
    CREATE_DESARROLLO_ERROR,
    VIEW_DESARROLLO,
    VIEW_DESARROLLO_SUCCESS,
    VIEW_DESARROLLO_ERROR,
    DELETE_DESARROLLO,
    DELETE_DESARROLLO_SUCCESS,
    DELETE_DESARROLLO_ERROR,
    EDIT_DESARROLLO,
    EDIT_DESARROLLO_SUCCESS,
    EDIT_DESARROLLO_ERROR,
    UPDATE_DESARROLLO,
    UPDATE_DESARROLLO_SUCCESS,
    UPDATE_DESARROLLO_ERROR,
    CLEAN_DESARROLLO,
    REDIRECT
} from '../types'

const initialState = {
    desarrollo: [],
    errors: false,
    loading: false,
    edit: false,
    delete: null,
    redirectTo: false
}


export default function foo (state = initialState, action ){
    switch (action.type) {

        case CREATE_DESARROLLO:
        case EDIT_DESARROLLO:
        case UPDATE_DESARROLLO:
            return {
                ...state,
                loading: action.payload, 
            }
        case DELETE_DESARROLLO:
            return {
                ...state,
                loading: true,
                delete: action.payload,
            }
        case CREATE_DESARROLLO_SUCCESS:
            return {
                ...state,
                loading: false,
                desarrollo: [...state.desarrollo, action.payload],
                errors: null
            }
        case EDIT_DESARROLLO_SUCCESS:
            return {
                ...state,
                loading: false,
                errors: null,
                edit: action.payload,
                edition: false
            }
        case CREATE_DESARROLLO_ERROR:
        case VIEW_DESARROLLO_ERROR:
        case EDIT_DESARROLLO_ERROR:
        case DELETE_DESARROLLO_ERROR:
        case UPDATE_DESARROLLO_ERROR:
            return {
                ...state,
                loading: false,
                errors: action.payload
            }

        case VIEW_DESARROLLO:
            return {
                ...state,
                loading: action.payload,
            }
        case VIEW_DESARROLLO_SUCCESS:
            return {
                ...state,
                loading: false,
                desarrollo: action.payload,
                error: false
            }
        case UPDATE_DESARROLLO_SUCCESS:
            return {
                ...state,
                edit: false,
                desarrollo: state.desarrollo.map ( item => item.id === action.payload.id ? item = action.payload : item )
            }
        case DELETE_DESARROLLO_SUCCESS:
            return {
                ...state,
                desarrollo: state.desarrollo.filter( item => item.id !== state.delete ),
                delete: null
            }
        case CLEAN_DESARROLLO:
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