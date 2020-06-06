import {ShipFactory} from './ship'

const GameBoardFactory = () => {
    let grid = new Array(10).fill(new Array(10).fill(false))
    // grid is initialized with null values
    // false indicates a miss
    // ship objects are copied into all squares they occupy
    // hits are recorded by the occupying ship
    let ships = []

    const addShip = (length, coordinates, direction) => {
        let success = null

        if (((coordinates.x + length) <= 10) && ((coordinates.y + length) <= 10) {
            let ship = ShipFactory(length)
            ships.push({coordinates, ship, direction})
            success = ship
        }
        return success
    }

    const receiveAttack = attackCoordinates => {
        let x = attackCoordinates.x
        let y = attackCoordinates.y
        if (grid[x][y]) {
            return false
        } else {
            grid[x][y] = true
        }

        ships.forEach(placedShip => {
            switch (placedShip.direction) {
                case 'right':
                    for (let i = 0; i < placedShip.ship.getLength(); i++) {
                        if (((placedShip.coordinates.x + i) === x) && (placedShip.coordinates.y === y)) placedShip.ship.hit(i)
                    }
                    break
                case 'left':
                    for (let i = 0; i < placedShip.ship.getLength(); i++) {
                        if (((placedShip.coordinates.x - i) === x) && (placedShip.coordinates.y === y)) placedShip.ship.hit(i)
                    }
                    break
                case 'up':
                    for (let i = 0; i < placedShip.ship.getLength(); i++) {
                        if ((placedShip.coordinates.x === x) && ((placedShip.coordinates.y - i) === y)) placedShip.ship.hit(i)
                    }
                    break
                case 'down':
                    for (let i = 0; i < placedShip.ship.getLength(); i++) {
                        if ((placedShip.coordinates.x === x) && ((placedShip.coordinates.y + i) === y)) placedShip.ship.hit(i)
                    }
                    break
                default:
                    break
            }
        })
    }

    return {addShip, receiveAttack}
}

export {GameBoardFactory}