import {
    CREATE_ETAPA,
    CREATE_ETAPA_SUCCESS,
    CREATE_ETAPA_ERROR,
    VIEW_ETAPA,
    VIEW_ETAPA_SUCCESS,
    VIEW_ETAPA_ERROR,
    DELETE_ETAPA,
    DELETE_ETAPA_SUCCESS,
    DELETE_ETAPA_ERROR,
    EDIT_ETAPA,
    EDIT_ETAPA_SUCCESS,
    EDIT_ETAPA_ERROR,
    UPDATE_ETAPA,
    UPDATE_ETAPA_SUCCESS,
    UPDATE_ETAPA_ERROR,
    UPGRADE_ETAPA,
    UPGRADE_ETAPA_SUCCESS,
    UPGRADE_ETAPA_ERROR,
    CLEAN_ETAPA,
    REDIRECT,
    SET_RELACION_ETAPA_SUCCESS,
    SET_RELACION_ETAPA_ERROR,
    SET_RELACION_ETAPA
} from '../types'

const initialState = {
    etapa: [],
    errors: false,
    loading: false,
    edit: false,
    delete: null,
    redirectTo: false
}


export default function foo (state = initialState, action ){
    switch (action.type) {

        case CREATE_ETAPA:
        case EDIT_ETAPA:
        case UPDATE_ETAPA:
        case UPGRADE_ETAPA:
        case SET_RELACION_ETAPA:
            return {
                ...state,
                loading: action.payload, 
            }
        case DELETE_ETAPA:
            return {
                ...state,
                loading: true,
                delete: action.payload,
            }
        case CREATE_ETAPA_SUCCESS:
            return {
                ...state,
                loading: false,
                etapa: [...state.etapa, action.payload],
                errors: null
            }
        case EDIT_ETAPA_SUCCESS:
            return {
                ...state,
                loading: false,
                errors: null,
                edit: action.payload,
                edition: false
            }
        case CREATE_ETAPA_ERROR:
        case VIEW_ETAPA_ERROR:
        case EDIT_ETAPA_ERROR:
        case DELETE_ETAPA_ERROR:
        case UPDATE_ETAPA_ERROR:
        case UPGRADE_ETAPA_ERROR:
        case SET_RELACION_ETAPA_ERROR:
            return {
                ...state,
                loading: false,
                errors: action.payload
            }

        case VIEW_ETAPA:
            return {
                ...state,
                loading: action.payload,
            }
        case VIEW_ETAPA_SUCCESS:
        case SET_RELACION_ETAPA_SUCCESS:
            return {
                ...state,
                loading: false,
                etapa: action.payload,
                error: false
            }
        case UPDATE_ETAPA_SUCCESS:
            return {
                ...state,
                edit: false,
                etapa: state.etapa.map ( item => item.id === action.payload.id ? item = action.payload : item )
            }

        case UPGRADE_ETAPA_SUCCESS:
            return {
                ...state,
                loading: false,
                etapa: action.payload
            }
        case DELETE_ETAPA_SUCCESS:
            return {
                ...state,
                etapa: state.etapa.filter( item => item.id !== state.delete ),
                delete: null
            }
        case CLEAN_ETAPA:
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