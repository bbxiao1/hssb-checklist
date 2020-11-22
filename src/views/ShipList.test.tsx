import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import ShipList from './ShipList';
import Ship from '../models/Ship';
import { ShipBuilder } from '../Utils';

let ships: Ship[],
    selectedShip: Ship,
    didSelectShip: (ship: Ship) => void;

beforeAll(() => {
  ships = [
      ShipBuilder.build(),
      ShipBuilder.build("shippy mcshipface")
  ];
  didSelectShip = (ship: Ship) => {
    selectedShip = ship;
  }
});

test('renders a list of ships', () => {
  render(<ShipList ships={ships} didSelectShip={didSelectShip}/>);
  expect(screen.getByText(/Ship#1/)).toBeInTheDocument();
  expect(screen.getByText(/shippy mcshipface/)).toBeInTheDocument();
});

test('clicking a ship selects it', () => {
  const { getByText } = render(<ShipList ships={ships} didSelectShip={didSelectShip}/>);

  fireEvent.click(getByText('shippy mcshipface'));

  expect(selectedShip).not.toBeUndefined;
  expect(selectedShip.name).toEqual('shippy mcshipface');
});
