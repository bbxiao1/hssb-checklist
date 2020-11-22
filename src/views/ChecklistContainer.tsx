import React from "react";
import Ship from "../models/Ship";
import { Task, Status } from "../models/Task";

type Props = {
  ship: Ship;
  currentTaskId: number;
  didCompleteTask: (task: Task) => void;
}

function renderGrouping(tasks: Task[], props?: Props) {
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

function Checklist(props: Props) {
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

type ContainerProps = {
  selectedShip: Ship;
}

type ContainerState = {
  tasks: Task[];
  currentTaskId: number;
  didCompleteTask: (task: Task) => void;
  shipComplete: boolean;
}

class ChecklistContainer extends React.Component<ContainerProps, ContainerState> {
  constructor(props: ContainerProps) {
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

export default ChecklistContainer;