import React, { Component } from 'react';
import SquareValue from './utility/squareObj';
import Checker from './utility/gameChecker';
import Board from './components/game-board/board';
import './App.css';
import SquareContext from './contexts/square-context';
import HistoryBoard from './components/history-board/history-board';

class App extends Component {
  constructor(props) {
    super(props);
    var boardSquares = this.getBlankBoard();
    this.state = {
      currentStep: 0,
      history: [],
      boardSquares: boardSquares,
      player: 1,
      win: false,
    }
  }
  getBlankBoard = () => {
    let arr = new Array(20).fill(0);
    for (var i = 0; i < arr.length; i++) {
      arr[i] = new Array(20);
      for (var j = 0; j < arr[i].length; j++) {
        arr[i][j] = new SquareValue(0, i * 10 * 2 + j, i, j);
      }
    }
    return arr;
  }
  init = () => {
    var boardSquares = this.getBlankBoard();
    console.log(boardSquares);
    this.setState()
    this.setState({
      boardSquares: boardSquares,
      player: 1,
      win: false,
      history: []
    });
  }
  checkWin = (square) => {
    //console.log('square checkwin', square);
    //Checker.check(square, this.state.squares);
    const result = Checker.check(square, this.state.boardSquares)
    if (result.length > 0) {
      let newBoard = this.state.boardSquares.map(squareRow => {
        squareRow.map(square => {
          square.isSelected = false;
          result.forEach(r => {
            if (square.equal(r)) {
              square.select();
            }
          })
          return square;
        })
        return squareRow;

      })
      this.setState({
        win: true,
        boardSquares: newBoard
      })
    }
  }
  handleClick = (square) => {
    const squaresBoard = this.state.boardSquares.map((squareRow) => {
      squareRow.map(squareM => {
        squareM.isSelected = false;
        if (squareM.equal(square)) {
          //console.log('map', squareM);
          if (squareM.value === 0) {
            squareM.value = this.state.player;
            squareM.select();
            this.checkWin(squareM);
            let newHis = [];
            if (this.state.currentStep < this.state.history.length) {
              newHis = this.state.history.slice(0, this.state.currentStep)
            } else {
              newHis = [...this.state.history]
            }
            this.setState({
              history: [...newHis, {
                location: square.key,
                player: this.state.player
              }],
              player: this.state.player === 1 ? 2 : 1,
              currentStep: this.state.currentStep + 1,
            });
            //console.log('player', this.state.player)
          }
        }
        return squareM;
      })
      return squareRow;
    })

    this.setState({ boardSquares: squaresBoard });
  }
  backToStep = (step) => {
    const newBoardHistory = this.getBlankBoard();
    const history = this.state.history;
    for (let i = 0; i < step; i++) {
      const lo = history[i].location;
      newBoardHistory.map(boardRow => {
        boardRow.map(square => {
          square.isSelected = false;
          if (square.key === lo) {
            square.value = history[i].player;
            square.select();
          }
          return square;
        })
        return boardRow;
      })
    }
    console.log(step);
    let player = 1;
    if (step !== 0) {
      player = this.state.history[step - 1].player === 1 ? 2 : 1;
    }
    this.setState({
      boardSquares: newBoardHistory,
      player: player,
      currentStep: step
    })
  }
  back = () => {
    if (this.state.currentStep > 0) {
      this.backToStep(this.state.currentStep - 1);
    }
  }
  forward = () => {
    if (this.state.currentStep < this.state.history.length) {
      this.backToStep(this.state.currentStep + 1);
    }
  }
  render = () => (
    <div className="game">
      {this.state.win ? <div>
        <h1>Congratulation Player {this.state.player === 1 ? 'O' : 'X'}</h1>
      </div>
        : null
      }
      <button onClick={this.init}>Play again</button>
      <SquareContext.Provider value={
        {
          value: 1,
          onSquareClick: (square) => this.handleClick(square)
        }
      }>
        <Board squares={this.state.boardSquares}
          win={this.state.win}
          player={this.state.player}
        />
      </SquareContext.Provider>
      {
        this.state.win === false ?
          <ol>
            <HistoryBoard current={this.state.currentStep} step={this.state.history.length} backToStep={(step) => this.backToStep(step)}></HistoryBoard>
          </ol> : null
      }
      <ol>
        <li>
          <button onClick={this.back}> Step back </button>
          <button onClick={this.forward}> Step forward </button>
        </li>
      </ol>
    </div>
  );
}

export default App;
