import Content from "./Content"
import Header from "./Header"
import Total from "./Total"

const Course = ({course}) => {
  const total = course.parts.reduce((acc, part) => { return acc = acc + part.exercises }, 0)
  return (
    <div>
      <Header course={course.course} />
      <Content data={course.parts} />
      <Total total={total}/>
    </div>
  )
}

export default Course
