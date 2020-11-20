import React from 'react';
import './App.css';
import Ship from './models/Ship';
import { Status, Task } from './models/Task';

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

function renderGrouping(tasks: Task[], props?: ChecklistProps) {
  return tasks.map((task: Task) => {
    let taskContent;
    if (task.status === 'in-progress' && props) {
      taskContent = (
        <div className='in-progress' onClick={() => props.didCompleteTask(task) }>
          {task.text}
        </div>
      )
    } else {
      taskContent = (
        <div className={task.status}>{task.text}</div>
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
}

function Checklist(props: ChecklistProps) {
  let groupedTasks: {[key in Status]: Task[]} = {
    'complete': [],
    'in-progress': [],
    'incomplete': []
  }
  groupedTasks = props.ship.tasks.reduce((group, t) => {
    group[t.status].push(t)
    return group
  }, groupedTasks)

  return (
    <div className="ship">
      <h3>{props.ship.name}</h3>
      <ul>{renderGrouping(groupedTasks['complete'])}</ul>
      <ul>{renderGrouping(groupedTasks['in-progress'], props)}</ul>
      <ul>{renderGrouping(groupedTasks['incomplete'])}</ul>
    </div>
  )
}

type ChecklistContainerProps = {
  selectedShip: Ship;
}

type ChecklistContainerState = {
  tasks: Task[];
  currentTaskId: number;
  didCompleteTask: (task: Task) => void;
  shipComplete: boolean;
}

class ChecklistContainer extends React.Component<ChecklistContainerProps, ChecklistContainerState> {
  constructor(props: ChecklistContainerProps) {
    super(props)

    let newTasks = [...props.selectedShip.tasks]
    newTasks[0].status = 'in-progress'
    this.state = {
      tasks: newTasks,
      currentTaskId: newTasks[0].id,
      didCompleteTask: (completedTask: Task) => {
        const nextTaskId = this.state.currentTaskId + 1
        let matchingTask;

        let tasks = this.state.tasks.map((t) => {
          if (t.id === completedTask.id) { t.status = 'complete' }
          if (t.id === nextTaskId) {
            matchingTask = t
            matchingTask.status = 'in-progress'
          }
          return t
        })

        if (matchingTask) {
          this.setState({...this.state, tasks: tasks, currentTaskId: nextTaskId});
        } else {
          this.setState({...this.state, tasks: tasks, shipComplete: true});
        }
      },
      shipComplete: false
    }
  }

  render() {
    return (
      <div className="col">
        <Checklist ship={this.props.selectedShip} currentTaskId={this.state.currentTaskId} didCompleteTask={this.state.didCompleteTask}/>
      </div>
    )
  }
}

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
