import clientAxios from '../config/axios'
import {
    VIEW_RESIDENCIA,
    VIEW_RESIDENCIA_SUCCESS,
    VIEW_RESIDENCIA_ERROR,
    EDIT_RESIDENCIA,
    EDIT_RESIDENCIA_SUCCESS,
    EDIT_RESIDENCIA_ERROR,
    UPDATE_RESIDENCIA,
    UPDATE_RESIDENCIA_SUCCESS,
    UPDATE_RESIDENCIA_ERROR,
    DELETE_RESIDENCIA,
    DELETE_RESIDENCIA_SUCCESS,
    DELETE_RESIDENCIA_ERROR,
    CLEAN_RESIDENCIA,
    REDIRECT,

    RESIDENCIA_SECCION,
    RESIDENCIA_SECCION_SUCCESS,
    RESIDENCIA_SECCION_ERROR
} from '../types'
import Swal from 'sweetalert2'




// all residencia

export function getResidenciasAction(){
    return async (dispatch) => {
        dispatch (getResidencia())
        await clientAxios.get('/residencia')
        .then( response => {
            dispatch(getResidenciaSuccess(response.data.residencia))
        })
        .catch(error => {
            dispatch(getResidenciaError(error.response.data))
        })
    }
}

const getResidencia = () => ({
    type: VIEW_RESIDENCIA,
    payload: true
})

const getResidenciaSuccess = payload => ({
    type: VIEW_RESIDENCIA_SUCCESS,
    payload
})

const getResidenciaError = payload => ({
    type: VIEW_RESIDENCIA_ERROR,
    payload
})


// Get EDIT

export function editResidenciaAction(id) {
    return async (dispatch) => {
        dispatch(editResidencia())
        await clientAxios.get(`/residencia/${id}/edit`)
        .then(response =>{
            dispatch(editResidenciaSuccess(response.data.residencia))
        })
        .catch( error => {
            editResidenciaError(error.response.data)
        })
    }
}


const editResidencia = () => ({
    type: EDIT_RESIDENCIA,
    payload: true
})

const editResidenciaSuccess = payload => ({
    type: EDIT_RESIDENCIA_SUCCESS,
    payload
})

const editResidenciaError = payload => ({
    type: EDIT_RESIDENCIA_ERROR,
    payload: payload
})


// Update Residencia

export function updateResidenciaAction(residencia){
    return async dispatch => {
        dispatch(updateResidencia())
        await clientAxios.put(`/residencia/${residencia.residencia_id}`, residencia)
        .then( response => {
            dispatch(updateResidenciaSuccess(response.data.residencia))
            // dispatch(redirectTo())
        })
        .catch( error => {
            dispatch(updateResidenciaError(error.response.data))
        })
    }
}

const updateResidencia = () => ({
    type: UPDATE_RESIDENCIA,
    payload: true
})

const updateResidenciaSuccess = payload => ({
    type: UPDATE_RESIDENCIA_SUCCESS,
    payload
})

const updateResidenciaError = payload => ({
    type: UPDATE_RESIDENCIA_ERROR,
    payload
})


export function deleteResidenciaAction(id){
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
                dispatch(deleteResidencia(id))        
                clientAxios.delete(`/residencia/${id}`)
                .then( response => {
                    dispatch(deleteResidenciaSuccess(response.data.residencia))
                    Swal.fire(
                        'Borrado!',
                        'Elemento borrado.',
                        'success'
                      )
                })
                .catch( error => {
                    dispatch(deleteResidenciaError(error.response.data.message))
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

const deleteResidencia = payload => ({
    type: DELETE_RESIDENCIA,
    payload
})

const deleteResidenciaSuccess = payload => ({
    type: DELETE_RESIDENCIA_SUCCESS,
    payload
})

const deleteResidenciaError = payload => ({
    type: DELETE_RESIDENCIA_ERROR,
    payload
})





// Utils

export function cleanResidenciaAction(){
    return dispatch => {
        dispatch({
            type: CLEAN_RESIDENCIA
        })
    }
}

export function redirectTo(){
    return dispatch => {
        dispatch({
            type: REDIRECT,
            payload: "/admin/residencia"
        })
    }
}