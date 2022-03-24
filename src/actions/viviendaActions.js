import clientAxios from '../config/axios'
import {
    VIEW_VIVIENDA,
    VIEW_VIVIENDA_SUCCESS,
    VIEW_VIVIENDA_ERROR,
    EDIT_VIVIENDA,
    EDIT_VIVIENDA_SUCCESS,
    EDIT_VIVIENDA_ERROR,
    UPDATE_VIVIENDA,
    UPDATE_VIVIENDA_SUCCESS,
    UPDATE_VIVIENDA_ERROR,
    DELETE_VIVIENDA,
    DELETE_VIVIENDA_SUCCESS,
    DELETE_VIVIENDA_ERROR,
    CLEAN_VIVIENDA,
    REDIRECT,

    VIVIENDA_SECCION,
    VIVIENDA_SECCION_SUCCESS,
    VIVIENDA_SECCION_ERROR
} from '../types'
import Swal from 'sweetalert2'




// all vivienda

export function getViviendasAction(){
    return async (dispatch) => {
        dispatch (getVivienda())
        await clientAxios.get('/vivienda')
        .then( response => {
            dispatch(getViviendaSuccess(response.data.vivienda))
        })
        .catch(error => {
            dispatch(getViviendaError(error.response.data))
        })
    }
}

const getVivienda = () => ({
    type: VIEW_VIVIENDA,
    payload: true
})

const getViviendaSuccess = payload => ({
    type: VIEW_VIVIENDA_SUCCESS,
    payload
})

const getViviendaError = payload => ({
    type: VIEW_VIVIENDA_ERROR,
    payload
})


// Get EDIT

export function editViviendaAction(id) {
    return async (dispatch) => {
        dispatch(editVivienda())
        await clientAxios.get(`/vivienda/${id}/edit`)
        .then(response =>{
            dispatch(editViviendaSuccess(response.data.vivienda))
        })
        .catch( error => {
            editViviendaError(error.response.data)
        })
    }
}


const editVivienda = () => ({
    type: EDIT_VIVIENDA,
    payload: true
})

const editViviendaSuccess = payload => ({
    type: EDIT_VIVIENDA_SUCCESS,
    payload
})

const editViviendaError = payload => ({
    type: EDIT_VIVIENDA_ERROR,
    payload: payload
})


// Update Vivienda

export function updateViviendaAction(vivienda){
    return async dispatch => {
        dispatch(updateVivienda())
        await clientAxios.put(`/vivienda/${vivienda.id}`, vivienda)
        .then( response => {
            dispatch(updateViviendaSuccess(response.data.vivienda))
            dispatch(redirectTo())
        })
        .catch( error => {
            dispatch(updateViviendaError(error.response.data))
        })
    }
}

const updateVivienda = () => ({
    type: UPDATE_VIVIENDA,
    payload: true
})

const updateViviendaSuccess = payload => ({
    type: UPDATE_VIVIENDA_SUCCESS,
    payload
})

const updateViviendaError = payload => ({
    type: UPDATE_VIVIENDA_ERROR,
    payload
})


export function deleteViviendaAction(id){
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
                dispatch(deleteVivienda(id))        
                clientAxios.delete(`/vivienda/${id}`)
                .then( response => {
                    dispatch(deleteViviendaSuccess(response.data.vivienda))
                    Swal.fire(
                        'Borrado!',
                        'Elemento borrado.',
                        'success'
                      )
                })
                .catch( error => {
                    dispatch(deleteViviendaError(error.response.data.message))
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

const deleteVivienda = payload => ({
    type: DELETE_VIVIENDA,
    payload
})

const deleteViviendaSuccess = payload => ({
    type: DELETE_VIVIENDA_SUCCESS,
    payload
})

const deleteViviendaError = payload => ({
    type: DELETE_VIVIENDA_ERROR,
    payload
})





// Utils

export function cleanViviendaAction(){
    return dispatch => {
        dispatch({
            type: CLEAN_VIVIENDA
        })
    }
}

export function redirectTo(){
    return dispatch => {
        dispatch({
            type: REDIRECT,
            payload: "/admin/vivienda"
        })
    }
}