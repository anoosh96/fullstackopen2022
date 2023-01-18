import { useState } from "react"
import PropTypes from 'prop-types'
import { Link } from "react-router-dom"

const Blog = ({blog, likeHandler, deleteHandler, showRemove}) => {
  const [detailsVisible, setDetailsVisible] = useState(false)
  
  const toggleVisibility = () => {
    setDetailsVisible(!detailsVisible)
  }

  const likeBlog = () => {
    likeHandler({...blog, likes: 1})
  }

  return(
    <div className="blog-container">
      <div>
        <Link className="title" to={`/blogs/${blog._id}`}>{blog.title}</Link>
        <button 
          id='toggle-details'
          style={{marginLeft: '10px'}} 
          onClick={toggleVisibility}
        >
          { detailsVisible ? 'Hide' : 'View Details'}
        </button> 
      </div>
      {
        detailsVisible
        &&
        <div className="details">
          <div>{blog.author}</div>
          <div>
            <a href={blog.url}>{blog.url}</a>
          </div>
          <div className='likes'>
            likes: {blog.likes}
            <button onClick={likeBlog} id='like-btn'>Like</button>
          </div>
          { showRemove
            &&
            <div>
              <button onClick={() => deleteHandler(blog._id)} id="del-btn">Remove</button>
            </div>
          }
        </div>
      }
    </div> 
  ) 
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likeHandler: PropTypes.func.isRequired,
  deleteHandler: PropTypes.func.isRequired,
  showRemove: PropTypes.bool.isRequired
}

export default Blog
