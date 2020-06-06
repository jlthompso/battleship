import {GameBoardFactory} from '../game'

test('Misses ship', () => {
    let board = GameBoardFactory()
    let ship = board.addShip(5, {x: 0, y: 0}, 'right')
    board.receiveAttack({x: 9, y: 9})
    expect(ship.isSunk()).toBe(false)
})

test('Sinks down ship', () => {
    let board = GameBoardFactory()
    let ship = board.addShip(3, {x: 5, y: 5}, 'down')
    for (let i = 0; i < 3; i++) {
        board.receiveAttack({x: 5, y: 5 + i})
    }
    expect(ship.isSunk()).toBe(true)
})

test('Sinks up ship', () => {
    let board = GameBoardFactory()
    let ship = board.addShip(3, {x: 5, y: 5}, 'up')
    for (let i = 0; i < 3; i++) {
        board.receiveAttack({x: 5, y: 5 - i})
    }
    expect(ship.isSunk()).toBe(true)
})

test('Sinks right ship', () => {
    let board = GameBoardFactory()
    let ship = board.addShip(3, {x: 5, y: 5}, 'right')
    for (let i = 0; i < 3; i++) {
        board.receiveAttack({x: 5 + i, y: 5})
    }
    expect(ship.isSunk()).toBe(true)
})

test('Sinks left ship', () => {
    let board = GameBoardFactory()
    let ship = board.addShip(3, {x: 5, y: 5}, 'left')
    for (let i = 0; i < 3; i++) {
        board.receiveAttack({x: 5 - i, y: 5})
    }
    expect(ship.isSunk()).toBe(true)
})

test('Doesn\'t overlap ships', () => {
    let board = GameBoardFactory()
    board.addShip(3, {x: 5, y: 5}, 'down')
    expect(board.addShip(3, {x: 4, y: 6}, 'right')).toBe('occupied')
})

test('Rejects repeat attack', () => {
    let board = GameBoardFactory()
    board.receiveAttack({x: 5, y: 5})
    expect(board.receiveAttack({x: 5, y: 5})).toBe('duplicate')
})

test('Tracks number of remaining ships', () => {
    let board = GameBoardFactory()
    board.addShip(3, {x: 5, y: 5}, 'down')
    expect(board.remainingShips()).toBe(1)
    for (let i = 0; i < 3; i++) {
        board.receiveAttack({x: 5, y: 5 + i})
    }
    expect(board.remainingShips()).toBe(0)
})