import { combineReducers } from 'redux';

import authReducer from './authReducer'
import alertReducer from './alertReducer'
import listadoReducer from './listadoReducer'
import zonaReducer from './zonaReducer'
import usuarioReducer from './userReducer'
import residenciaReducer from './residenciaReducer'
import agendaReducer from './agendaReducer'
import entregaReducer from './entregaReducer'
import desarrolloReducer from './desarrolloReducer'
import prototipoReducer from './prototipoReducer'
import etapaReducer from './etapaReducer'

export default combineReducers({
    auth:authReducer,
    alert:alertReducer,
    listado:listadoReducer,
    zona:zonaReducer,
    usuarios:usuarioReducer,
    residencia:residenciaReducer,
    agenda:agendaReducer,
    entrega:entregaReducer,
    desarrollo:desarrolloReducer,
    prototipo:prototipoReducer,
    etapa: etapaReducer
});