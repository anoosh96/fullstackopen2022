import { useState } from 'react'

const App = () => {


  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)

  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))



  const nextAnecdote = () => {
    const next = Math.floor(Math.random() * anecdotes.length)
    setSelected(next)
  }

  const vote = () => {
    const votes_new = [...votes]
    votes_new[selected] += 1
    setVotes(votes_new)
  }

  const mostPopularAnecdote = votes.indexOf(Math.max.apply(null, votes))

  const votesCasted = () => votes.find((vote) => vote > 0) 

  return (
    <div>
      {anecdotes[selected]}
      <div style={{marginTop: '10px'}}>
        <small>This anecdote has {votes[selected]} votes</small>
      </div>
      <div>
        <button onClick={vote}>Vote</button>
        <button onClick={nextAnecdote}>next anecdote</button>
      </div>

      <div>
        <h2>Most Popular Anecdote</h2>
           {!votesCasted() && <span>No Votes Casted Yet</span>}
           {votesCasted() && anecdotes[mostPopularAnecdote]}
      </div>
    </div>
  )
}

export default App