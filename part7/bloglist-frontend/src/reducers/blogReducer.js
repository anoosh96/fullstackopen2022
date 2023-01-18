import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { notify, setNotification } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action){
      return action.payload
    },
    addBlog(state, action){
      return [...state, action.payload]
    },
    updateBlog(state, action){
      const blog = action.payload
      return state.map((bl)=> bl._id === blog._id ? blog : bl )
    },
    removeBlog(state, action){
      return state.filter(blog => blog._id !== action.payload)
    }
  }
})

export default blogSlice.reducer
export const { setBlogs, addBlog, updateBlog, removeBlog } = blogSlice.actions

export const getBlogs = () => async (dispatch) => {
  const blogs = await blogService.getAll()
  dispatch(setBlogs(blogs))
}

export const likeBlog = (blog) => async (dispatch) => {
  try {
    const updatedBlog = await blogService
      .updateBlog(blog)
    dispatch(updateBlog(updatedBlog))
  } catch (error) {
    dispatch(notify('error liking blog'))
  }
}

export const deleteBlog = (id) => async (dispatch) => {
  try {
    await blogService.deleteBlog(id)
    dispatch(removeBlog(id))
  } catch (error) {
    dispatch(notify('error creating blog'))
  }
}

export const createBlog = (blog) => async (dispatch) => {
  try{
    const createdBlog = await blogService
      .createBlog(blog)
    
    dispatch(addBlog(createdBlog))
  }
  catch(err){
    dispatch(notify('error creating blog'))
  }
}
