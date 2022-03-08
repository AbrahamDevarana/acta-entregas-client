import {
    CREATE_LISTADO,
    CREATE_LISTADO_SUCCESS,
    CREATE_LISTADO_ERROR,
    VIEW_LISTADO,
    VIEW_LISTADO_SUCCESS,
    VIEW_LISTADO_ERROR,
    DELETE_LISTADO,
    DELETE_LISTADO_SUCCESS,
    DELETE_LISTADO_ERROR,
    EDIT_LISTADO,
    EDIT_LISTADO_SUCCESS,
    EDIT_LISTADO_ERROR,
    UPDATE_LISTADO,
    UPDATE_LISTADO_SUCCESS,
    UPDATE_LISTADO_ERROR,
} from '../types'

const initialState = {
    listado: [],
    errors: false,
    loading: false,
    edit: false,
    delete: null
}


export default function foo (state = initialState, action ){
    switch (action.type) {

        case CREATE_LISTADO:
        case EDIT_LISTADO:
        case UPDATE_LISTADO:
            return {
                ...state,
                loading: action.payload, 
            }
        case DELETE_LISTADO:
            return {
                ...state,
                loading: true,
                delete: action.payload,
            }
        case CREATE_LISTADO_SUCCESS:
            return {
                ...state,
                loading: false,
                listado: [...state.listado, action.payload],
                errors: null
            }
        case EDIT_LISTADO_SUCCESS:
            return {
                ...state,
                loading: false,
                errors: null,
                edit: action.payload,
                edition: false
            }
        case CREATE_LISTADO_ERROR:
        case VIEW_LISTADO_ERROR:
        case EDIT_LISTADO_ERROR:
        case DELETE_LISTADO_ERROR:
        case UPDATE_LISTADO_ERROR:
            return {
                ...state,
                loading: false,
                errors: action.payload
            }

        case VIEW_LISTADO:
            return {
                ...state,
                loading: action.payload,
            }
        case VIEW_LISTADO_SUCCESS:
            return {
                ...state,
                loading: false,
                listado: action.payload,
                error: false
            }
        case UPDATE_LISTADO_SUCCESS:
            return {
                ...state,
                edit: false,
                listado: state.listado.map ( item => item.id === action.payload.id ? item = action.payload : item )
            }
        case DELETE_LISTADO_SUCCESS:
            return {
                ...state,
                listado: state.listado.filter( item => item.id !== state.delete ),
                delete: null
            }

        
        
        default: 
            return state
    }
}