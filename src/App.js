import React, { useState, useRef, useEffect } from 'react';
import GuessList from './GuessList';
import {v4 as uuid} from 'uuid'
import axios from 'axios';
import './App.css';

function App() {
  const [currentWordy, setCurrentWordy] = useState(1)
  const [guesses, setGuesses] = useState([])
  const [message, setMessage] = useState()
  const guessRef = useRef()

  const LOCAL_STORAGE_KEY = 'wordyApp.guesses'

  useEffect(() => {
    const storedGuesses = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedGuesses) setGuesses(storedGuesses)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(guesses))
  }, [guesses])

  function handleGuess(e) {

    if (e.key !== 'Enter') return

    const guess = guessRef.current.value
    if (guess === '') return

    const reqGuesses = guesses.map(guess => guess.word)
    reqGuesses.push(guess)
    const reqBody = { guesses: reqGuesses };

    axios.post("https://stage-hackathon.expedient.com/api/wordy/"+currentWordy+"/play", JSON.stringify(reqBody), {
      auth: {
        username: "testuser",
        password: "testpass",
      }
    }).then(res => {
      setMessage()
      const state = []

      if (res.data.data.state === "solved") {
        setMessage("Solved!")
      }

      for (let i = 0; i < 6; i++) {
        if (typeof res.data.data.guesses[i] != "undefined") {
          state.push(
            {
              id: uuid(),
              word: res.data.data.guesses[i].word,
              tiles: res.data.data.guesses[i].tiles
            }
          )
        }
      }
      console.log(state)
      setGuesses(state)
      guessRef.current.value = null

    }).catch(error => {
      setMessage(error.response.data.error)
      console.error('There was an error!', error)
    })
  }

  function handleClearGame(e) {
    setMessage()
    guessRef.current.value = null
    setGuesses([])
  }
  
  function handleNextPuzzle(e) {
    setMessage()
    guessRef.current.value = null
    setGuesses([])
    setCurrentWordy(currentWordy + 1)
  }

  return (
    <>
    <div className='mt-5 mb-2'>Puzzle #{currentWordy}
      <button onClick={handleNextPuzzle}>Next Puzzle</button>
      <button onClick={handleClearGame}>Clear Game</button>
    </div>
    <div className='my-3'>
      <input ref={guessRef} type="text" onKeyDown={handleGuess} />
      <button onClick={handleGuess}>Guess</button>
    </div>
    <GuessList guesses={guesses} />
    <div>{message}</div>
    </>
  );
}

export default App;