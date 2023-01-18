import { useContext, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import BlogForm from '../components/BlogForm';
import { userContext } from '../contexts/AuthContextProvider';
import { createBlog, deleteBlog, getBlogs, likeBlog } from '../reducers/blogReducer';
import Togglable from '../components/Togglable'
import BlogList from '../components/BlogList';
import Blog from '../components/Blog';

const Blogs = () => {
  const blogs = useSelector(state => state.blogs)
  const sortedBlogs = blogs.slice().sort((a, b) => b.likes - a.likes)
  const user = useContext(userContext)
  const dispatch = useDispatch()
  const togglable = useRef()


  const newBlog = (title, author, url) => {
    dispatch(createBlog({ title, author, url }))
  }

  const like = (blog) => {
    dispatch(likeBlog(blog))
  }

  const deleteHandler = (id) => {
    if(window.confirm('Are You Sure?')){
      dispatch(deleteBlog(id))
    }
  }

  const blogslist = sortedBlogs.map(blog =>
    <Blog 
      key={blog._id} 
      blog={blog} 
      likeHandler={like} 
      deleteHandler={deleteHandler}
      showRemove={user?.id === blog.user?.id}
    />)



  useEffect(() => {
    if(user){
      console.log(user);
      dispatch(getBlogs())
    } 
  }, [user])

  return (
    <div>
      <Togglable buttonLabel='new blog' ref={togglable}>
        <BlogForm submitHandler={newBlog}/>
      </Togglable>
      <BlogList>
        {blogslist}
      </BlogList>
    </div>
  )
}

export default Blogs
