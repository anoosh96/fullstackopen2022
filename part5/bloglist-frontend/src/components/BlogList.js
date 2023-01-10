import Blog from "./Blog"

const BlogList = ({ children }) => {

  return (
    <div className='blog-list'>
      <h2>All Blogs</h2>
      {children}
    </div>
  )
}

export default BlogList
