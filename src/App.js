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
  constructor(props) {
    super(props)
    this.players = [
      {gameboard: GameBoardFactory(), player: PlayerFactory('joe', 'user')},
      {gameboard: GameBoardFactory(), player: PlayerFactory('b@tt13 b0t', 'bot')}
    ]

    this.state = {
      player: this.players[0].gameboard.getState(),
      enemy: this.players[1].gameboard.getState() 
    }
  }

  renderSquare (player, x, y, displayStyle) {
    switch (displayStyle) {
      case 'player':
        return(
          <PlayerSquare
            value = {player[x][y]}
          />
        )
      case 'enemy':
        return(
          <EnemySquare
            value = {player[x][y]}
          />
        )
      default:
        break
    }
  }

  renderRow (player, x, displayStyle) {
    return (
      <div className='row'>
        {player[x].map((value, index) => {
          return this.renderSquare(player, x, index, displayStyle)
        })}
      </div>
    )
  }

  render () {
    return (
      <div className='container'>
        <div className='gameboard'>
          <div className='playerHeader'>Your Ships</div>
          {this.state.player.map((value, index) => {
            return this.renderRow(this.state.player, index, 'player')
          })}
        </div>
        <div className='gameboard'>
          <div className='playerHeader'>Enemy Ships</div>
          {this.state.enemy.map((value, index) => {
            return this.renderRow(this.state.player, index, 'enemy')
          })}
        </div>
      </div>
    )
  }
}

class EnemySquare extends React.Component {
  render () {
    return (
      <button className='enemySquare'></button>
    )
  }
}

class PlayerSquare extends React.Component {
  render () {
    return (
      <div className='playerSquare'></div>
    )
  }
}

export default App
