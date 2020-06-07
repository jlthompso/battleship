import React from 'react'
import logo from './logo.svg'
import './App.css'
import GameBoardFactory from './game'
import PlayerFactory from './player'

function App() {
  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <Game />
    </div>
  )
}

class Game extends React.Component {
  constructor (props) {
    super(props)

    this.state = {}
    this.state.player1 = {player: PlayerFactory('joe', 'user'), gameboard: GameBoardFactory()}
    this.state.player2 = {player: PlayerFactory('b@tt13 b0t', 'bot'), gameboard: GameBoardFactory()}

    this.state.player2.gameboard.addShip(5, {x: 0, y: 0}, 'right')
  }

  handleClick (x, y) {
    this.state.player2.gameboard.receiveAttack({x, y})
    this.forceUpdate()
  }

  render () {
    let enemySquares = []
    for (let x = 0; x < this.state.player2.gameboard.getState().length; x++) {
      for (let y = 0; y < this.state.player2.gameboard.getState()[x].length; y++) {
        enemySquares.push(<EnemySquare
          value={this.state.player2.gameboard.getState()[x][y]}
          onClick={() => this.handleClick(x, y)}
        />)
      }
    }

    return (
      <div id='container'>
        <div className='gameboard'>
          <h2>Your Ships</h2>
          <div className='grid'>

          </div>
        </div>
        <div className='gameboard'>
          <h2>Enemy Ships</h2>
          <div className='grid'>
            {enemySquares}
          </div>
        </div>
      </div>
    )
  }
}

function EnemySquare (props) {
  return (
    <button className='gridButton' onClick={() => props.onClick()}>
      {typeof(props.value) === 'object' ? ' ' : props.value}
    </button>
  )
}

export default App
