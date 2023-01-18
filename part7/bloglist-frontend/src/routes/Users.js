import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import User from "../components/User"
import { getAllUsers } from "../reducers/userReducer"

const Users = () => {
  const { usersList } = useSelector(state => state.users)
  const dispatch = useDispatch()

  const users = usersList.map((user) => <User user={user} key={user.id}/> )

  useEffect(() => {
    dispatch(getAllUsers())
  }, [dispatch])

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>User Name</th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {users}
        </tbody>
      </table>
    </div>
  )
}

export default Users
