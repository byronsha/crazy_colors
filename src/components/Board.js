import React from 'react';
import Row from './Row';

class Board extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      controlColor: 'red',
      controlColorValue: 0
    }

    this.increaseControlColorValue = this.increaseControlColorValue.bind(this)
    this.decreaseControlColorValue = this.decreaseControlColorValue.bind(this)
  }

  getTile(i, j) {
    const controlColor = this.state.controlColor;
    const controlColorValue = this.state.controlColorValue;

    switch(controlColor) {
    case 'red':
      return {
        red: controlColorValue,
        green: i * 10,
        blue: j * 10
      }
    case 'green':
      return {
        red: j * 10,
        green: controlColorValue,
        blue: i * 10
      }
    case 'blue':
      return {
        red: i * 10,
        green: j * 10,
        blue: controlColorValue
      }
    default:
      return {
        red: 0,
        green: 0,
        blue: 0
      }
    }
  }

  getRows() {
    const tiles = [];
    const rows = [];
    const chunkSize = 25;

    for (let i = 0; i < 25; i++) {
      for (let j = 0; j < 25; j++) {
        let tile = this.getTile(i, j);
        tiles.push(tile);
      }
    }

    for (let i = 0; i < tiles.length; i += chunkSize) {
      let arrayChunk = tiles.slice(i, i + chunkSize);
      rows.push(arrayChunk);
    }

    return rows;
  }

  setControlColor(color) {
    this.setState({ controlColor: color })
  }

  increaseControlColorValue() {
    const newColorValue = this.state.controlColorValue + 25;
    if (newColorValue > 255) { return }

    this.setState({ controlColorValue: newColorValue })
  }

  decreaseControlColorValue() {
    const newColorValue = this.state.controlColorValue - 25;
    if (newColorValue < 0) { return }

    this.setState({ controlColorValue: newColorValue })
  }

  render() {
    const rows = this.getRows();

    return (
      <div className='container'>
        <div>
          {rows.map((row, idx) => {
            return <Row key={idx} row={row} />
          })}
        </div>
        <h3>{this.state.controlColor}: {this.state.controlColorValue}</h3>
        <div>
          <button onClick={() => this.setControlColor('red')}>Red</button>
          <button onClick={() => this.setControlColor('green')}>Green</button>
          <button onClick={() => this.setControlColor('blue')}>Blue</button>
        </div>
        <div>
          <button onClick={this.increaseControlColorValue}>+</button>
          <button onClick={this.decreaseControlColorValue}>-</button>
        </div>
      </div>
    )
  }
}

export default Board;
