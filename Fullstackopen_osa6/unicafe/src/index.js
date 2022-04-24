import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {

  const good = () => {
    const stateCopy = store.getState()
    store.dispatch({
      type: 'GOOD',
      data: {
        good: stateCopy.good + 1,
        ok: stateCopy.ok,
        bad: stateCopy.bad
      }
    })
  }

  const ok = () => {
    const stateCopy = store.getState()
    store.dispatch({
      type: 'OK',
      data: {
        good: stateCopy.good,
        ok: stateCopy.ok + 1,
        bad: stateCopy.bad
      }
    })
  }

  const bad = () => {
    const stateCopy = store.getState()
    store.dispatch({
      type: 'BAD',
      data: {
        good: stateCopy.good,
        ok: stateCopy.ok,
        bad: stateCopy.bad + 1
      }
    })
  }

  const reset = () => {
    const stateCopy = store.getState()
    store.dispatch({
      type: 'ZERO',
      data: {
        good: 0,
        ok: 0,
        bad: 0
      }
    })
  }

  return (
    <div>
      <button onClick={good}>good</button> 
      <button onClick={ok}>neutral</button> 
      <button onClick={bad}>bad</button>
      <button onClick={reset}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>neutral {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}


const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
// console.log(store.getState())
store.subscribe(renderApp)