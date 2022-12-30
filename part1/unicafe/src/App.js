import { useState, useEffect } from 'react'
import Feedback from './components/Feedback'
import Statistic from './components/Statistic'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const total = good + bad + neutral
  const average = total/3
  
  const positive = (total? (good/total) * 100 : 0) + '%'

  const allStats = {
    good: good,
    neutral: neutral,
    bad: bad,
    average: average,
    positive: positive
  }

  const giveFeedback = (e) => {
    const feedback = e.target.textContent
    switch (feedback) {
      case 'good':
        setGood(good + 1)
        break;
      
      case 'neutral':
        setNeutral(neutral+ 1)
        break;
      
      case 'bad':
        setBad(bad + 1)
        break;
    
      default:
        break;
    }
  }

  useEffect(() => {
    console.log(good, neutral, bad)
  }, [good, neutral, bad])

  return (
    <div>
      <h1 style={{textAlign: "center"}}>Feedback App</h1>
      <Feedback feedbackListener={giveFeedback}/>
      <Statistic stats={allStats}/>
    </div>
  )
}

export default App
