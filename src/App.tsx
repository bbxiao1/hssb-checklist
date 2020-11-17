import React from 'react';
import './App.css';

interface Ship {
  id: number,
  name: string
}

function App() {
  let ships: Ship[] = [
    {id: 1, name: "Mackerel"},
    {id: 2, name: "Gecko"}
  ]
  var selectedShip: Ship;

  const didSelectShip = (ship: Ship) => {
    selectedShip = ship
  }

  let renderedShips = ships.map((ship) => {
    return <li
             key={ship.id}
             className="list-group-item ship-list-name">
               <div className="clicky" onClick={e => didSelectShip(ship) }>
                 {ship.name}
               </div>
           </li>
  })

  let renderedChecklist = () => {
    if (selectedShip) {
      return <div className="no-ship">{selectedShip.name}</div>
    } else {
      return <div className="no-ship">Please select a ship</div>
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2>
          Hardspace: Shipbreaker
        </h2>
      </header>
      <div className="container">
        <div className="row">
          <div className="col-2">
            <ul className="list-group list-group-flush">
              {renderedShips}
            </ul>
          </div>
          <div className="col">
            {renderedChecklist()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
