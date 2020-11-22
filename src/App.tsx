import React from 'react';
import './App.css';
import Ship from './models/Ship';
import ShipList from './views/ShipList';
import ChecklistContainer from './views/ChecklistContainer';

type Props = {
  ships: Ship[];
}

type State = {
  selectedShip: Ship | null;
  didSelectShip: (ship: Ship) => void;
}

class App extends React.Component<Props, State> {
  readonly state: State = {
    selectedShip: null,
    didSelectShip: (ship: Ship) => {
      this.setState({...this.state, selectedShip: ship});
    }
  }

  render() {
    let checklistSection;
    if (this.state.selectedShip) {
      checklistSection = <ChecklistContainer selectedShip={this.state.selectedShip} />
    } else {
      checklistSection = <div className="no-ship">Please select a ship</div>
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
              <ShipList ships={this.props.ships} didSelectShip={this.state.didSelectShip} />
            </div>
            <div className="col">
              {checklistSection}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
