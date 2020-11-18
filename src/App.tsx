import React from 'react';
import './App.css';
import Ship from './models/Ship';
import Task from './models/Task';

type Props = {
  ships: Ship[];
}

type State = {
  selectedShip: Ship | null;
  didSelectShip: (ship: Ship) => void;
}

interface ShipListProps {
  ships: Ship[];
  didSelectShip: (ship: Ship) => void;
}

function ShipList(props: ShipListProps) {
  let ships = props.ships.map((ship) => {
    return <li
            key={ship.id}
            className="list-group-item ship-list-name">
              <div className="clicky" onClick={() => props.didSelectShip(ship) }>
                {ship.name}
              </div>
          </li>
  })
  return (
    <ul className="list-group list-group-flush">
      {ships}
    </ul>
  );
}

interface ChecklistProps {
  ship: Ship | null;
}
function Checklist(props: ChecklistProps) {
  if (props.ship) {
    let tasks = props.ship.tasks.map((task: Task) => {
      return (
        <li
          key={task.id}
          className="list-group-item ship-list-name">
            <div className="clicky" >
              {task.text}
            </div>
        </li>
      )
    })
    return (
      <div className="ship">
        <h3>{props.ship.name}</h3>
        <ul>{tasks}</ul>
      </div>
    )
  } else {
    return <div className="no-ship">Please select a ship</div>
  }
}

class App extends React.Component<Props, State> {
  public readonly state: State = {
    selectedShip: null,
    didSelectShip: (ship: Ship) => {
      this.setState({...this.state, selectedShip: ship});
    }
  }

  render() {
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
              <ShipList ships={this.props.ships} didSelectShip={this.state.didSelectShip} />
            </div>
            <div className="col">
              <Checklist ship={this.state.selectedShip} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
