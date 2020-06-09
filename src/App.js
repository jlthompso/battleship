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

    this.fleet = [5, 4, 3, 2, 2, 1, 1]

    for (let i = 0; i < this.fleet.length; i++) {
      while(!this.placeRandomShip(0, this.fleet[i])) {}
      while(!this.placeRandomShip(1, this.fleet[i])) {}
    }
    
    for (let i = 0; i < this.players[0].gameboard.getState().length; i++) {
      console.log(this.players[0].gameboard.getState()[i].length)
    }
  }

  handleClick (x, y) {
    if (this.players[1].gameboard.receiveAttack({x, y}) !== 'duplicate') {
      this.setState({playerIsNext: !this.state.playerIsNext})
    if (!this.players[1].gameboard.remainingShips()) {
      alert(`${this.players[0].player.getName()} wins!`)
      window.location.reload()
    }
    while (this.players[0].gameboard.receiveAttack({x: this.getRandomInt(10), y: this.getRandomInt(10)}) === 'duplicate') {}
    if (!this.players[0].gameboard.remainingShips()) {
      alert(`${this.players[1].player.getName()} wins!`)
      window.location.reload()
    }
    this.setState({playerIsNext: !this.state.playerIsNext})
    }
  }

  getRandomInt (max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  placeRandomShip (player, length) {
    let x = this.getRandomInt(10)
    let y = this.getRandomInt(10)
    let directions = ['up', 'down', 'right', 'left']
    return typeof(this.players[player].gameboard.addShip(length, {x, y}, directions[this.getRandomInt(4)])) === 'object'
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
        <table>
          <thead>
            <tr>
              <th>Aircraft Carrier</th>
              <th>Battleship</th>
              <th>Cruiser</th>
              <th>Destroyer</th>
              <th>Submarine</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className='ship' id='carrier1'>
                  <div className='occupiedGridSquare'></div>
                  <div className='occupiedGridSquare'></div>
                  <div className='occupiedGridSquare'></div>
                  <div className='occupiedGridSquare'></div>
                  <div className='occupiedGridSquare'></div>
                </div>
              </td>
              <td>
                <div className='ship' id='battleship1'>
                  <div className='occupiedGridSquare'></div>
                  <div className='occupiedGridSquare'></div>
                  <div className='occupiedGridSquare'></div>
                  <div className='occupiedGridSquare'></div>
                </div>
              </td>
              <td>
                <div className='ship' id='cruiser1'>
                  <div className='occupiedGridSquare'></div>
                  <div className='occupiedGridSquare'></div>
                  <div className='occupiedGridSquare'></div>
                </div>
              </td>
              <td>
                <div className='ship' id='destroyer1'>
                  <div className='occupiedGridSquare'></div>
                  <div className='occupiedGridSquare'></div>
                </div>
                <div className='ship' id='destroyer2'>
                  <div className='occupiedGridSquare'></div>
                  <div className='occupiedGridSquare'></div>
                </div>
              </td>
              <td>
                <div className='ship' id='submaring1'>
                  <div className='occupiedGridSquare'></div>
                </div>
                <div className='ship' id='submaring1'>
                  <div className='occupiedGridSquare'></div>
                </div>
              </td>
            </tr>
            
          </tbody>
        </table>
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
