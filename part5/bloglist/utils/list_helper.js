const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) => {
  const likes = blogs.reduce((acc, obj)=>{
    return acc += obj.likes
  }, 0)
 
  return likes
}

const favBlog = (blogs) => {
  const fav = blogs.reduce((curr, prev) => {
   return prev.likes > curr.likes ? prev : curr
  })

  return fav
}

module.exports = {
  dummy, totalLikes, favBlog
}
