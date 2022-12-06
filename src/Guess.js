import React from 'react'
import Tile from './Tile'
import {v4 as uuid} from 'uuid'

export default function Guess({ guess }) {
  const mytiles = []
  for (let i = 0; i < 5; i++) {
    mytiles.push(
    {
        id: uuid(),
        letter: guess.tiles[i].letter,
        state: guess.tiles[i].state
    }
    )
  }
  return (
    <div className='row'>
        {
            mytiles.map(tile => {
            return <Tile key={tile.id} tile={tile} className="tile" />
            })
        }
    </div>
  )
}
