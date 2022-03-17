import clientAxios from '../config/axios'
import {
    CREATE_SECCION,
    CREATE_SECCION_SUCCESS,
    CREATE_SECCION_ERROR,
    VIEW_SECCION,
    VIEW_SECCION_SUCCESS,
    VIEW_SECCION_ERROR,
    EDIT_SECCION,
    EDIT_SECCION_SUCCESS,
    EDIT_SECCION_ERROR,
    UPDATE_SECCION,
    UPDATE_SECCION_SUCCESS,
    UPDATE_SECCION_ERROR,
    DELETE_SECCION,
    DELETE_SECCION_SUCCESS,
    DELETE_SECCION_ERROR,
    CLEAN_SECCION,
    REDIRECT
} from '../types'
import Swal from 'sweetalert2'

// Create 

export function createNewSeccionAction(seccion){
    return dispatch => {
        dispatch(addSeccion())
        clientAxios.post('seccion', seccion)
        .then( response => {
            dispatch(addSeccionSuccess(response.data.seccion))
            dispatch(redirectTo())
        })
        .catch( error => {
            dispatch(addSeccionError(error.response.data))
        }) 
    }
}

const addSeccion = () => ({
    type: CREATE_SECCION,
    payload: true
})

const addSeccionSuccess = payload => ({
    type: CREATE_SECCION_SUCCESS,
    payload
})

const addSeccionError = payload => ({
    type: CREATE_SECCION_ERROR,
    payload
}) 


// all seccion

export function getSeccionesAction(){
    return async (dispatch) => {
        dispatch (getSecciones())
        await clientAxios.get('/seccion')
        .then( response => {
            dispatch(getSeccionesSuccess(response.data.seccion))
        })
        .catch(error => {
            dispatch(getSeccionesError(error.response.data))
        })
    }
}

const getSecciones = () => ({
    type: VIEW_SECCION,
    payload: true
})

const getSeccionesSuccess = payload => ({
    type: VIEW_SECCION_SUCCESS,
    payload
})

const getSeccionesError = payload => ({
    type: VIEW_SECCION_ERROR,
    payload
})


// Get EDIT

export function editSeccionAction(id) {
    return async (dispatch) => {
        dispatch(editSeccion())
        await clientAxios.get(`/seccion/${id}/edit`)
        .then(response =>{
            dispatch(editSeccionSuccess(response.data.seccion))
        })
        .catch( error => {
            editSeccionError(error.response.data)
        })
    }
}


const editSeccion = () => ({
    type: EDIT_SECCION,
    payload: true
})

const editSeccionSuccess = payload => ({
    type: EDIT_SECCION_SUCCESS,
    payload
})

const editSeccionError = payload => ({
    type: EDIT_SECCION_ERROR,
    payload: payload
})


// Update Seccion

export function updateSeccionAction(seccion){
    return async dispatch => {
        console.log(seccion);
        dispatch(updateSeccion())
        await clientAxios.put(`/seccion/${seccion.id}`, seccion)
        .then( response => {
            dispatch(updateSeccionSuccess(response.data.seccion))
            dispatch(redirectTo())
        })
        .catch( error => {
            dispatch(updateSeccionError(error.response.data))
        })
    }
}

const updateSeccion = () => ({
    type: UPDATE_SECCION,
    payload: true
})

const updateSeccionSuccess = payload => ({
    type: UPDATE_SECCION_SUCCESS,
    payload
})

const updateSeccionError = payload => ({
    type: UPDATE_SECCION_ERROR,
    payload
})


export function deleteSeccionAction(id){
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
                dispatch(deleteSeccion(id))        
                clientAxios.delete(`/seccion/${id}`)
                .then( response => {
                    dispatch(deleteSeccionSuccess(response.data.seccion))
                    Swal.fire(
                        'Borrado!',
                        'Elemento borrado.',
                        'success'
                      )
                })
                .catch( error => {
                    dispatch(deleteSeccionError(error.response.data.message))
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

const deleteSeccion = payload => ({
    type: DELETE_SECCION,
    payload
})

const deleteSeccionSuccess = payload => ({
    type: DELETE_SECCION_SUCCESS,
    payload
})

const deleteSeccionError = payload => ({
    type: DELETE_SECCION_ERROR,
    payload
})

export function cleanSeccionAction(){
    return dispatch => {
        dispatch({
            type: CLEAN_SECCION
        })
    }
}

export function redirectTo(){
    return dispatch => {
        dispatch({
            type: REDIRECT,
            payload: "/admin/seccion"
        })
    }
}