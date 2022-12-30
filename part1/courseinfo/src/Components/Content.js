const Part = (props) => {
  return(
    <p>
      {props.part} {props.exercises}
    </p>
  )
};


const Content = (props) => {
  
  const content_items = props.data.map((partt) => {
    return <Part part={partt.part} exercises={partt.exercises} key={partt.exercises} />
  })

  console.log(content_items)
  
  return (
    <>
     {content_items}
    </>
  );
}

export default Content