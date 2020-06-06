import {ShipFactory} from './ship'

const GameBoardFactory = () => {
    let grid = []
    for (let i = 0; i < 10; i++) {
        grid.push([])
        for (let j = 0; j < 10; j++) {
            grid[i].push('empty')
        }
    }
    let ships = []

    const addShip = (length, coordinates, direction) => {
        if ((direction === 'right' && coordinates.x + length > 10) || (direction === 'left' && coordinates.x - length < 0) || (direction === 'up' && coordinates.y + length < 0) || (direction === 'down' && coordinates.y - length > 10)) return 'invalid'

        let ship = ShipFactory(length)
        ships.push({coordinates, ship, direction})
        switch (direction) {
            case 'right':
                for (let i = 0; i < length; i++) {
                    grid[coordinates.x + i][coordinates.y] = ship
                }
                break
            case 'left':
                for (let i = 0; i < length; i++) {
                    grid[coordinates.x - i][coordinates.y] = ship
                }
                break
            case 'up':
                for (let i = 0; i < length; i++) {
                    grid[coordinates.x][coordinates.y - i] = ship
                }
                break
            case 'down':
                for (let i = 0; i < length; i++) {
                    grid[coordinates.x][coordinates.y + i] = ship
                }
                break
            default:
                break
        }
        return ship
    }

    const receiveAttack = attackCoordinates => {
        let target = grid[attackCoordinates.x][attackCoordinates.y]
        if (target === 'empty') {
            grid[attackCoordinates.x][attackCoordinates.y] = 'miss'
            return 'miss'
        } else if (target === 'miss' || target === 'hit') {
            return 'duplicate'
        } else {
            ships.forEach(placedShip => {
                if (placedShip.ship === target) {
                    switch (placedShip.direction) {
                        case 'right':
                            target.hit(attackCoordinates.x - placedShip.coordinates.x)
                            break
                        case 'left':
                            target.hit(placedShip.coordinates.x - attackCoordinates.x)
                            break
                        case 'up':
                            target.hit(placedShip.coordinates.y - attackCoordinates.y)
                            break
                        case 'down':
                            target.hit(attackCoordinates.y - placedShip.coordinates.y)
                            break
                        default:
                            break
                    }
                }
            })
            return 'hit'
        }
    }

    return {addShip, receiveAttack}
}

export {GameBoardFactory}