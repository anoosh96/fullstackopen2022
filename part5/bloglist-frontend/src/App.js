import { useState, useEffect, useRef, useContext } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { useNotification } from './hooks'
import blogService from './services/blogs'
import loginService from './services/login'
import { userContext } from './contexts/AuthContextProvider'

const App = () => {
    const [blogs, setBlogs] = useState([])
  const notifier = useNotification()
  const togglable = useRef()
  const [user, setUser] = useContext(userContext)

  const sortedBlogs = blogs.sort((a, b) => a.likes - b.likes)

  const loginHandler = async (email, password) => {
    try{
      const loggedInUser = await loginService
        .loginUser({email, password})
      setUser(loggedInUser)
      localStorage.setItem('user', JSON.stringify(loggedInUser))
    }
    catch(err){
      notifier.notify('invalid credentials', true)
    }
  }

  const logoutUser = () => {
    setUser(null)
    localStorage.clear()
  }

  const newBlog = async (title, author, url) => {
    try{
      const createdBlog = await blogService
        .createBlog({ title, author, url})
      
      setBlogs(blogs.concat(createdBlog))
      notifier.notify('Blog Created Successfully!', true)
      togglable.current.toggleVisibility()
    }
    catch(err){
      notifier.notify('Blog Creation Failed!', true)
    }
  }

  const likeBlog = async (blog) => {
    try {
      const updateBlog = await blogService
        .updateBlog(blog)
      setBlogs(blogs.map((bl)=> bl._id === blog._id ? blog : bl ))
    } catch (error) {
      console.log(error);
    }
  }

  const deleteHandler = async (id) => {
    if(window.confirm('Are You Sure?')){
      try {
        await blogService.deleteBlog(id)
        setBlogs(blogs.filter(blog => blog._id !== id))
      } catch (error) {
        notifier.notify('error deleting blog')
      }
    }
  }

  const blogslist = sortedBlogs.map(blog =>
    <Blog 
      key={blog._id} 
      blog={blog} 
      likeHandler={likeBlog} 
      deleteHandler={deleteHandler}
      showRemove={user.id === blog.user?.id}
    />)

  useEffect(() => {
    if(user){
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )
    }  
  }, [user])

  return (
    <div className="container">
      <h1 style={{marginBottom: '20px'}}>Blog App</h1>
      {notifier.notification && <Notification msg={notifier.notification}/>}
      { user
        ?
        <>
          <div>
            Logged in as: {user.email}
            <button onClick={logoutUser}>Logout</button>
          </div>
          <Togglable buttonLabel='new blog' ref={togglable}>
            <BlogForm submitHandler={newBlog}/>
          </Togglable>
          <BlogList>
              {blogslist}
          </BlogList>
        </>
        :
        <LoginForm submitHandler={loginHandler}/>
      } 
    </div>
  )
}

export default App
