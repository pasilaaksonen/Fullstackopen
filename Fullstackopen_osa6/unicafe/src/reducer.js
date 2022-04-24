const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GOOD':
      state = action.data 
      return state
    case 'OK':
      state = action.data 
      return state
    case 'BAD':
      state = action.data 
      return state
    case 'ZERO':
      state = action.data 
      return state
    default: return state
  }
  
}

export default counterReducer