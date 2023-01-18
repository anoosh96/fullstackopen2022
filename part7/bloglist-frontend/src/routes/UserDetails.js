import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getUser } from "../reducers/userDetailsReducer"

const UserDetails = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.userDetails)

  useEffect(() => {
    dispatch(getUser(params.id))
  }, [params])

  return (
    <div>
      <h1>User Details</h1>
      {user &&
        <div>
          <div>
            <h4>{user.email}</h4>
          </div>
          { user.blogs.length > 0
            ?
            <div>
              <h4>Blogs</h4>
              <ul>
                {user.blogs.map((blog)=><li key={blog._id}>{blog.title}</li>)}
              </ul>
            </div>
            :
            <div>
              No Blogs added by user
            </div>
          }
        </div>
      }
    </div>
  )
}

export default UserDetails
