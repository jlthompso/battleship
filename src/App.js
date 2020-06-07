import React from 'react'
import logo from './logo.svg'
import './App.css'
import GameBoardFactory from './game'
import PlayerFactory from './player'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Game />
      </header>
    </div>
  )
}

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.gameBoard = GameBoardFactory()
    this.players = []
    this.players.push(PlayerFactory('joe', 'user'))
    this.players.push(PlayerFactory('b@tt13 b0t', 'bot'))
    this.state = {squares: this.gameBoard.getState()}
  }

  renderSquare (x, y) {
    return(
      <Square
        value = {this.state.squares[x][y]}
      />
    )
  }

  render () {
    return (
      <div>
        <div className='row'>
          {this.state.squares[0].map((value, index) => {
            return this.renderSquare(index)
          })}
        </div>
        <div className='row'>
          {this.state.squares[1].map((value, index) => {
            return this.renderSquare(index)
          })}
        </div>
        <div className='row'>
          {this.state.squares[2].map((value, index) => {
            return this.renderSquare(index)
          })}
        </div>
        <div className='row'>
          {this.state.squares[3].map((value, index) => {
            return this.renderSquare(index)
          })}
        </div>
        <div className='row'>
          {this.state.squares[4].map((value, index) => {
            return this.renderSquare(index)
          })}
        </div>
        <div className='row'>
          {this.state.squares[5].map((value, index) => {
            return this.renderSquare(index)
          })}
        </div>
        <div className='row'>
          {this.state.squares[6].map((value, index) => {
            return this.renderSquare(index)
          })}
        </div>
        <div className='row'>
          {this.state.squares[7].map((value, index) => {
            return this.renderSquare(index)
          })}
        </div>
        <div className='row'>
          {this.state.squares[8].map((value, index) => {
            return this.renderSquare(index)
          })}
        </div>
        <div className='row'>
          {this.state.squares[9].map((value, index) => {
            return this.renderSquare(index)
          })}
        </div>
      </div>
    )
  }
}

class Square extends React.Component {
  render () {
    return (
      <button className='square'></button>
    )
  }
}

export default App
