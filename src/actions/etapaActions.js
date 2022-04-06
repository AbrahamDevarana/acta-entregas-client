import clientAxios from '../config/axios'
import {
    CREATE_ETAPA,
    CREATE_ETAPA_SUCCESS,
    CREATE_ETAPA_ERROR,
    VIEW_ETAPA,
    VIEW_ETAPA_SUCCESS,
    VIEW_ETAPA_ERROR,
    EDIT_ETAPA,
    EDIT_ETAPA_SUCCESS,
    EDIT_ETAPA_ERROR,
    UPDATE_ETAPA,
    UPDATE_ETAPA_SUCCESS,
    UPDATE_ETAPA_ERROR,
    UPGRADE_ETAPA,
    UPGRADE_ETAPA_SUCCESS,
    UPGRADE_ETAPA_ERROR,
    DELETE_ETAPA,
    DELETE_ETAPA_SUCCESS,
    DELETE_ETAPA_ERROR,
    CLEAN_ETAPA,
    REDIRECT,
    SET_RELACION_ETAPA_SUCCESS,
    SET_RELACION_ETAPA_ERROR,
    SET_RELACION_ETAPA
} from '../types'
import Swal from 'sweetalert2'


// // Create 

// export function createNewEtapaAction(etapa){
//     return dispatch => {
//         dispatch(addEtapa())
//         clientAxios.post('etapa', etapa)
//         .then( response => {
//             dispatch(addEtapaSuccess(response.data.etapa))
//             dispatch(redirectTo())
//         })
//         .catch( error => {
//             dispatch(addEtapaError(error.response.data))
//         }) 
//     }
// }

// const addEtapa = () => ({
//     type: CREATE_ETAPA,
//     payload: true
// })

// const addEtapaSuccess = payload => ({
//     type: CREATE_ETAPA_SUCCESS,
//     payload
// })

// const addEtapaError = payload => ({
//     type: CREATE_ETAPA_ERROR,
//     payload
// }) 


// all etapa

// export function getEtapasAction(){
//     return async (dispatch) => {
//         dispatch (getEtapas())
//         await clientAxios.get('/etapa')
//         .then( response => {
//             dispatch(getEtapasSuccess(response.data.etapa))
//         })
//         .catch(error => {
//             dispatch(getEtapasError(error.response.data))
//         })
//     }
// }

// const getEtapas = () => ({
//     type: VIEW_ETAPA,
//     payload: true
// })

// const getEtapasSuccess = payload => ({
//     type: VIEW_ETAPA_SUCCESS,
//     payload
// })

// const getEtapasError = payload => ({
//     type: VIEW_ETAPA_ERROR,
//     payload
// })


// Get EDIT

export function verEtapaAction(id) {
    return async (dispatch) => {
        dispatch(verEtapa())
        await clientAxios.get(`/etapa/${id}`)
        .then(response =>{
            dispatch(verEtapaSuccess(response.data.etapa))
        })
        .catch( error => {
            verEtapaError(error.response.data)
        })
    }
}


const verEtapa = () => ({
    type: VIEW_ETAPA,
    payload: true
})

const verEtapaSuccess = payload => ({
    type: VIEW_ETAPA_SUCCESS,
    payload
})

const verEtapaError = payload => ({
    type: VIEW_ETAPA_ERROR,
    payload: payload
})


// Update Etapa

export function updateEtapaAction(etapa){
    return async dispatch => {
        dispatch(updateEtapa())
        await clientAxios.put(`/etapa/${etapa.id}`, etapa)
        .then( response => {
            dispatch(updateEtapaSuccess(response.data.etapa))
            dispatch(redirectTo())
        })
        .catch( error => {
            dispatch(updateEtapaError(error.response.data))
        })
    }
}

const updateEtapa = () => ({
    type: UPDATE_ETAPA,
    payload: true
})

const updateEtapaSuccess = payload => ({
    type: UPDATE_ETAPA_SUCCESS,
    payload
})

const updateEtapaError = payload => ({
    type: UPDATE_ETAPA_ERROR,
    payload
})


export function deleteEtapaAction(id){
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
                dispatch(deleteEtapa(id))        
                clientAxios.delete(`/etapa/${id}`)
                .then( response => {
                    dispatch(deleteEtapaSuccess(response.data.etapa))
                    Swal.fire(
                        'Borrado!',
                        'Elemento borrado.',
                        'success'
                      )
                })
                .catch( error => {
                    dispatch(deleteEtapaError(error.response.data.message))
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

const deleteEtapa = payload => ({
    type: DELETE_ETAPA,
    payload
})

const deleteEtapaSuccess = payload => ({
    type: DELETE_ETAPA_SUCCESS,
    payload
})

const deleteEtapaError = payload => ({
    type: DELETE_ETAPA_ERROR,
    payload
})

export function cleanEtapaAction(){
    return dispatch => {
        dispatch({
            type: CLEAN_ETAPA
        })
    }
}

export function redirectTo(){
    return dispatch => {
        dispatch({
            type: REDIRECT,
            payload: "/admin/etapa"
        })
    }
}





// Update Etapa

export function upgradeEtapaAction(etapa){
    console.log(etapa);
    return async dispatch => {
        dispatch(upgradeEtapa())
        await clientAxios.post(`/etapa/${etapa.id}/upgrade`, etapa.prototipoNuevo)
        .then( response => {
            console.log(response);
            dispatch(upgradeEtapaSuccess(response.data.etapa))
            dispatch(redirectTo())
        })
        .catch( error => {
            console.log(error);
            dispatch(upgradeEtapaError(error.response.data))
        })
    }
}

const upgradeEtapa = () => ({
    type: UPGRADE_ETAPA,
    payload: true
})

const upgradeEtapaSuccess = payload => ({
    type: UPGRADE_ETAPA_SUCCESS,
    payload
})

const upgradeEtapaError = payload => ({
    type: UPGRADE_ETAPA_ERROR,
    payload
})

export function setRelacionAction(prototipos){
    return async dispatch => {
        dispatch(setRelacion(prototipos))
        await clientAxios.post(`etapa/relacion/${prototipos.id}`, prototipos)
        .then(response => {
            dispatch(setRelacionSuccess(response.data.etapa))
        })
        .catch( error => {
            dispatch(setRelacionError(error.response.data))
        })
    }
}


const setRelacionSuccess = payload => ({
    type: SET_RELACION_ETAPA_SUCCESS,
    payload
})

const setRelacionError = payload => ({
    type: SET_RELACION_ETAPA_ERROR,
    payload
})

const setRelacion = () => ({   
    type: SET_RELACION_ETAPA,
    payload: false
})