import {GameBoardFactory} from '../game'

test('Misses ship', () => {
    let board = GameBoardFactory()
    let ship = board.addShip(5, {x: 0, y: 0}, 'right')
    board.receiveAttack({x: 9, y: 9})
    expect(ship.isSunk()).toBe(false)
})

test('Sinks ship', () => {
    let board = GameBoardFactory()
    let ship = board.addShip(3, {x: 5, y: 5}, 'down')
    for (let i = 0; i < 3; i++) {
        board.receiveAttack({x: 5, y: 5 + i})
    }
    expect(ship.isSunk()).toBe(true)
})

test('Doesn\'t overlap ships', () => {
    let board = GameBoardFactory()
    board.addShip(3, {x: 5, y: 5}, 'down')
    expect(board.addShip(3, {x: 4, y: 6}, 'right')).toBe(null)
})

test('Rejects repeat attack', () => {
    let board = GameBoardFactory()
    board.receiveAttack({x: 5, y: 5})
    expect(board.receiveAttack({x: 5, y: 5})).toBe(false)
})