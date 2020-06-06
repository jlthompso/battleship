import {PlayerFactory} from '../player'

test('Formats player name', () => {
    expect(PlayerFactory('jOhn smITh*', 'user').getName()).toBe('John Smith*')
})

test('Tracks score', () => {
    let player = PlayerFactory('test')
    player.addPoint()
    player.addPoint()
    expect(player.getScore()).toBe(2)
})

test('Creates bot player', () => {
    expect(PlayerFactory('test', 'bot').isBot()).toBe(true)
})