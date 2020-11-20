import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import Ship from './models/Ship'
import rawShips from './ships.json'

const ships: Ship[] = rawShips.map((s: any, i) => {
  return {
    id: i,
    name: s.name,
    tasks: s.tasks.map((t: string, i: number) => {
      return {
        id: i,
        text: t,
        status: 'incomplete'
      }
    })
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App ships={ships}/>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
