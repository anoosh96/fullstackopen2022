import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useSelector } from 'react-redux'
import Filter from './components/Filter'

const App = () => {
  const notification = useSelector(state => state.notification)
  return (
    <div>
      <h2>Anecdotes</h2>
      { notification && <Notification msg={notification}/>}
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
