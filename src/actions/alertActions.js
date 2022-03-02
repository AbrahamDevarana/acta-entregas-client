import { SHOW_ALERT, HIDE_ALERT} from '../types'

export function showAlertAction(alert){
    return dispatch => {
        dispatch(showAlert(alert))
    }
}

const showAlert = payload => ({
    type: SHOW_ALERT,
    payload
})

export function hideAlertAction() {
    return dispatch => {
        dispatch( hideAlert() )
    }
}

const hideAlert = () => ({
    type: HIDE_ALERT
})