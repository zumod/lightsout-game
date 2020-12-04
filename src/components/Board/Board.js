import React, { Component } from 'react';
import './Board.css';
import Cell from '../Cell/Cell';
import win from '../../assets/win.mp3';

const winSound = new Audio(win);
const cellClick = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');

class Board extends Component {
	static defaultProps = {
		nrows: 5,
		ncols: 5,
		chance: 0.25
	};
	state = {
		hasWon: false,
		board: this.createBoard(),
		clicks: 0
	};
	countClicks = () => {
		this.setState((cs) => ({ clicks: cs.clicks + 1 }));
		cellClick.play();
	};
	createBoard() {
		let board = [];
		for (let i = 0; i < this.props.nrows; i++) {
			let row = [];
			for (let j = 0; j < this.props.ncols; j++) {
				//row.push(Math.random() < this.props.chance);
				row.push(1);
			}
			board.push(row);
		}
		return board;
	}

	lightCellsAround(coord) {
		let { ncols, nrows } = this.props;
		let board = this.state.board;
		let [ i, j ] = coord.split('-').map(Number);

		function lightCell(i, j) {
			if (j >= 0 && j < ncols && i >= 0 && i < nrows) {
				board[i][j] = !board[i][j];
			}
		}

		lightCell(i, j);
		lightCell(i, j - 1);
		lightCell(i, j + 1);
		lightCell(i - 1, j);
		lightCell(i + 1, j);

		let hasWon = board.every((row) => row.every((cell) => !cell));
		this.setState({ board: board, hasWon: hasWon });
	}

	render() {
		if (this.state.hasWon) {
			winSound.play();
			return <h1 className="neon-blue">You Won</h1>;
		}

		let tableBoard = [];
		for (let i = 0; i < this.props.nrows; i++) {
			let row = [];
			for (let j = 0; j < this.props.ncols; j++) {
				let coord = `${i}-${j}`;
				row.push(
					<Cell
						key={coord}
						isLit={this.state.board[i][j]}
						lightCellsAroundMe={() => this.lightCellsAround(coord)}
					/>
				);
			}
			tableBoard.push(<tr key={i}>{row}</tr>);
		}
		return (
			<div>
				<h1 className="neon-blue">
					Li<span className="letter">g</span>ht<span className="letter">s</span> O<span className="letter">u</span>t
				</h1>
				<div className="info">
					Win the game by switching all the lights off, preferably in as few button presses as possible.
					Pressing any of the lights will toggle it and the adjacent lights.
				</div>
				<p className="score">Moves: {this.state.clicks}</p>
				<table onClick={this.countClicks} className="Board">
					<tbody>{tableBoard}</tbody>
				</table>
			</div>
		);
	}
}

export default Board;
