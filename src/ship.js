const ShipFactory = length => {
    if (!(length > 1 && length <= 10)) throw new Error('Invalid ship length')

    let squares = new Array(length).fill(false)

    const getLength = () => length

    const isSunk = () => {
        let sunk = true
        for (let square of squares) {
            if (!square) {
                sunk = false
                break
            }
        }
        return sunk
    }

    const hit = (i) => {
        squares[i] = true
    }

    return {isSunk, getLength, hit}
}

export {ShipFactory}