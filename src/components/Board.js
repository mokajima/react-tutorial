import React from 'react';
import { calculateWinner } from '../utils/helpers';
import Square from './Square';

class Board extends React.Component {
  renderSquare(i) {
    const { squares } = this.props
    const winner = calculateWinner(squares)

    return (
      <Square
        key={i}
        value={squares[i]}
        onClick={() => this.props.onClick(i)}
        isHighlighted={winner && winner.line.includes(i)}
      />
    );
  }

  createBoard = () => {
    const board = [];

    for (let i = 0; i < 3; i++) {
      const children = [];

      for (let j = 0; j < 3; j++) {
        children.push(this.renderSquare(3 * i + j));
      }

      board.push(<div key={i} className="board-row">{children}</div>);
    }

    return board;
  }

  render() {
    return (
      <div>
        {this.createBoard()}
      </div>
    );
  }
}

export default Board;
