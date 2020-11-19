import React from 'react';
import './App.css';
import Ship from './models/Ship';
import Task from './models/Task';

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

type ChecklistProps = {
  ship: Ship;
  currentTaskId: number;
  didCompleteTask: (task: Task) => void;
}
function Checklist(props: ChecklistProps) {
  let tasks = props.ship.tasks.map((task: Task) => {
    let taskContent;
    if (task.id === props.currentTaskId) {
      taskContent = (
        <div className='clicky' onClick={() => props.didCompleteTask(task) }>
          {task.text}
        </div>
      )
    } else {
      let className;
      if (task.status === 'complete') { className = 'strikethrough'}
      taskContent = (
        <div className={className}>{task.text}</div>
      )
    }
    return (
      <li
        key={task.id}
        className="list-group-item ship-list-name">
          {taskContent}
      </li>
    )
  })
  return (
    <div className="ship">
      <h3>{props.ship.name}</h3>
      <ul>{tasks}</ul>
    </div>
  )
}

type Props = {
  ships: Ship[];
}

// TODO: ship to remove null
type State = {
  selectedShip: Ship | null;
  currentTaskId: number | null;
  didSelectShip: (ship: Ship) => void;
  didCompleteTask: (task: Task) => void;
}

class App extends React.Component<Props, State> {
  readonly state: State = {
    selectedShip: null,
    currentTaskId: null,
    didSelectShip: (ship: Ship) => {
      this.setState({...this.state, selectedShip: ship, currentTaskId: ship.tasks[0].id});
    },
    didCompleteTask: (task: Task) => {
      var nextTaskId: number | null = (this.state.currentTaskId || 0) + 1
      let matchingTask = this.state.selectedShip?.tasks.find(t => t.id === nextTaskId);
      if (!matchingTask) { nextTaskId = null }
      this.setState({...this.state, currentTaskId: nextTaskId});
    }
  }

  render() {
    let checklistSection;
    if (this.state.selectedShip && this.state.currentTaskId !== null) {
      checklistSection = <Checklist ship={this.state.selectedShip} currentTaskId={this.state.currentTaskId} didCompleteTask={this.state.didCompleteTask}/>
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
