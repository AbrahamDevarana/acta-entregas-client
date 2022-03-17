import {
    VIEW_DEPARTAMENTO,
    VIEW_DEPARTAMENTO_SUCCESS,
    VIEW_DEPARTAMENTO_ERROR,
    DELETE_DEPARTAMENTO,
    DELETE_DEPARTAMENTO_SUCCESS,
    DELETE_DEPARTAMENTO_ERROR,
    EDIT_DEPARTAMENTO,
    EDIT_DEPARTAMENTO_SUCCESS,
    EDIT_DEPARTAMENTO_ERROR,
    UPDATE_DEPARTAMENTO,
    UPDATE_DEPARTAMENTO_SUCCESS,
    UPDATE_DEPARTAMENTO_ERROR,
    CLEAN_DEPARTAMENTO,
    REDIRECT,

    DEPARTAMENTO_SECCION,
    DEPARTAMENTO_SECCION_SUCCESS,
    DEPARTAMENTO_SECCION_ERROR
} from '../types'

const initialState = {
    departamento: [],
    errors: false,
    loading: false,
    edit: false,
    delete: null,
    redirectTo: false,
    seccionDpto:[]
}


export default function foo (state = initialState, action ){
    switch (action.type) {
        case EDIT_DEPARTAMENTO:
        case UPDATE_DEPARTAMENTO:
            return {
                ...state,
                loading: action.payload, 
            }
        case DELETE_DEPARTAMENTO:
            return {
                ...state,
                loading: true,
                delete: action.payload,
            }
        case EDIT_DEPARTAMENTO_SUCCESS:
            return {
                ...state,
                loading: false,
                errors: null,
                edit: action.payload,
                edition: false
            }
        case VIEW_DEPARTAMENTO_ERROR:
        case EDIT_DEPARTAMENTO_ERROR:
        case DELETE_DEPARTAMENTO_ERROR:
        case UPDATE_DEPARTAMENTO_ERROR:
        case DEPARTAMENTO_SECCION_ERROR:
            return {
                ...state,
                loading: false,
                errors: action.payload
            }

        case VIEW_DEPARTAMENTO:
        case DEPARTAMENTO_SECCION:
            return {
                ...state,
                loading: action.payload,
            }
        case VIEW_DEPARTAMENTO_SUCCESS:
            return {
                ...state,
                loading: false,
                departamento: action.payload,
                error: false
            }
        case DEPARTAMENTO_SECCION_SUCCESS:
            return{
                ...state,
                loading: false,
                seccionDpto: action.payload,
                error:false
            }
        case UPDATE_DEPARTAMENTO_SUCCESS:
            return {
                ...state,
                edit: false,
                departamento: state.departamento.map ( item => item.id === action.payload.id ? item = action.payload : item )
            }
        case DELETE_DEPARTAMENTO_SUCCESS:
            return {
                ...state,
                departamento: state.departamento.filter( item => item.id !== state.delete ),
                delete: null
            }
        case CLEAN_DEPARTAMENTO:
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