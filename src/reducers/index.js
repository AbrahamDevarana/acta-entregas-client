import { combineReducers } from 'redux';

import authReducer from './authReducer'
import alertReducer from './alertReducer'
import listadoReducer from './listadoReducer'
import seccionReducer from './seccionReducer'
import usuarioReducer from './userReducer'
import viviendaReducer from './viviendaReducer'
import agendaReducer from './agendaReducer'
import entregaReducer from './entregaReducer'
import desarrolloReducer from './desarrolloReducer'

export default combineReducers({
    auth:authReducer,
    alert:alertReducer,
    listado:listadoReducer,
    seccion:seccionReducer,
    usuarios:usuarioReducer,
    vivienda:viviendaReducer,
    agenda:agendaReducer,
    entrega:entregaReducer,
    desarrollo:desarrolloReducer
});