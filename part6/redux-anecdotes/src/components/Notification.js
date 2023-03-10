import { useSelector } from "react-redux"

const Notification = ({ msg }) => {  
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {msg}
    </div>
  )
}

export default Notification
