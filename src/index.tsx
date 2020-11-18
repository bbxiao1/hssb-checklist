import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Ship from './models/Ship';

let ships: Ship[] = [
  {id: 1, name: "Mackerel"},
  {id: 2, name: "Gecko"}
]
ReactDOM.render(
  <React.StrictMode>
    <App ships={ships}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
