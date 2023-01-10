import { useField } from '../hooks'

const BlogForm = ({ submitHandler }) => {

  const title = useField('text', {required: true, id: 'title'})
  const author = useField('text', {required: true, id: 'author'})
  const url = useField('text', {required: true, id: 'url'}) 

  const addBlog = (event) => {
    event.preventDefault()
    submitHandler(title.value, author.value, url.value)
  }
  
  return (
    <div>
      <h2>Add Blog</h2>
      <form onSubmit={addBlog}>
        <div>
          <label>Title:</label>
          <input {...title} />
        </div>
        <div>
          <label>Author:</label>
          <input {...author}/>
        </div>
        <div>
          <label>Url:</label>
          <input {...url}/>
        </div>
        <input type="submit" value="Add" id="add-btn"/>
      </form>  
    </div>
  )
}

export default BlogForm
