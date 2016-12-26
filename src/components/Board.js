import React from 'react';
import Row from './Row';

class Board extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      controlColor: 'red',
      controlColorValue: 0
    }

    this.increaseControlColorValue = this.increaseControlColorValue.bind(this);
    this.decreaseControlColorValue = this.decreaseControlColorValue.bind(this);
    this.startAnimation = this.startAnimation.bind(this);
    this.stopAnimation = this.stopAnimation.bind(this);
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

    this.setState({ controlColorValue: newColorValue });
  }

  decreaseControlColorValue() {
    const newColorValue = this.state.controlColorValue - 25;
    if (newColorValue < 0) { return }

    this.setState({ controlColorValue: newColorValue });
  }

  getNextColor() {
    switch(this.state.controlColor) {
      case 'red':
        return 'green'
      case 'green':
        return 'blue'
      case 'blue':
        return 'red'
      default:
        return this.state.controlColor
    }
  }

  startAnimation() {
    if (this.interval) { return }

    this.interval = setInterval(() => {
      if (this.state.controlColorValue + 25 > 255) {
        this.setState({
          controlColor: this.getNextColor(),
          controlColorValue: 0
        });
      } else {
        this.increaseControlColorValue();
      }
    })
  }

  stopAnimation() {
    clearInterval(this.interval);
    this.interval = null;
  }

  render() {
    const rows = this.getRows();

    return (
      <div className='board'>
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
        <div>
          <button onClick={this.startAnimation}>Start</button>
          <button onClick={this.stopAnimation}>Stop</button>
        </div>
      </div>
    )
  }
}

export default Board;

// startAnimation() {
//   if (this.interval) { return }
//   let increasing = true;
//
//   this.interval = setInterval(() => {
//     if (increasing) {
//       if (this.state.controlColorValue + 25 > 255) {
//         increasing = false;
//       } else {
//         this.increaseControlColorValue();
//       }
//     } else {
//       if (this.state.controlColorValue - 25 < 0) {
//         increasing = true;
//         const nextColor = this.getNextColor();
//         this.setState({ controlColor: nextColor });
//       } else {
//         this.decreaseControlColorValue();
//       }
//     }
//   }, 50);
// }
