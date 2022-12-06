import React from 'react'
import Guess from './Guess'

export default function GuessList({ guesses }) {
  return (
    <>
        <div className='container text-center game-board'>
            {
                guesses.map(guess => {
                return <Guess key={guess.id} guess={guess} />
                })
            }
        </div>
    </>
  )
}