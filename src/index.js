import './style.css'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { rootReducer } from './redux/rootReducer'
import { increment, decrement, asyncIncrement, changeTheme } from './redux/actions'
import thunk from 'redux-thunk'

const counter = document.getElementById('counter')
const addBtn = document.getElementById('add')
const subBtn = document.getElementById('sub')
const asyncBtn = document.getElementById('async')
const themeBtn = document.getElementById('theme')

const store = createStore(
    rootReducer, 
    composeWithDevTools(applyMiddleware(thunk)
    )
)

store.subscribe(() => {
    let state = store.getState()
    counter.textContent = state.counter

    document.body.className = state.theme.theme;
    [addBtn, subBtn, asyncBtn, themeBtn].forEach(btn => btn.disabled = state.theme.disabled )
})

addBtn.addEventListener('click', () => {
    store.dispatch(increment())
})

subBtn.addEventListener('click', () => {
    store.dispatch(decrement())
})

asyncBtn.addEventListener('click', () => {
    store.dispatch(asyncIncrement())
})

themeBtn.addEventListener('click', () => {
    const newTheme = document.body.classList.contains('light')
        ? 'dark'
        : 'light'
    store.dispatch(changeTheme(newTheme))
})

store.dispatch({type: '__INIT__APP'})



