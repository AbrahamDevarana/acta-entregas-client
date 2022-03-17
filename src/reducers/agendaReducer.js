import {
    CREATE_AGENDA,
    CREATE_AGENDA_SUCCESS,
    CREATE_AGENDA_ERROR,
    VIEW_AGENDA,
    VIEW_AGENDA_SUCCESS,
    VIEW_AGENDA_ERROR,
    DELETE_AGENDA,
    DELETE_AGENDA_SUCCESS,
    DELETE_AGENDA_ERROR,
    EDIT_AGENDA,
    EDIT_AGENDA_SUCCESS,
    EDIT_AGENDA_ERROR,
    UPDATE_AGENDA,
    UPDATE_AGENDA_SUCCESS,
    UPDATE_AGENDA_ERROR,
    CLEAN_AGENDA,
    REDIRECT
} from '../types'

const initialState = {
    agenda: [],
    errors: false,
    loading: false,
    edit: false,
    delete: null,
    redirectTo: false
}


export default function foo (state = initialState, action ){
    switch (action.type) {

        case CREATE_AGENDA:
        case EDIT_AGENDA:
        case UPDATE_AGENDA:
            return {
                ...state,
                loading: action.payload, 
            }
        case DELETE_AGENDA:
            return {
                ...state,
                loading: true,
                delete: action.payload,
            }
        case CREATE_AGENDA_SUCCESS:
            return {
                ...state,
                loading: false,
                agenda: [...state.agenda, action.payload],
                errors: null
            }
        case EDIT_AGENDA_SUCCESS:
            return {
                ...state,
                loading: false,
                errors: null,
                edit: action.payload,
                edition: false
            }
        case CREATE_AGENDA_ERROR:
        case VIEW_AGENDA_ERROR:
        case EDIT_AGENDA_ERROR:
        case DELETE_AGENDA_ERROR:
        case UPDATE_AGENDA_ERROR:
            return {
                ...state,
                loading: false,
                errors: action.payload
            }

        case VIEW_AGENDA:
            return {
                ...state,
                loading: action.payload,
            }
        case VIEW_AGENDA_SUCCESS:
            return {
                ...state,
                loading: false,
                agenda: action.payload,
                error: false
            }
        case UPDATE_AGENDA_SUCCESS:
            return {
                ...state,
                edit: false,
                agenda: state.agenda.map ( item => item.id === action.payload.id ? item = action.payload : item )
            }
        case DELETE_AGENDA_SUCCESS:
            return {
                ...state,
                agenda: state.agenda.filter( item => item.id !== state.delete ),
                delete: null
            }
        case CLEAN_AGENDA:
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