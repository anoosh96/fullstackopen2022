import { useDispatch } from "react-redux"
import useNotifier from "../hooks"
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const notifier = useNotifier()

  const addAnecdote = (e) => {
    e.preventDefault()
    const anecdoteText = e.target.anecdote.value
    dispatch(createAnecdote({ content: anecdoteText, votes: 0}))
    notifier.notifyUser('Anecdote Added!')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
          <div><input type="text" name="anecdote" /></div>
          <button>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
