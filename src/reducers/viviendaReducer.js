import {
    VIEW_VIVIENDA,
    VIEW_VIVIENDA_SUCCESS,
    VIEW_VIVIENDA_ERROR,
    DELETE_VIVIENDA,
    DELETE_VIVIENDA_SUCCESS,
    DELETE_VIVIENDA_ERROR,
    EDIT_VIVIENDA,
    EDIT_VIVIENDA_SUCCESS,
    EDIT_VIVIENDA_ERROR,
    UPDATE_VIVIENDA,
    UPDATE_VIVIENDA_SUCCESS,
    UPDATE_VIVIENDA_ERROR,
    CLEAN_VIVIENDA,
    REDIRECT,

} from '../types'

const initialState = {
    vivienda: [],
    errors: false,
    loading: false,
    edit: false,
    delete: null,
    redirectTo: false,
    seccionDpto:[]
}


export default function foo (state = initialState, action ){
    switch (action.type) {
        case EDIT_VIVIENDA:
        case UPDATE_VIVIENDA:
            return {
                ...state,
                loading: action.payload, 
            }
        case DELETE_VIVIENDA:
            return {
                ...state,
                loading: true,
                delete: action.payload,
            }
        case EDIT_VIVIENDA_SUCCESS:
            return {
                ...state,
                loading: false,
                errors: null,
                edit: action.payload,
                edition: false
            }
        case VIEW_VIVIENDA_ERROR:
        case EDIT_VIVIENDA_ERROR:
        case DELETE_VIVIENDA_ERROR:
        case UPDATE_VIVIENDA_ERROR:
            return {
                ...state,
                loading: false,
                errors: action.payload
            }

        case VIEW_VIVIENDA:
            return {
                ...state,
                loading: action.payload,
            }
        case VIEW_VIVIENDA_SUCCESS:
            return {
                ...state,
                loading: false,
                vivienda: action.payload,
                error: false
            }
        case UPDATE_VIVIENDA_SUCCESS:
            return {
                ...state,
                edit: false,
                vivienda: state.vivienda.map ( item => item.id === action.payload.id ? item = action.payload : item )
            }
        case DELETE_VIVIENDA_SUCCESS:
            return {
                ...state,
                vivienda: state.vivienda.filter( item => item.id !== state.delete ),
                delete: null
            }
        case CLEAN_VIVIENDA:
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