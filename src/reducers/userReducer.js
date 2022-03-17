import {
    CREATE_USUARIO,
    CREATE_USUARIO_SUCCESS,
    CREATE_USUARIO_ERROR,
    VIEW_USUARIO,
    VIEW_USUARIO_SUCCESS,
    VIEW_USUARIO_ERROR,
    DELETE_USUARIO,
    DELETE_USUARIO_SUCCESS,
    DELETE_USUARIO_ERROR,
    EDIT_USUARIO,
    EDIT_USUARIO_SUCCESS,
    EDIT_USUARIO_ERROR,
    UPDATE_USUARIO,
    UPDATE_USUARIO_SUCCESS,
    UPDATE_USUARIO_ERROR,
    CLEAN_USUARIO,
    REDIRECT
} from '../types'

const initialState = {
    usuarios: [],
    errors: false,
    loading: false,
    edit: false,
    delete: null,
    redirectTo: false
}


export default function foo (state = initialState, action ){
    switch (action.type) {

        case CREATE_USUARIO:
        case EDIT_USUARIO:
        case UPDATE_USUARIO:
            return {
                ...state,
                loading: action.payload, 
            }
        case DELETE_USUARIO:
            return {
                ...state,
                loading: true,
                delete: action.payload,
            }
        case CREATE_USUARIO_SUCCESS:
            return {
                ...state,
                loading: false,
                usuarios: [...state.usuarios, action.payload],
                errors: false
            }
        case EDIT_USUARIO_SUCCESS:
            return {
                ...state,
                loading: false,
                errors: false,
                edit: action.payload,
                edition: false
            }
        case CREATE_USUARIO_ERROR:
        case VIEW_USUARIO_ERROR:
        case EDIT_USUARIO_ERROR:
        case DELETE_USUARIO_ERROR:
        case UPDATE_USUARIO_ERROR:
            return {
                ...state,
                loading: false,
                errors: action.payload
            }

        case VIEW_USUARIO:
            return {
                ...state,
                loading: action.payload,
            }
        case VIEW_USUARIO_SUCCESS:
            return {
                ...state,
                loading: false,
                usuarios: action.payload,
                error: false
            }
        case UPDATE_USUARIO_SUCCESS:
            return {
                ...state,
                edit: false,
                usuarios: state.usuarios.map ( item => item.id === action.payload.id ? item = action.payload : item )
            }
        case DELETE_USUARIO_SUCCESS:
            return {
                ...state,
                usuarios: state.usuarios.filter( item => item.id !== state.delete ),
                delete: null
            }
        case CLEAN_USUARIO:
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