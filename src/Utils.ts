import Ship from './models/Ship'

export class ShipBuilder {
  private static id = 0

  static build (name?: string): Ship {
    ShipBuilder.id += 1

    if (!name) {
      name = `Ship#${ShipBuilder.id}`
    }
    return {
      id: ShipBuilder.id,
      name: name,
      tasks: [
        { id: 1, text: 'first', status: 'incomplete' },
        { id: 2, text: 'second', status: 'incomplete' }
      ]
    }
  }
}
