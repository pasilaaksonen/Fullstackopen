const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    if (typeof(blogs) === "number") {
        return blogs
    }
    else if (typeof(blogs) === "object") {
        let likes = []
        blogs.forEach(blog => likes.push(blog.likes));
        const reducer = (sum, item) => {
            return sum + item
        }
        return likes.reduce(reducer, 0)
    }
}

const favoriteBlog = (blogs) => {
    let highestLike = 0
    let favBlog = null
    for (let i=0; i<=blogs.length - 1; i++) {
        if (blogs[i].likes >= highestLike) {
            highestLike = blogs[i].likes
            favBlog = blogs[i]
        }
    }
    return favBlog
}

const mostBlogs = (blogs) => {

    let writers = null
    let arr = []
    let blogNumber = 0

    //Get blog authors from each object
    const a = blogs.map(writer => writer.author)
    //Remove duplicate authors
    const uniques = [...new Set(a)]

    //Create list of lists containing objects
    uniques.map(person => {
      let a = blogs.filter(blogperson => blogperson.author === person)
      arr.push(a)
    })

    //Create final object containing author and number of blogs
    arr.map(writer => {
      let tempObject = {author: writer[0].author, blogs: writer.length}
      if (writer.length >= blogNumber) {
        blogNumber = writer.length
        writers = tempObject
      }
    })
    return writers
  }

  const mostLikes = (blogs) => {

    let writer = null
    let arr = []
    let likeNumber = 0

    //Get blog authors from each object
    const a = blogs.map(writer => writer.author)
    //Remove duplicate authors
    const uniques = [...new Set(a)]

    //Create list of lists containing objects
    uniques.map(person => {
      let a = blogs.filter(blogperson => blogperson.author === person)
      let b = a.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.likes
      },0)
      let tempObject = {author: a[0].author, likes: b}
      if (b >= likeNumber) {
        likeNumber = b
        writer = tempObject
      }
    })
    return(writer) 
  }
 
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}