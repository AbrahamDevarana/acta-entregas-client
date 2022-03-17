import clientAxios from '../config/axios'
import {
    CREATE_AGENDA,
    CREATE_AGENDA_SUCCESS,
    CREATE_AGENDA_ERROR,
    VIEW_AGENDA,
    VIEW_AGENDA_SUCCESS,
    VIEW_AGENDA_ERROR,
    EDIT_AGENDA,
    EDIT_AGENDA_SUCCESS,
    EDIT_AGENDA_ERROR,
    UPDATE_AGENDA,
    UPDATE_AGENDA_SUCCESS,
    UPDATE_AGENDA_ERROR,
    DELETE_AGENDA,
    DELETE_AGENDA_SUCCESS,
    DELETE_AGENDA_ERROR,
    CLEAN_AGENDA,
    REDIRECT
} from '../types'
import Swal from 'sweetalert2'
// Create 

export function createNewListadoAction(agenda){
    return dispatch => {
        dispatch(addListado())
        clientAxios.post('agenda', agenda)
        .then( response => {
            dispatch(addListadoSuccess(response.data.agenda))
            dispatch(redirectTo())
        })
        .catch( error => {
            dispatch(addListadoError(error.response.data))
        }) 
    }
}

const addListado = () => ({
    type: CREATE_AGENDA,
    payload: true
})

const addListadoSuccess = payload => ({
    type: CREATE_AGENDA_SUCCESS,
    payload
})

const addListadoError = payload => ({
    type: CREATE_AGENDA_ERROR,
    payload
}) 


// all agenda

export function getAgendaAction(){
    return async (dispatch) => {
        dispatch (getAgenda())
        await clientAxios.get('/agenda')
        .then( response => {
            dispatch(getAgendaSuccess(response.data.agenda))
        })
        .catch(error => {
            dispatch(getAgendaError(error.response.data))
        })
    }
}

const getAgenda = () => ({
    type: VIEW_AGENDA,
    payload: true
})

const getAgendaSuccess = payload => ({
    type: VIEW_AGENDA_SUCCESS,
    payload
})

const getAgendaError = payload => ({
    type: VIEW_AGENDA_ERROR,
    payload
})


// Get EDIT

export function editListadoAction(id) {
    return async (dispatch) => {
        dispatch(editListado())
        await clientAxios.get(`/agenda/${id}/edit`)
        .then(response =>{
            dispatch(editListadoSuccess(response.data.agenda))
        })
        .catch( error => {
            editListadoError(error.response.data)
        })
    }
}


const editListado = () => ({
    type: EDIT_AGENDA,
    payload: true
})

const editListadoSuccess = payload => ({
    type: EDIT_AGENDA_SUCCESS,
    payload
})

const editListadoError = payload => ({
    type: EDIT_AGENDA_ERROR,
    payload: payload
})


// Update Listado

export function updateListadoAction(agenda){
    return async dispatch => {
        dispatch(updateListado())
        await clientAxios.put(`/agenda/${agenda.id}`, agenda)
        .then( response => {
            dispatch(updateListadoSuccess(response.data.agenda))
            dispatch(redirectTo())
        })
        .catch( error => {
            dispatch(updateListadoError(error.response.data))
        })
    }
}

const updateListado = () => ({
    type: UPDATE_AGENDA,
    payload: true
})

const updateListadoSuccess = payload => ({
    type: UPDATE_AGENDA_SUCCESS,
    payload
})

const updateListadoError = payload => ({
    type: UPDATE_AGENDA_ERROR,
    payload
})


export function deleteListadoAction(id){
    return async dispatch => {
        await Swal.fire({
            title: 'Estás seguro(a) ?',
            text: "Esta acción no se podrá revertir !",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Se ha borrado!'
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteListado(id))        
                clientAxios.delete(`/agenda/${id}`)
                .then( response => {
                    dispatch(deleteListadoSuccess(response.data.agenda))
                    Swal.fire(
                        'Borrado!',
                        'Elemento borrado.',
                        'success'
                      )
                })
                .catch( error => {
                    dispatch(deleteListadoError(error.response.data.message))
                    Swal.fire(
                        'Error!',
                        'Hubo un problema al borrar.',
                        'error'
                      )
                })
            }
          })
        
    }
}

const deleteListado = payload => ({
    type: DELETE_AGENDA,
    payload
})

const deleteListadoSuccess = payload => ({
    type: DELETE_AGENDA_SUCCESS,
    payload
})

const deleteListadoError = payload => ({
    type: DELETE_AGENDA_ERROR,
    payload
})

export function cleanListadoAction(){
    return dispatch => {
        dispatch({
            type: CLEAN_AGENDA
        })
    }
}

export function redirectTo(){
    return dispatch => {
        dispatch({
            type: REDIRECT,
            payload: "/admin/agenda"
        })
    }
}