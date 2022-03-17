import clientAxios from '../config/axios'
import {
    VIEW_DEPARTAMENTO,
    VIEW_DEPARTAMENTO_SUCCESS,
    VIEW_DEPARTAMENTO_ERROR,
    EDIT_DEPARTAMENTO,
    EDIT_DEPARTAMENTO_SUCCESS,
    EDIT_DEPARTAMENTO_ERROR,
    UPDATE_DEPARTAMENTO,
    UPDATE_DEPARTAMENTO_SUCCESS,
    UPDATE_DEPARTAMENTO_ERROR,
    DELETE_DEPARTAMENTO,
    DELETE_DEPARTAMENTO_SUCCESS,
    DELETE_DEPARTAMENTO_ERROR,
    CLEAN_DEPARTAMENTO,
    REDIRECT,

    DEPARTAMENTO_SECCION,
    DEPARTAMENTO_SECCION_SUCCESS,
    DEPARTAMENTO_SECCION_ERROR
} from '../types'
import Swal from 'sweetalert2'




// all departamento

export function getDepartamentosAction(){
    return async (dispatch) => {
        dispatch (getDepartamentos())
        await clientAxios.get('/departamento')
        .then( response => {
            dispatch(getDepartamentosSuccess(response.data.departamento))
        })
        .catch(error => {
            dispatch(getDepartamentosError(error.response.data))
        })
    }
}

const getDepartamentos = () => ({
    type: VIEW_DEPARTAMENTO,
    payload: true
})

const getDepartamentosSuccess = payload => ({
    type: VIEW_DEPARTAMENTO_SUCCESS,
    payload
})

const getDepartamentosError = payload => ({
    type: VIEW_DEPARTAMENTO_ERROR,
    payload
})


// Get EDIT

export function editDepartamentoAction(id) {
    return async (dispatch) => {
        dispatch(editDepartamento())
        await clientAxios.get(`/departamento/${id}/edit`)
        .then(response =>{
            dispatch(editDepartamentoSuccess(response.data.departamento))
        })
        .catch( error => {
            editDepartamentoError(error.response.data)
        })
    }
}


const editDepartamento = () => ({
    type: EDIT_DEPARTAMENTO,
    payload: true
})

const editDepartamentoSuccess = payload => ({
    type: EDIT_DEPARTAMENTO_SUCCESS,
    payload
})

const editDepartamentoError = payload => ({
    type: EDIT_DEPARTAMENTO_ERROR,
    payload: payload
})


// Update Departamento

export function updateDepartamentoAction(departamento){
    return async dispatch => {
        dispatch(updateDepartamento())
        await clientAxios.put(`/departamento/${departamento.id}`, departamento)
        .then( response => {
            dispatch(updateDepartamentoSuccess(response.data.departamento))
            dispatch(redirectTo())
        })
        .catch( error => {
            dispatch(updateDepartamentoError(error.response.data))
        })
    }
}

const updateDepartamento = () => ({
    type: UPDATE_DEPARTAMENTO,
    payload: true
})

const updateDepartamentoSuccess = payload => ({
    type: UPDATE_DEPARTAMENTO_SUCCESS,
    payload
})

const updateDepartamentoError = payload => ({
    type: UPDATE_DEPARTAMENTO_ERROR,
    payload
})


export function deleteDepartamentoAction(id){
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
                dispatch(deleteDepartamento(id))        
                clientAxios.delete(`/departamento/${id}`)
                .then( response => {
                    dispatch(deleteDepartamentoSuccess(response.data.departamento))
                    Swal.fire(
                        'Borrado!',
                        'Elemento borrado.',
                        'success'
                      )
                })
                .catch( error => {
                    dispatch(deleteDepartamentoError(error.response.data.message))
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

const deleteDepartamento = payload => ({
    type: DELETE_DEPARTAMENTO,
    payload
})

const deleteDepartamentoSuccess = payload => ({
    type: DELETE_DEPARTAMENTO_SUCCESS,
    payload
})

const deleteDepartamentoError = payload => ({
    type: DELETE_DEPARTAMENTO_ERROR,
    payload
})


export function getDepartamentosSeccionAccion(id){
    return async dispatch => {
        dispatch(getDepartamentosSeccion())
        await clientAxios.get(`/departamento-seccion/${id}`)
        .then( response => { 
            console.log(response.data.success);
            dispatch(getDepartamentosSeccionSuccess(response.data.secciones))
         })
        .catch( error => {
            getDepartamentosSeccionError(error.response.data.message)
        })
    }
}

const getDepartamentosSeccion = () => ({
    type: DEPARTAMENTO_SECCION,
    payload: true
})

const getDepartamentosSeccionSuccess = payload => ({
    type: DEPARTAMENTO_SECCION_SUCCESS,
    payload
})

const getDepartamentosSeccionError = payload => ({
    type: DEPARTAMENTO_SECCION_ERROR,
    payload
})



// Utils

export function cleanDepartamentoAction(){
    return dispatch => {
        dispatch({
            type: CLEAN_DEPARTAMENTO
        })
    }
}

export function redirectTo(){
    return dispatch => {
        dispatch({
            type: REDIRECT,
            payload: "/admin/departamento"
        })
    }
}