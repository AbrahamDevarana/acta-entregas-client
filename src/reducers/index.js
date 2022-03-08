import { combineReducers } from 'redux';

import authReducer from './authReducer'
import alertReducer from './alertReducer'
import listadoReducer from './listadoReducer'
import seccionReducer from './seccionReducer'

export default combineReducers({
    auth:authReducer,
    alert:alertReducer,
    listado:listadoReducer,
    seccion:seccionReducer
});