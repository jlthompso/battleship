import ShipFactory from './ship'

const GameBoardFactory = () => {
    let grid = []
    for (let i = 0; i < 10; i++) {
        grid.push([])
        for (let j = 0; j < 10; j++) {
            grid[i].push(' ')
        }
    }
    let ships = []

    const addShip = (length, coordinates, direction) => {
        if ((direction === 'right' && coordinates.x + length > 10) || (direction === 'left' && coordinates.x - length < -1) || (direction === 'up' && coordinates.y - length < -1) || (direction === 'down' && coordinates.y + length > 10)) return 'invalid'

        for (let i = 0; i < length; i++) {
            switch (direction) {
                case 'right':
                    for (let i = 0; i < length; i++) {
                        if (typeof(grid[coordinates.x + i][coordinates.y]) === 'object') return 'occupied'
                    }
                    break
                case 'left':
                    for (let i = 0; i < length; i++) {
                        if (typeof(grid[coordinates.x - i][coordinates.y]) === 'object') return 'occupied'
                    }
                    break
                case 'up':
                    for (let i = 0; i < length; i++) {
                        if (typeof(grid[coordinates.x][coordinates.y - i]) === 'object') return 'occupied'
                    }
                    break
                case 'down':
                    for (let i = 0; i < length; i++) {
                        if (typeof(grid[coordinates.x][coordinates.y + i]) === 'object') return 'occupied'
                    }
                    break
                default:
                    break
            }
        }

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
        if (target === ' ') {
            grid[attackCoordinates.x][attackCoordinates.y] = '/'
            return 'miss'
        } else if (target === '/' || target === 'X') {
            return 'duplicate'
        } else {
            ships.forEach(placement => {
                if (placement.ship === target) {
                    switch (placement.direction) {
                        case 'right':
                            target.hit(attackCoordinates.x - placement.coordinates.x)
                            grid[attackCoordinates.x][attackCoordinates.y] = 'X'
                            break
                        case 'left':
                            target.hit(placement.coordinates.x - attackCoordinates.x)
                            grid[attackCoordinates.x][attackCoordinates.y] = 'X'
                            break
                        case 'up':
                            target.hit(placement.coordinates.y - attackCoordinates.y)
                            grid[attackCoordinates.x][attackCoordinates.y] = 'X'
                            break
                        case 'down':
                            target.hit(attackCoordinates.y - placement.coordinates.y)
                            grid[attackCoordinates.x][attackCoordinates.y] = 'X'
                            break
                        default:
                            break
                    }
                }
            })
            return 'hit'
        }
    }

    const remainingShips = () => {
        let count = 0
        ships.forEach(placement => {
            if (!placement.ship.isSunk()) count++
        })
        return count
    }

    const getState = () => grid

    return {addShip, receiveAttack, remainingShips, getState}
}

export default GameBoardFactory
