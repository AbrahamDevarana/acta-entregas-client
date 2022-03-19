import { combineReducers } from 'redux';

import authReducer from './authReducer'
import alertReducer from './alertReducer'
import listadoReducer from './listadoReducer'
import seccionReducer from './seccionReducer'
import usuarioReducer from './userReducer'
import departamentoReducer from './departamentoReducer'
import agendaReducer from './agendaReducer'
import entregaReducer from './entregaReducer'

export default combineReducers({
    auth:authReducer,
    alert:alertReducer,
    listado:listadoReducer,
    seccion:seccionReducer,
    usuarios:usuarioReducer,
    departamento:departamentoReducer,
    agenda:agendaReducer,
    entrega:entregaReducer
});