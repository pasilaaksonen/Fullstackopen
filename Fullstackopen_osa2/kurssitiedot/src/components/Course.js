const Part = (props) => {
    return (
      <>
        <p>
          {props.part} {props.exercises}
        </p>
      </>
    )
  }
  
  const Header = ({ course }) => {
    return(
      <>
        <h1>{course.name}</h1>
      </>
    )
  }
  
  const Content = ({ course }) => {
    return(
      <>
        {course.parts.map(part => 
          <Part key={part.id} part={part.name} exercises={part.exercises} />
        )}
      </>
    )
  }
  
  const Total = ({ course }) => {
  
    let tempArray = []
    
    course.parts.map(part => tempArray.push(part.exercises))
    const totalExercises = tempArray.reduce( (a, b) => a + b);
  
    return(
      <>
        <p>Number of exercises {totalExercises}</p>
      </>
    )
  }
  
  const Course = ({ course }) => {
  
    return (
      <>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
      </>
    )
  }

export default Course
