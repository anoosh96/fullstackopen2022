import CourseList from './Components/CourseList';

const App = () => {

  const courses = [
    {
      id: 1, 
      course: 'Full Stack Web',
      parts: [
        {
          id: 1,
          part: 'Fundamentals of React',
          exercises: 10
        },

        {
          id: 2,
          part: 'Using props to pass data',
          exercises: 7
        },

        {
          id: 3,
          part: 'State of a component',
          exercises: 14
        }  
      ]
    },

    {
      id: 2, 
      course: 'Docker',
      parts: [
        {
          id: 1,
          part: 'Containers',
          exercises: 10
        },

        {
          id: 2,
          part: 'Image',
          exercises: 7
        },

        {
          id: 3,
          part: 'Prop',
          exercises: 14
        }  
      ]
    }
  ]

  return (
    <div>
      <h1>Courses</h1>
      <CourseList courses={courses}/> 
    </div>
  )
}

export default App
