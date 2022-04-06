import clientAxios from '../config/axios'
import {
    CREATE_PROTOTIPO,
    CREATE_PROTOTIPO_SUCCESS,
    CREATE_PROTOTIPO_ERROR,
    VIEW_PROTOTIPO,
    VIEW_PROTOTIPO_SUCCESS,
    VIEW_PROTOTIPO_ERROR,
    EDIT_PROTOTIPO,
    EDIT_PROTOTIPO_SUCCESS,
    EDIT_PROTOTIPO_ERROR,
    UPDATE_PROTOTIPO,
    UPDATE_PROTOTIPO_SUCCESS,
    UPDATE_PROTOTIPO_ERROR,
    DELETE_PROTOTIPO,
    DELETE_PROTOTIPO_SUCCESS,
    DELETE_PROTOTIPO_ERROR,
    CLEAN_PROTOTIPO,
    REDIRECT,
    SET_RELACION_PROTOTIPO_SUCCESS,
    SET_RELACION_PROTOTIPO_ERROR,
    SET_RELACION_PROTOTIPO
} from '../types'
import Swal from 'sweetalert2'


// Create 

export function createNewPrototipoAction(prototipo, form){
    return async dispatch => {
        dispatch(addPrototipo())
        await clientAxios.post('prototipo', prototipo)
        .then( async response => {
            await clientAxios.post(`prototipo/plano/${response.data.prototipo.id}`, form)
            .then( response => {
                dispatch(addPrototipoSuccess(response.data.prototipo))
                dispatch(redirectTo())
            })
            .catch( error => {
                dispatch(addPrototipoError(error.response.data))
            }) 
        })
        .catch( error => {
            dispatch(addPrototipoError(error.response.data))
        }) 
    }
}

const addPrototipo = () => ({
    type: CREATE_PROTOTIPO,
    payload: true
})

const addPrototipoSuccess = payload => ({
    type: CREATE_PROTOTIPO_SUCCESS,
    payload
})

const addPrototipoError = payload => ({
    type: CREATE_PROTOTIPO_ERROR,
    payload
}) 


// all prototipo

export function getPrototiposAction(){
    return async (dispatch) => {
        dispatch (getPrototipos())
        await clientAxios.get('/prototipo')
        .then( response => {
            dispatch(getPrototiposSuccess(response.data.prototipo))
        })
        .catch(error => {
            dispatch(getPrototiposError(error.response.data))
        })
    }
}

const getPrototipos = () => ({
    type: VIEW_PROTOTIPO,
    payload: true
})

const getPrototiposSuccess = payload => ({
    type: VIEW_PROTOTIPO_SUCCESS,
    payload
})

const getPrototiposError = payload => ({
    type: VIEW_PROTOTIPO_ERROR,
    payload
})


// one prototipo

export function getPrototipoAction(id){
    return async (dispatch) => {
        dispatch (getPrototipo())
        await clientAxios.get(`prototipo/${id}`)
        .then( response => {
            dispatch(getPrototipoSuccess(response.data.prototipo))
        })
        .catch(error => {
            dispatch(getPrototipoError(error.response.data))
        })
    }
}

const getPrototipo = () => ({
    type: VIEW_PROTOTIPO,
    payload: true
})

const getPrototipoSuccess = payload => ({
    type: VIEW_PROTOTIPO_SUCCESS,
    payload
})

const getPrototipoError = payload => ({
    type: VIEW_PROTOTIPO_ERROR,
    payload
})


// Get EDIT

export function editPrototipoAction(id) {
    return async (dispatch) => {
        dispatch(editPrototipo())
        await clientAxios.get(`/prototipo/${id}/edit`)
        .then(response => {
            dispatch(editPrototipoSuccess(response.data.prototipo))
        })
        .catch( error => {
            editPrototipoError(error.response.data)
        })
    }
}


const editPrototipo = () => ({
    type: EDIT_PROTOTIPO,
    payload: true
})

const editPrototipoSuccess = payload => ({
    type: EDIT_PROTOTIPO_SUCCESS,
    payload
})

const editPrototipoError = payload => ({
    type: EDIT_PROTOTIPO_ERROR,
    payload: payload
})


// Update Prototipo

export function updatePrototipoAction(prototipo, form){
    return async dispatch => {
        dispatch(updatePrototipo())
        await clientAxios.put(`prototipo/${prototipo.id}`, prototipo)
        .then( async response => {
            await clientAxios.post(`prototipo/plano/${response.data.prototipo.id}`, form)
            .then( response => {
                dispatch(updatePrototipoSuccess(response.data.prototipo))
                // dispatch(redirectTo())
            })
            .catch( error => {
                dispatch(updatePrototipoError(error.response.data))
            })    
        })
        .catch( error => {
            console.log(error.response);
            dispatch(updatePrototipoError(error.response.data))
        })
    }
}

const updatePrototipo = () => ({
    type: UPDATE_PROTOTIPO,
    payload: true
})

const updatePrototipoSuccess = payload => ({
    type: UPDATE_PROTOTIPO_SUCCESS,
    payload
})

const updatePrototipoError = payload => ({
    type: UPDATE_PROTOTIPO_ERROR,
    payload
})


export function deletePrototipoAction(id){
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
                dispatch(deletePrototipo(id))        
                clientAxios.delete(`/prototipo/${id}`)
                .then( response => {
                    dispatch(deletePrototipoSuccess(response.data.prototipo))
                    Swal.fire(
                        'Borrado!',
                        'Elemento borrado.',
                        'success'
                      )
                })
                .catch( error => {
                    dispatch(deletePrototipoError(error.response.data.message))
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

const deletePrototipo = payload => ({
    type: DELETE_PROTOTIPO,
    payload
})

const deletePrototipoSuccess = payload => ({
    type: DELETE_PROTOTIPO_SUCCESS,
    payload
})

const deletePrototipoError = payload => ({
    type: DELETE_PROTOTIPO_ERROR,
    payload
})

export function cleanPrototipoAction(){
    return dispatch => {
        dispatch({
            type: CLEAN_PROTOTIPO
        })
    }
}

export function redirectTo(){
    return dispatch => {
        dispatch({
            type: REDIRECT,
            payload: "/admin/prototipo"
        })
    }
}

export function setRelacionAction(seleccionarZona){
    return async dispatch => {
        dispatch(setRelacion(seleccionarZona))
        await clientAxios(`/prototipo/relacion/${seleccionarZona.id}`, seleccionarZona)
        .then(response => {
            dispatch(setRelacionSuccess(response.data.prototipo))
        })
        .catch( error => {
            dispatch(setRelacionError(error.response.data))
        })
    }
}


const setRelacionSuccess = payload => ({
    type: SET_RELACION_PROTOTIPO_SUCCESS,
    payload
})

const setRelacionError = payload => ({
    type: SET_RELACION_PROTOTIPO_ERROR,
    payload
})

const setRelacion = payload => ({   
    type: SET_RELACION_PROTOTIPO,
    payload
})