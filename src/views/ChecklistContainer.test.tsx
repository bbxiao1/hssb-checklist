import React from 'react';
import { fireEvent, getByLabelText, render, screen } from '@testing-library/react';
import Ship from '../models/Ship';
import { ShipBuilder } from '../Utils';

import ChecklistContainer from '../views/ChecklistContainer';

let ship: Ship;

beforeEach(() => {
  ship = ShipBuilder.build();
})

test('initialization starts first task', () => {
  expect(ship.tasks[0].status).toEqual('incomplete')

  render(<ChecklistContainer selectedShip={ship} />)

  expect(ship.tasks[0].status).toEqual('in-progress')
});

test('clicking on the in-progress task completes it and moves on to the next task', () => {
  const { getByText } = render(<ChecklistContainer selectedShip={ship} />)

  const firstTask = ship.tasks[0]
  expect(firstTask.status).toEqual('in-progress')

  fireEvent.click(getByText(firstTask.text))

  expect(firstTask.status).toEqual('complete')
  expect(ship.tasks[1].status).toEqual('in-progress')
})

test('clicking the last task behaves as expected', () => {
  const { getByText } = render(<ChecklistContainer selectedShip={ship} />)

  fireEvent.click(getByText(ship.tasks[0].text))
  fireEvent.click(getByText(ship.tasks[1].text))

  expect(ship.tasks[0].status).toEqual('complete')
  expect(ship.tasks[1].status).toEqual('complete')

  expect(ship.tasks.length).toEqual(2)
})