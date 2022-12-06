import React from 'react'

export default function Tile({tile}) {
  const t = "col tile "+tile.state
  return (
    <div className={t}>{tile.letter}</div>
  )
}
