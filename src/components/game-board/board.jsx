import React from 'react';
import Square from '../game-square/square';
import './board.css';
import { thisExpression } from '@babel/types';

class Board extends React.Component {

    renderSquare = (square) => {
        return <Square
            isSelected={square.isSelected}
            squareObj={square}
            value={square.value} key={square.key}
        />;
    }
    renderRow = (squareRow) => {
        return (
            <div className='board-row' key={'row' + squareRow[0].key}>
                <div>
                    {squareRow.map(square => this.renderSquare(square))}
                </div>
                <br></br>
            </div>
        )
    }
    render() {
        if (false) {
            let winner = this.props.player === 1 ? 'O' : 'X';
            return (
                <div>
                    <h1>Congratulation Player {winner}</h1>
                    {/* <button onClick={this.init}>Play again</button> */}
                </div>
            )
        } else
            return (
                <div>
                    
                    <div className="game-info">
                        <h1>{this.props.player === 1 ? 'X' : 'O'}</h1>
                    </div>
                    <div>
                        {this.props.squares.map(squareRow => this.renderRow(squareRow))}
                    </div>
                </div>
            );
    }
}
export default Board;