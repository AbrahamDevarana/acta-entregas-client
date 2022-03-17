import { SHOW_ALERT, HIDE_ALERT} from '../types'



const initialState = {
    alert: false
}


export default function foo (state = initialState, action ){
    switch (action.type) {
        case SHOW_ALERT:
            return {
                ...state,
                alert: action.payload
            }
        case HIDE_ALERT:
            return {
                ...state,
                alert: false
            }
        default: 
            return state
    }
}