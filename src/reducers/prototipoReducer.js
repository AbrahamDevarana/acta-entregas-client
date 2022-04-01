import {
    CREATE_PROTOTIPO,
    CREATE_PROTOTIPO_SUCCESS,
    CREATE_PROTOTIPO_ERROR,
    VIEW_PROTOTIPO,
    VIEW_PROTOTIPO_SUCCESS,
    VIEW_PROTOTIPO_ERROR,
    DELETE_PROTOTIPO,
    DELETE_PROTOTIPO_SUCCESS,
    DELETE_PROTOTIPO_ERROR,
    EDIT_PROTOTIPO,
    EDIT_PROTOTIPO_SUCCESS,
    EDIT_PROTOTIPO_ERROR,
    UPDATE_PROTOTIPO,
    UPDATE_PROTOTIPO_SUCCESS,
    UPDATE_PROTOTIPO_ERROR,
    CLEAN_PROTOTIPO,
    REDIRECT
} from '../types'

const initialState = {
    prototipo: [],
    errors: false,
    loading: false,
    edit: false,
    delete: null,
    redirectTo: false
}


export default function foo (state = initialState, action ){
    switch (action.type) {

        case CREATE_PROTOTIPO:
        case EDIT_PROTOTIPO:
        case UPDATE_PROTOTIPO:
            return {
                ...state,
                loading: action.payload, 
            }
        case DELETE_PROTOTIPO:
            return {
                ...state,
                loading: true,
                delete: action.payload,
            }
        case CREATE_PROTOTIPO_SUCCESS:
            return {
                ...state,
                loading: false,
                prototipo: [...state.prototipo, action.payload],
                errors: null
            }
        case EDIT_PROTOTIPO_SUCCESS:
            return {
                ...state,
                loading: false,
                errors: null,
                edit: action.payload,
                edition: false
            }
        case CREATE_PROTOTIPO_ERROR:
        case VIEW_PROTOTIPO_ERROR:
        case EDIT_PROTOTIPO_ERROR:
        case DELETE_PROTOTIPO_ERROR:
        case UPDATE_PROTOTIPO_ERROR:
            return {
                ...state,
                loading: false,
                errors: action.payload
            }

        case VIEW_PROTOTIPO:
            return {
                ...state,
                loading: action.payload,
            }
        case VIEW_PROTOTIPO_SUCCESS:
            return {
                ...state,
                loading: false,
                prototipo: action.payload,
                error: false
            }
        case UPDATE_PROTOTIPO_SUCCESS:
            return {
                ...state,
                edit: false,
                loading: false,
                prototipo: state.prototipo.map ( item => item.id === action.payload.id ? item = action.payload : item )
            }
        case DELETE_PROTOTIPO_SUCCESS:
            return {
                ...state,
                prototipo: state.prototipo.filter( item => item.id !== state.delete ),
                delete: null
            }
        case CLEAN_PROTOTIPO:
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