const Notification = ({ msg }) => {
  const style = {
    border: '1px solid black',
    borderRadius: '10px',
    padding: '10px',
    margin: '10px'
  }

  return (
    <div style={style}>
      <p>{msg}</p>
    </div>
  )
}

export default Notification
