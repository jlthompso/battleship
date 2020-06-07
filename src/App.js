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

    this.state = {playerIsNext: false}

    this.players = []
    this.players.push({player: PlayerFactory('joe', 'user'), gameboard: GameBoardFactory()})
    this.players.push({player: PlayerFactory('b@tt13 b0t', 'bot'), gameboard: GameBoardFactory()})

    this.players[0].gameboard.addShip(5, {x: 0, y: 0}, 'right')
    this.players[0].gameboard.addShip(3, {x: 5, y: 5}, 'down')

    this.players[1].gameboard.addShip(5, {x: 0, y: 0}, 'right')
    this.players[1].gameboard.addShip(3, {x: 5, y: 5}, 'down')
  }

  handleClick (x, y) {
    this.players[1].gameboard.receiveAttack({x, y})
    this.setState({playerIsNext: !this.state.playerIsNext})
  }

  render () {
    let enemyGrid = []
    for (let x = 0; x < this.players[1].gameboard.getState().length; x++) {
      for (let y = 0; y < this.players[1].gameboard.getState()[x].length; y++) {
        enemyGrid.push(<EnemySquare
          value={this.players[1].gameboard.getState()[x][y]}
          onClick={() => this.handleClick(x, y)}
        />)
      }
    }

    let playerGrid = []
    for (let x = 0; x < this.players[0].gameboard.getState().length; x++) {
      for (let y = 0; y < this.players[0].gameboard.getState()[x].length; y++) {
        playerGrid.push(<PlayerSquare
          value={this.players[0].gameboard.getState()[x][y]}
        />)
      }
    }

    return (
      <div id='container'>
        <div className='gameboard'>
          <h2>Your Ships</h2>
          <div className='grid'>
            {playerGrid}
          </div>
          <h4>Remaining Ships: {this.players[0].gameboard.remainingShips()}</h4>
        </div>
        <div className='gameboard'>
          <h2>Enemy Ships</h2>
          <div className='grid'>
            {enemyGrid}
          </div>
          <h4>Remaining Ships: {this.players[1].gameboard.remainingShips()}</h4>
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

function PlayerSquare (props) {
  return (
    <div className={typeof(props.value) === 'object' ? 'occupiedGridSquare' : 'emptyGridSquare'}>
      {typeof(props.value) === 'object' ? ' ' : props.value}
    </div>
  )
}

export default App
