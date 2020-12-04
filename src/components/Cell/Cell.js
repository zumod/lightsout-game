import React, { Component } from 'react';
import './Cell.css';

class Cell extends Component {
	handleClick = (e) => {
		this.props.lightCellsAroundMe();
	};

	render() {
		let classes = 'Cell ' + (this.props.isLit ? 'Cell-lit' : '');
		return <td className={classes} onClick={this.handleClick} />;
	}
}

export default Cell;
