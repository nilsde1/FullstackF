const Header = (props) => {
  console.log(props);
  return <h1>{props.course}</h1>;
};

const Part = (content) => {
  console.log(content);
  return (
    <p>
      {content.part} {content.exercises}
    </p>
  );
};

const Content = (content) => {
  console.log(content);
  return (
    <div>
      <Part
        part={content.parts[0].name}
        exercises={content.parts[0].exercises}
      />
      <Part part={content.parts[1].name} exercises={content.parts[1].exercises} />
      <Part part={content.parts[2].name} exercises={content.parts[2].exercises} />
    </div>
  );
};

const Total = (props) => {
  console.log(props);
  return (
    <div>
      <p>
        Number of excercises{" "}
        {props.parts[0].exercises +
          props.parts[1].exercises +
          props.parts[2].exercises}
      </p>
    </div>
  );
};
const App = () => {
  
  const course = {
  name: "Half Stack application development",
  parts: [
    {
      name: "Fundamentals of React",
      exercises: 10,
    },
    {
      name: "Using props to pass data",
      exercises: 7,
    },
    {
      name: "State of a component",
      exercises: 14,
    },
  ]
}

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App;
