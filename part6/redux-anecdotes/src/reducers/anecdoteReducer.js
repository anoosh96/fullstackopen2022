import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = []

const anecdoteReducer = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    vote(state, action){
      return state.map(
        (anec) => anec.id === action.payload.id
          ? action.payload 
          : anec 
      )
    },
    newAnecdote(state, action){
      return [...state, action.payload]
    },
    setAnecdotes(state, action){
      return action.payload
    }
  }
})

export default anecdoteReducer.reducer
export const { vote, newAnecdote, setAnecdotes } = anecdoteReducer.actions

export const getAnecdotes = () => async (dispatch) => {
  const resp = await axios.get('http://localhost:3003/anecdotes')
  console.log(resp.data);
  dispatch(setAnecdotes(resp.data))
}

export const createAnecdote = (anecdote) => async (dispatch) => {
  const resp = await axios
    .post('http://localhost:3003/anecdotes', anecdote)
  dispatch(newAnecdote(resp.data))
}

export const voteForAnecdote = (anecdote) => async (dispatch) => {
  const resp = await axios
    .put(`http://localhost:3003/anecdotes/${anecdote.id}`, anecdote)
  
  console.log(resp.data);
  dispatch(vote(resp.data))
}
