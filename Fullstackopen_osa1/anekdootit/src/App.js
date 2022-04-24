import React, { useState, useEffect, useCallback } from 'react';

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 })
  const [mostVoted, setMostVoted] = useState("")
  const [highestPoints, setHighestPoints] = useState(0)
  
  const handleVote = () => {
    const copy = { ...points }
    copy[selected] += 1
    setPoints(copy)
  }

  const handleMostVoted = useCallback(() => {

    let tempArray = Object.entries(points)
    let key = 0
    let value = 0

    for (let i = 0; i <= 5; i++) {
      if (tempArray[i][1] >= value) {
        key = parseInt(tempArray[i][0])
        value = tempArray[i][1]
      }
    }
    setMostVoted(key);
    setHighestPoints(value);
  }, [points]);

  useEffect(() => {
    handleMostVoted()
  }, [points, handleMostVoted])

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}<br />
      <p>has {points[selected]} votes</p>
      <button onClick={handleVote}>vote</button>
      <button onClick={() => setSelected(Math.floor(Math.random() * 6))}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      {anecdotes[mostVoted]}
      <p>has {highestPoints} votes</p>
    </div>
  )
}

export default App
