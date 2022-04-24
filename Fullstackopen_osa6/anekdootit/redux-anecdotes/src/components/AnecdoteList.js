import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notificationChange } from '../reducers/notificationReducer'

function AnecdoteList() {
    const anecdotes = useSelector(state => {
        if (state.filter) {
            return state.anecdotes.filter(anecdote => anecdote.content.toUpperCase().includes(state.filter.toUpperCase()))
        } return state.anecdotes
    })
    const dispatch = useDispatch()

    const handleVoteAnecdote = (id,content,votes) => {
        const newObject = {
          content: content,
          id: id,
          votes: votes + 1  
        }
        dispatch(voteAnecdote(id, newObject))
        dispatch(notificationChange(`you voted '${content}'`, 5))
    }

    return (
        <div>
            {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => handleVoteAnecdote(anecdote.id,anecdote.content,anecdote.votes)}>vote</button>
                </div>
            </div>
            )}  
        </div>
    )
}

export default AnecdoteList
