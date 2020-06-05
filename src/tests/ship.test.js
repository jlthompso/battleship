import {ShipFactory} from '../ship'

test('Correct ship length', () => {
    expect(ShipFactory(4).getLength()).toBe(4)
})

test('Doesn\'t sink ship', () => {
    let ship = ShipFactory(6)
    ship.hit(2)
    expect(ship.isSunk()).toBe(false)
})

test('Sinks ship', () => {
    let ship = ShipFactory(6)
    for (let i = 0; i < ship.getLength(); i++) {
        ship.hit(i)
    }
    expect(ship.isSunk()).toBe(true)
})