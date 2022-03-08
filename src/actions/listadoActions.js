import clientAxios from '../config/axios'
import {
    CREATE_LISTADO,
    CREATE_LISTADO_SUCCESS,
    CREATE_LISTADO_ERROR,
    VIEW_LISTADO,
    VIEW_LISTADO_SUCCESS,
    VIEW_LISTADO_ERROR,
    EDIT_LISTADO,
    EDIT_LISTADO_SUCCESS,
    EDIT_LISTADO_ERROR,
    UPDATE_LISTADO,
    UPDATE_LISTADO_SUCCESS,
    UPDATE_LISTADO_ERROR,
    DELETE_LISTADO,
    DELETE_LISTADO_SUCCESS,
    DELETE_LISTADO_ERROR,
} from '../types'
import Swal from 'sweetalert2'


// Create 

export function createNewListadoAction(listado){
    return dispatch => {
        dispatch(addListado())
        clientAxios.post('listado', listado)
        .then( response => {
            dispatch(addListadoSuccess(response.data.listado))
        })
        .catch( error => {
            dispatch(addListadoError(error.response.data))
        }) 
    }
}

const addListado = () => ({
    type: CREATE_LISTADO,
    payload: true
})

const addListadoSuccess = payload => ({
    type: CREATE_LISTADO_SUCCESS,
    payload
})

const addListadoError = payload => ({
    type: CREATE_LISTADO_ERROR,
    payload
}) 


// all listado

export function getListadosAction(){
    return async (dispatch) => {
        dispatch (getListados())
        await clientAxios.get('/listado')
        .then( response => {
            dispatch(getListadosSuccess(response.data.listado))
        })
        .catch(error => {
            dispatch(getListadosError(error.response.data))
        })
    }
}

const getListados = () => ({
    type: VIEW_LISTADO,
    payload: true
})

const getListadosSuccess = payload => ({
    type: VIEW_LISTADO_SUCCESS,
    payload
})

const getListadosError = payload => ({
    type: VIEW_LISTADO_ERROR,
    payload
})


// Get EDIT

export function editListadoAction(id) {
    return async (dispatch) => {
        dispatch(editListado())
        await clientAxios.get(`/listado/${id}/edit`)
        .then(response =>{
            dispatch(editListadoSuccess(response.data.listado))
        })
        .catch( error => {
            editListadoError(error.response.data)
        })
    }
}


const editListado = () => ({
    type: EDIT_LISTADO,
    payload: true
})

const editListadoSuccess = payload => ({
    type: EDIT_LISTADO_SUCCESS,
    payload
})

const editListadoError = payload => ({
    type: EDIT_LISTADO_ERROR,
    payload: payload
})


// Update Listado

export function updateListadoAction(listado){
    return async dispatch => {
        dispatch(updateListado())
        await clientAxios.put(`/listado/${listado.id}`, listado)
        .then( response => {
            dispatch(updateListadoSuccess(response.data.listado))
        })
        .catch( error => {
            dispatch(updateListadoError(error.response.data))
        })
    }
}

const updateListado = () => ({
    type: UPDATE_LISTADO,
    payload: true
})

const updateListadoSuccess = payload => ({
    type: UPDATE_LISTADO_SUCCESS,
    payload
})

const updateListadoError = payload => ({
    type: UPDATE_LISTADO_ERROR,
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
                clientAxios.delete(`/listado/${id}`)
                .then( response => {
                    dispatch(deleteListadoSuccess(response.data.listado))
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
    type: DELETE_LISTADO,
    payload
})

const deleteListadoSuccess = payload => ({
    type: DELETE_LISTADO_SUCCESS,
    payload
})

const deleteListadoError = payload => ({
    type: DELETE_LISTADO_ERROR,
    payload
})