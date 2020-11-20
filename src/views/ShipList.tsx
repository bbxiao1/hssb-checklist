import React from 'react'
import Ship from '../models/Ship'

interface Props {
  ships: Ship[];
  didSelectShip: (ship: Ship) => void;
}

function ShipList (props: Props) {
  const ships = props.ships.map((ship) => {
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
  )
}

export default ShipList
