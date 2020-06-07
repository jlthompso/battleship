const PlayerFactory = (name, type) => {
    let score = 0

    const addPoint = () => score++
    const getScore = () => score
    const getName = () => name
    const isBot = () => type === 'bot'

    let names = name.toLowerCase().split(' ')
    for (let i = 0; i < names.length; i++) {
        let chars = names[i].split('')
        chars[0] = chars[0].toUpperCase()
        names[i] = chars.join('')
    }
    name = names.join(' ')

    return {getName, addPoint, getScore, isBot}
}

export default PlayerFactory
