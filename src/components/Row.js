import React from 'react';
import Tile from './Tile';

const Row = ({ row }) => (
  <div className='row'>
    {row.map((tile, idx) => {
      return <Tile key={idx} tile={tile} />
    })}
  </div>
)

export default Row;
