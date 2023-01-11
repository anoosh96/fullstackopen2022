import { useSelector, useDispatch } from 'react-redux'
import { vote, getAnecdotes, voteForAnecdote } from '../reducers/anecdoteReducer' 
import useNotifier from '../hooks/index'
import { useEffect } from 'react'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const notifier = useNotifier()

  const vote_ = (id) => {
    const anec = anecdotes.find((a) => a.id == id)
    dispatch(voteForAnecdote({ ...anec, votes: anec.votes + 1 }))
    notifyVote(anec) 
  }

  const notifyVote = (anec) => {
    notifier.notifyUser(`you voted for: ${anec.content}`)  
  }

  const filteredAnecdotes = anecdotes
    .filter(
      (anec) => anec
         .content
        .toLowerCase()
        .includes(filter.toLowerCase())
    )
  
  const sortedAnecdotes = filteredAnecdotes.slice().sort((a,b) => {
    return b.votes - a.votes
  })

  useEffect(() => {
    dispatch(getAnecdotes())
  }, [dispatch])

  return (
    <div>
      {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote_(anecdote.id)}>vote</button>
          </div>
        </div>
      )}      
    </div>
  )
}

export default AnecdoteList
