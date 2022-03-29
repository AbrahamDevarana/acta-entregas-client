import clientAxios from "../config/axios";

import { } from '../types'

export function cargarArchivo(form, route) {
    return async dispatch => {        
        await clientAxios.post(route, form )
        .then( response => console.log(response))
        .catch( error => console.log(error))
    }
}