import React from 'react';

const Tile = ({ tile }) => {
  const style = {
    background: `rgb(${tile.red}, ${tile.green}, ${tile.blue})`
  }

  return (
    <div className='tile' style={style}></div>
  )
}

export default Tile;
