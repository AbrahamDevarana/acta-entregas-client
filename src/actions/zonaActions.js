import clientAxios from '../config/axios'
import {
    CREATE_ZONA,
    CREATE_ZONA_SUCCESS,
    CREATE_ZONA_ERROR,
    VIEW_ZONA,
    VIEW_ZONA_SUCCESS,
    VIEW_ZONA_ERROR,
    EDIT_ZONA,
    EDIT_ZONA_SUCCESS,
    EDIT_ZONA_ERROR,
    UPDATE_ZONA,
    UPDATE_ZONA_SUCCESS,
    UPDATE_ZONA_ERROR,
    DELETE_ZONA,
    DELETE_ZONA_SUCCESS,
    DELETE_ZONA_ERROR,
    CLEAN_ZONA,
    REDIRECT
} from '../types'
import Swal from 'sweetalert2'

// Create 

export function createNewZonaAction(zona){
    return dispatch => {
        dispatch(addZona())
        clientAxios.post('zona', zona)
        .then( response => {
            dispatch(addZonaSuccess(response.data.zona))
            dispatch(redirectTo())
        })
        .catch( error => {
            dispatch(addZonaError(error.response.data))
        }) 
    }
}

const addZona = () => ({
    type: CREATE_ZONA,
    payload: true
})

const addZonaSuccess = payload => ({
    type: CREATE_ZONA_SUCCESS,
    payload
})

const addZonaError = payload => ({
    type: CREATE_ZONA_ERROR,
    payload
}) 


// all zona

export function getZonasAction(){
    return async (dispatch) => {
        dispatch (getZonas())
        await clientAxios.get('/zona')
        .then( response => {
            dispatch(getZonasSuccess(response.data.zona))
        })
        .catch(error => {
            dispatch(getZonasError(error.response.data))
        })
    }
}

const getZonas = () => ({
    type: VIEW_ZONA,
    payload: true
})

const getZonasSuccess = payload => ({
    type: VIEW_ZONA_SUCCESS,
    payload
})

const getZonasError = payload => ({
    type: VIEW_ZONA_ERROR,
    payload
})


// all zona

export function getZonaAction(id){
    return async (dispatch) => {
        dispatch (getZona())
        await clientAxios.get(`zona/${id}`)
        .then( response => {
            dispatch(getZonaSuccess(response.data.zona))
        })
        .catch(error => {
            dispatch(getZonaError(error.response.data))
        })
    }
}

const getZona = () => ({
    type: VIEW_ZONA,
    payload: true
})

const getZonaSuccess = payload => ({
    type: VIEW_ZONA_SUCCESS,
    payload
})

const getZonaError = payload => ({
    type: VIEW_ZONA_ERROR,
    payload
})


// Get EDIT

export function editZonaAction(id) {
    return async (dispatch) => {
        dispatch(editZona())
        await clientAxios.get(`/zona/${id}/edit`)
        .then(response =>{
            dispatch(editZonaSuccess(response.data.zona))
        })
        .catch( error => {
            editZonaError(error.response.data)
        })
    }
}


const editZona = () => ({
    type: EDIT_ZONA,
    payload: true
})

const editZonaSuccess = payload => ({
    type: EDIT_ZONA_SUCCESS,
    payload
})

const editZonaError = payload => ({
    type: EDIT_ZONA_ERROR,
    payload: payload
})


// Update Zona

export function updateZonaAction(zona){
    return async dispatch => {
        console.log(zona);
        dispatch(updateZona())
        await clientAxios.put(`/zona/${zona.id}`, zona)
        .then( response => {
            dispatch(updateZonaSuccess(response.data.zona))
            dispatch(redirectTo())
        })
        .catch( error => {
            dispatch(updateZonaError(error.response.data))
        })
    }
}

const updateZona = () => ({
    type: UPDATE_ZONA,
    payload: true
})

const updateZonaSuccess = payload => ({
    type: UPDATE_ZONA_SUCCESS,
    payload
})

const updateZonaError = payload => ({
    type: UPDATE_ZONA_ERROR,
    payload
})


export function deleteZonaAction(id){
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
                dispatch(deleteZona(id))        
                clientAxios.delete(`/zona/${id}`)
                .then( response => {
                    dispatch(deleteZonaSuccess(response.data.zona))
                    Swal.fire(
                        'Borrado!',
                        'Elemento borrado.',
                        'success'
                      )
                })
                .catch( error => {
                    dispatch(deleteZonaError(error.response.data.message))
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

const deleteZona = payload => ({
    type: DELETE_ZONA,
    payload
})

const deleteZonaSuccess = payload => ({
    type: DELETE_ZONA_SUCCESS,
    payload
})

const deleteZonaError = payload => ({
    type: DELETE_ZONA_ERROR,
    payload
})

export function cleanZonaAction(){
    return dispatch => {
        dispatch({
            type: CLEAN_ZONA
        })
    }
}

export function redirectTo(){
    return dispatch => {
        dispatch({
            type: REDIRECT,
            payload: "/admin/zona"
        })
    }
}