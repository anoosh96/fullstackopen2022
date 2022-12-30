import Button from "./Button"

const Feedback = ({feedbackListener}) => {
  return (
    <div>
      <h2>Give Feedback</h2>
      <div>
        <Button text='good' clickHandler={feedbackListener} />
        <Button text='neutral' clickHandler={feedbackListener} />
        <Button text='bad' clickHandler={feedbackListener} />
      </div>
    </div>
  )
}

export default Feedback
