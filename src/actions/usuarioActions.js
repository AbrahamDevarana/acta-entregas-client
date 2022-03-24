import clientAxios from '../config/axios'
import {
    CREATE_USUARIO,
    CREATE_USUARIO_SUCCESS,
    CREATE_USUARIO_ERROR,
    VIEW_USUARIO,
    VIEW_USUARIO_SUCCESS,
    VIEW_USUARIO_ERROR,
    EDIT_USUARIO,
    EDIT_USUARIO_SUCCESS,
    EDIT_USUARIO_ERROR,
    UPDATE_USUARIO,
    UPDATE_USUARIO_SUCCESS,
    UPDATE_USUARIO_ERROR,
    DELETE_USUARIO,
    DELETE_USUARIO_SUCCESS,
    DELETE_USUARIO_ERROR,
    CLEAN_USUARIO,
    REDIRECT
} from '../types'
import Swal from 'sweetalert2'
import axios from 'axios'

// Create 

export function createNewUsuarioAction(usuario, form){
    return async dispatch => {
        dispatch(addUsuario())
        await clientAxios.post('/usuarios', usuario)
        .then( async response => {
            await axios({ url: `${process.env.REACT_APP_URL}/fotoPerfil/${response.data.usuario.id}`, method:"POST", data:form, headers: {"Content-Type": "multipart/form-data"}}).
            then( response => {
                console.log(response);
                dispatch(addUsuarioSuccess(response.data.usuario))
                if(!usuario.clientForm){
                    dispatch(redirectTo())
                }
            }).catch( error => {
                dispatch(addUsuarioError(error.response.data))
            }) 
        })
        .catch( error => {
            dispatch(addUsuarioError(error.response.data))
        }) 
    }
}

const addUsuario = () => ({
    type: CREATE_USUARIO,
    payload: true
})

const addUsuarioSuccess = payload => ({
    type: CREATE_USUARIO_SUCCESS,
    payload
})

const addUsuarioError = payload => ({
    type: CREATE_USUARIO_ERROR,
    payload
}) 


// all usuario

export function getUsuariosAction(){
    return async (dispatch) => {
        dispatch (getUsuarios())
        await clientAxios.get('/usuarios')
        .then( response => {
            dispatch(getUsuariosSuccess(response.data.usuario))
        })
        .catch(error => {
            dispatch(getUsuariosError(error.response.data))
        })
    }
}

const getUsuarios = () => ({
    type: VIEW_USUARIO,
    payload: true
})

const getUsuariosSuccess = payload => ({
    type: VIEW_USUARIO_SUCCESS,
    payload
})

const getUsuariosError = payload => ({
    type: VIEW_USUARIO_ERROR,
    payload
})


// Get EDIT

export function editUsuarioAction(id) {
    return async (dispatch) => {
        dispatch(editUsuario())
        await clientAxios.get(`/usuarios/${id}/edit`)
        .then(response =>{
            dispatch(editUsuarioSuccess(response.data.usuario))
        })
        .catch( error => {
            editUsuarioError(error.response.data)
        })
    }
}


const editUsuario = () => ({
    type: EDIT_USUARIO,
    payload: true
})

const editUsuarioSuccess = payload => ({
    type: EDIT_USUARIO_SUCCESS,
    payload
})

const editUsuarioError = payload => ({
    type: EDIT_USUARIO_ERROR,
    payload: payload
})


// Update Usuario

export function updateUsuarioAction(usuario, form){
    return async dispatch => {
        dispatch(updateUsuario())
        await clientAxios.put(`/usuarios/${usuario.id}`, usuario)
        .then( async response => {
            await axios({ url: `${process.env.REACT_APP_URL}/fotoPerfil/${response.data.usuario.id}`, method:"POST", data:form, headers: {"Content-Type": "multipart/form-data"}})
            .then( result => {
                dispatch(updateUsuarioSuccess(result.data.usuario))
                dispatch(redirectTo())    
            })
            .catch( error => {
                dispatch(updateUsuarioError(error.response.data))
            })
            
        })
        .catch( error => {
            dispatch(updateUsuarioError(error.response.data))
        })
    }
}

const updateUsuario = () => ({
    type: UPDATE_USUARIO,
    payload: true
})

const updateUsuarioSuccess = payload => ({
    type: UPDATE_USUARIO_SUCCESS,
    payload
})

const updateUsuarioError = payload => ({
    type: UPDATE_USUARIO_ERROR,
    payload
})


export function deleteUsuarioAction(id){
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
                dispatch(deleteUsuario(id))        
                clientAxios.delete(`/usuarios/${id}`)
                .then( response => {
                    dispatch(deleteUsuarioSuccess(response.data.usuario))
                    Swal.fire(
                        'Borrado!',
                        'Elemento borrado.',
                        'success'
                      )
                })
                .catch( error => {
                    dispatch(deleteUsuarioError(error.response.data.message))
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

const deleteUsuario = payload => ({
    type: DELETE_USUARIO,
    payload
})

const deleteUsuarioSuccess = payload => ({
    type: DELETE_USUARIO_SUCCESS,
    payload
})

const deleteUsuarioError = payload => ({
    type: DELETE_USUARIO_ERROR,
    payload
})


export function cleanUsuarioAction(){
    return dispatch => {
        dispatch({
            type: CLEAN_USUARIO
        })
    }
}

export function redirectTo(){
    return dispatch => {
        dispatch({
            type: REDIRECT,
            payload: "/admin/usuarios"
        })
    }
}