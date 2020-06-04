const GameBoard = () => {
    let rows = new Array(10).fill(new Array(10).fill(false))

    const addShip = (length, coordinates, direction) => {
        let success = false

        if (coordinates.x != null && coordinates.y != null && coordinates.x >= 0 && coordinates.x <= 10 && coordinates.y >= 0 && coordinates.y <= 10) {
            switch (direction) {
            case 'up':
                success = true
                break
            case 'down':
                success = true
                break
            case 'left':
                success = true
                break
            case 'right':
                success = true
                break
            default:
                throw new Error('Invalid ship direction')
            }
        }
        return success
    }

    return {addShip}
}

export {GameBoard}