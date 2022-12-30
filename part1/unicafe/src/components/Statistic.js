const Statistic = ({stats}) => {

  const statistcs = Object.keys(stats).map((k)=>{
    return (
      <tr>
        <td>{k}</td>
        <td>{stats[k]}</td>
      </tr>
    )
  })

  return (
    <div>
      <h2>Statistcs</h2>
      <table>
        <tbody>
          {statistcs}
        </tbody>
      </table>
    </div>
  )
}

export default Statistic
