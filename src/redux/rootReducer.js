import { INCREMENT, DECREMENT, ENABLE_BUTTONS, DISABLE_BUTTONS, CHANGE_THEME } from "./types"
import { combineReducers } from "redux"

function counterReducer(state = 0, action) {
    if (action.type === INCREMENT) {
        return state + 1
    } else if (action.type === DECREMENT) {
        return state - 1
    }
    
    return state
}

const themeState = {
    theme: 'light',
    disabled: false
}

function themeReducer(state = themeState, action) {
    switch (action.type) {
        case ENABLE_BUTTONS:
            return {...state, disabled: false}
        case DISABLE_BUTTONS:
            return {...state, disabled: true }
        case CHANGE_THEME:
            return {...state, theme: action.payload}
        default: 
            return state        
    }
}

export const rootReducer = combineReducers({
    counter: counterReducer,
    theme: themeReducer
})