import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'
import Ship from './models/Ship'

test('prompts to select a ship by default', () => {
  const ships: Ship[] = []
  render(<App ships={ships}/>)
  const linkElement = screen.getByText(/Please select a ship/i)
  expect(linkElement).toBeInTheDocument()
})
