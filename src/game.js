import {ShipFactory} from './ship'

const GameBoardFactory = () => {
    let rows = new Array(10).fill(new Array(10).fill(false))
    let ships = []

    const addShip = (length, coordinates, direction) => {
        let success = null

        if (coordinates.x + length <= 10 && coordinates.y + length <= 10) {
            let ship = ShipFactory(length)
            ships.push({coordinates, ship, direction})
            success = ship
        }
        return success
    }

    const receiveAttack = attackCoordinates => {
        ships.forEach(placedShip => {
            switch (placedShip.direction) {
                case 'right':
                    for (let i = 0; i < placedShip.ship.getLength(); i++) {
                        if (((placedShip.coordinates.x + i) === attackCoordinates.x) && (placedShip.coordinates.y === attackCoordinates.y)) placedShip.ship.hit(i)
                    }
                    break
                case 'left':
                    for (let i = 0; i < placedShip.ship.getLength(); i++) {
                        if (((placedShip.coordinates.x - i) === attackCoordinates.x) && (placedShip.coordinates.y === attackCoordinates.y)) placedShip.ship.hit(i)
                    }
                    break
                case 'up':
                    for (let i = 0; i < placedShip.ship.getLength(); i++) {
                        if ((placedShip.coordinates.x === attackCoordinates.x) && ((placedShip.coordinates.y - i) === attackCoordinates.y)) placedShip.ship.hit(i)
                    }
                    break
                case 'down':
                    for (let i = 0; i < placedShip.ship.getLength(); i++) {
                        if ((placedShip.coordinates.x === attackCoordinates.x) && ((placedShip.coordinates.y + i) === attackCoordinates.y)) placedShip.ship.hit(i)
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