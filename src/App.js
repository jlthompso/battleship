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

    this.state = {
      playerIsNext: false,
      playerPlacedShips: 0
    }

    this.players = []
    let name
    do {name = prompt('Enter player name')} while (!name)
    this.players.push({player: PlayerFactory(name, 'user'), gameboard: GameBoardFactory()})
    this.players.push({player: PlayerFactory('b@tt13 b0t', 'bot'), gameboard: GameBoardFactory()})

    this.fleet = [5, 4, 3, 2, 2, 1, 1]

    for (let i = 0; i < this.fleet.length; i++) {
      while(!this.placeRandomShip(1, this.fleet[i])) {}
    }
    
    for (let i = 0; i < this.players[0].gameboard.getState().length; i++) {
      console.log(this.players[0].gameboard.getState()[i].length)
    }
  }

  handleClick (x, y) {
    if (this.state.playerPlacedShips < 7) {
      alert('Place all ships to start game.')
      return
    }

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

  handleDrop (e) {
    e.preventDefault()
    let data = JSON.parse(e.dataTransfer.getData('text'))
    let coordinates = JSON.parse(e.target.id)
    let length = data.length
    let id = data.id
    let direction
    data.className === 'hShip' ? direction = 'right' : direction = 'down'

    if (typeof(this.players[0].gameboard.addShip(length, coordinates, direction)) === 'object') {
      this.setState({playerPlacedShips: this.state.playerPlacedShips + 1})
      document.getElementById(id).style.display = 'none'
    }
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
          onDrop={(e) => this.handleDrop(e)}
          id={JSON.stringify({x, y})}
        />)
      }
    }

    return (
      <div id='container'>
        <div className='gameboard' id='player'>
          <h2>Your Ships</h2>
          <div className='grid'>
            {playerGrid}
          </div>
          <h4>Remaining Ships: {this.players[0].gameboard.remainingShips()}</h4>
        </div>
        <div className='gameboard' id='enemy'>
          <h2>Enemy Ships</h2>
          <div className='grid'>
            {enemyGrid}
          </div>
          <h4>Remaining Ships: {this.players[1].gameboard.remainingShips()}</h4>
        </div>
        <div id='ships'>
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
                  <Ship value='carrier' id='carrier1'/>
                </td>
                <td>
                  <Ship value='battleship' id='battleship1'/>
                </td>
                <td>
                  <Ship value='cruiser' id='cruiser1' />
                </td>
                <td>
                  <Ship value='destroyer' id='destroyer1' />
                  <Ship value='destroyer' id='destroyer2' />
                </td>
                <td>
                  <Ship value='submarine' id='submarine1' />
                  <Ship value='submarine' id='submarine2' />
                </td>
              </tr>
              
            </tbody>
          </table>
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
    <div className={typeof(props.value) === 'object' ? 'occupiedGridSquare' : 'emptyGridSquare'} onDragOver={(e) => {e.preventDefault()}} onDrop={(e) => props.onDrop(e)} id={props.id}>
      {typeof(props.value) === 'object' ? ' ' : props.value}
    </div>
  )
}

class Ship extends React.Component {
  constructor(props) {
    super(props)

    this.state = {shipIsHorizontal: true}

    this.squares = []
    this.length = null
    switch(props.value) {
      case 'carrier':
        this.length = 5
        break
      case 'battleship':
        this.length = 4
        break
      case 'cruiser':
        this.length = 3
        break
      case 'destroyer':
        this.length = 2
        break
      case 'submarine':
        this.length = 1
        break
      default:
        this.length = 0
        break
    }

    for (let i = 0; i < this.length; i++) {
      this.squares.push(<div className='occupiedGridSquare'></div>)
    }
  }

  handleClick () {
    this.setState({shipIsHorizontal: !this.state.shipIsHorizontal})
  }

  handleDrag (e) {
    let data = JSON.stringify({
      className: e.target.className,
      length: this.length,
      id: this.props.id
    })
    e.dataTransfer.setData('text', data)
  }

  render () {
    return (
      <div className={this.state.shipIsHorizontal ? 'hShip' : 'vShip'} onClick={() => this.handleClick()} length={this.length} draggable='true' onDragStart={(e) => this.handleDrag(e)} id={this.props.id}>
        {this.squares}
      </div>
    )
  }
}

export default App
