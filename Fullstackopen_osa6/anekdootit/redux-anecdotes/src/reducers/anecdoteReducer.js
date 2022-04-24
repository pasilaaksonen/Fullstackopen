import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  switch(action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':      
      return action.data
    case 'VOTE_ANECDOTE':
        const id = action.data.id
        const anecdoteToChange = state.find(a => a.id === id)
        const valuetoUpdate = anecdoteToChange.votes
        const changedAnecdote = { 
          ...anecdoteToChange, 
          votes: valuetoUpdate + 1 
        }
        const newAnecdoteList = state.map(anecdote =>
          anecdote.id !== id ? anecdote : changedAnecdote 
        )
        const sortednewList = newAnecdoteList.slice().sort(function(a, b) {
          return b.votes - a.votes;
        })
        state = sortednewList
        return state
    default:
      return state
      }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export const voteAnecdote = (id, newObject) => {
  return async dispatch => {
    await anecdoteService.updateVote(id, newObject)
    dispatch({
      type: 'VOTE_ANECDOTE',
      data: { id }
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
  }
}

export default reducer