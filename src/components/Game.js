import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import { calculateWinner } from '../utils/helpers';
import Board from './Board';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          location: null
        }
      ],
      stepNumber: 0,
      xIsNext: true,
      sort: 'ASC'
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares,
          location: i
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  toggleSort() {
    this.setState(prevState => ({
      sort: prevState.sort === 'ASC' ? 'DESC' : 'ASC'
    }))
  }

  render() {
    const { history, stepNumber } = this.state;
    const current = history[stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const col = step.location % 3 + 1;
      const row = Math.floor(step.location / 3) + 1;

      const desc = move ?
        `Go to move #${move} (${col}, ${row})` :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>
            {stepNumber === move
              ? <strong>{desc}</strong>
              : <>{desc}</>
            }
          </button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner.mark;
    } else if (9 === stepNumber) {
      status = "Draw";
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <button onClick={() => this.toggleSort()}>
            <FontAwesomeIcon icon={faSort} />
          </button>
          <ol>
            {this.state.sort === 'ASC'
              ? <>{moves}</>
              : <>{moves.reverse()}</>
            }
          </ol>
        </div>
      </div>
    );
  }
}

export default Game;
