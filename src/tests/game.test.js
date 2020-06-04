import {GameBoard} from '../game'

test('Places ship', () => {
    expect(GameBoard().addShip(3, {x: 5, y: 5}, 'right')).toBe(true)
    expect(GameBoard().addShip(3, {x: 5, y: 5}, 'left')).toBe(true)
    expect(GameBoard().addShip(3, {x: 5, y: 5}, 'up')).toBe(true)
    expect(GameBoard().addShip(3, {x: 5, y: 5}, 'down')).toBe(true)
})

test('Doesn\'t place ship outside of gameboard', () => {
    expect(GameBoard().addShip(3, {x: 0, y: 11}, 'right')).toBe(false)
    expect(GameBoard().addShip(3, {x: 11, y: 0}, 'left')).toBe(false)
    expect(GameBoard().addShip(3, {x: 0, y: -1}, 'up')).toBe(false)
    expect(GameBoard().addShip(3, {x: -1, y: 0}, 'down')).toBe(false)
    expect(GameBoard().addShip(3, {x: -1, y: -1}, 'down')).toBe(false)
})

test('Doesn\'t place ship with empty coordinates', () => {
    expect(GameBoard().addShip(3, {}, 'right')).toBe(false)
    expect(GameBoard().addShip(3, {x: null, y: 1}, 'right')).toBe(false)
    expect(GameBoard().addShip(3, {x: 1, y: null}, 'right')).toBe(false)
    expect(GameBoard().addShip(3, {x: undefined, y: 1}, 'right')).toBe(false)
    expect(GameBoard().addShip(3, {x: 1, y: undefined}, 'right')).toBe(false)
    
})

test('Doesn\'t place ship inappropriately', () => {
    expect(GameBoard().addShip(10, {x: 5, y: 5}, 'right')).toBe(false)
    expect(GameBoard().addShip(10, {x: 5, y: 5}, 'left')).toBe(false)
    expect(GameBoard().addShip(10, {x: 5, y: 5}, 'up')).toBe(false)
    expect(GameBoard().addShip(10, {x: 5, y: 5}, 'down')).toBe(false)
})