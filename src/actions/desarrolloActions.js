import clientAxios from '../config/axios'
import {
    CREATE_DESARROLLO,
    CREATE_DESARROLLO_SUCCESS,
    CREATE_DESARROLLO_ERROR,
    VIEW_DESARROLLO,
    VIEW_DESARROLLO_SUCCESS,
    VIEW_DESARROLLO_ERROR,
    EDIT_DESARROLLO,
    EDIT_DESARROLLO_SUCCESS,
    EDIT_DESARROLLO_ERROR,
    UPDATE_DESARROLLO,
    UPDATE_DESARROLLO_SUCCESS,
    UPDATE_DESARROLLO_ERROR,
    DELETE_DESARROLLO,
    DELETE_DESARROLLO_SUCCESS,
    DELETE_DESARROLLO_ERROR,
    CLEAN_DESARROLLO,
    REDIRECT,
} from '../types'
import Swal from 'sweetalert2'


// Create 

export function createNewDesarrolloAction(desarrollo, form){
    return async dispatch => {
        dispatch(addDesarrollo())
        await clientAxios.post('/desarrollo', desarrollo)
        .then( async response => {
            await clientAxios.post(`desarrolloPortada/${response.data.desarrollo.id}`, form)
            .then( response => {
                dispatch(addDesarrolloSuccess(response.data.desarrollo))
                dispatch(redirectTo())
            }).catch( error => {
                dispatch(addDesarrolloError(error.response.data))
            }) 
        })
        .catch( error => {
            console.log(error);
            dispatch(addDesarrolloError(error.response.data))
        }) 
    }
}

const addDesarrollo = () => ({
    type: CREATE_DESARROLLO,
    payload: true
})

const addDesarrolloSuccess = payload => ({
    type: CREATE_DESARROLLO_SUCCESS,
    payload
})

const addDesarrolloError = payload => ({
    type: CREATE_DESARROLLO_ERROR,
    payload
}) 


// all desarrollo

export function getDesarrollosAction(){
    return async (dispatch) => {
        dispatch (getDesarrollos())
        await clientAxios.get('/desarrollo')
        .then( response => {
            dispatch(getDesarrollosSuccess(response.data.desarrollo))
        })
        .catch(error => {
            dispatch(getDesarrollosError(error.response.data))
        })
    }
}

const getDesarrollos = () => ({
    type: VIEW_DESARROLLO,
    payload: true
})

const getDesarrollosSuccess = payload => ({
    type: VIEW_DESARROLLO_SUCCESS,
    payload
})

const getDesarrollosError = payload => ({
    type: VIEW_DESARROLLO_ERROR,
    payload 
})


// Get EDIT

export function editDesarrolloAction(id) {
    return async (dispatch) => {
        dispatch(editDesarrollo())
        await clientAxios.get(`/desarrollo/${id}/edit`)
        .then(response =>{
            dispatch(editDesarrolloSuccess(response.data.desarrollo))
        })
        .catch( error => {
            editDesarrolloError(error.response.data)
        })
    }
}


const editDesarrollo = () => ({
    type: EDIT_DESARROLLO,
    payload: true
})

const editDesarrolloSuccess = payload => ({
    type: EDIT_DESARROLLO_SUCCESS,
    payload
})

const editDesarrolloError = payload => ({
    type: EDIT_DESARROLLO_ERROR,
    payload: payload
})


// Update Desarrollo

export function updateDesarrolloAction(desarrollo, form){
    return async dispatch => {
        dispatch(updateDesarrollo())
        await clientAxios.put(`/desarrollo/${desarrollo.id}`, desarrollo)
        .then( async response => {
            await clientAxios.post(`desarrolloPortada/${response.data.desarrollo.id}`, form)
            .then( response => {
                dispatch(updateDesarrolloSuccess(response.data.desarrollo))
                dispatch(redirectTo())
            })
            .catch( error => {
                dispatch(updateDesarrolloError(error.response.data))
            })
        })
        .catch( error => {
            dispatch(updateDesarrolloError(error.response.data))
        })
    }
}

const updateDesarrollo = () => ({
    type: UPDATE_DESARROLLO,
    payload: true
})

const updateDesarrolloSuccess = payload => ({
    type: UPDATE_DESARROLLO_SUCCESS,
    payload
})

const updateDesarrolloError = payload => ({
    type: UPDATE_DESARROLLO_ERROR,
    payload
})


export function deleteDesarrolloAction(id){
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
                dispatch(deleteDesarrollo(id))        
                clientAxios.delete(`/desarrollo/${id}`)
                .then( response => {
                    dispatch(deleteDesarrolloSuccess(response.data.desarrollo))
                    Swal.fire(
                        'Borrado!',
                        'Elemento borrado.',
                        'success'
                      )
                })
                .catch( error => {
                    dispatch(deleteDesarrolloError(error.response.data.message))
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

const deleteDesarrollo = payload => ({
    type: DELETE_DESARROLLO,
    payload
})

const deleteDesarrolloSuccess = payload => ({
    type: DELETE_DESARROLLO_SUCCESS,
    payload
})

const deleteDesarrolloError = payload => ({
    type: DELETE_DESARROLLO_ERROR,
    payload
})

export function cleanDesarrolloAction(){
    return dispatch => {
        dispatch({
            type: CLEAN_DESARROLLO
        })
    }
}

export function redirectTo(){
    return dispatch => {
        dispatch({
            type: REDIRECT,
            payload: "/admin/desarrollos"
        })
    }
}

