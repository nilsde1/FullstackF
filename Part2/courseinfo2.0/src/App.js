import Component from './Component'
const App = () => {
  const course = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];
  /*
  const Course = ({ course }) => {
    const Header = ({ name }) => {
      console.log("Header", name);
      return <h1>{name}</h1>;
    };
    const Content = ({ parts }) => {
      const Part = ({ name, exercises }) => (
        <p>
          {name} {exercises}
        </p>
      );
      return (
        <div>
          {parts.map((part) => (
            <Part key={part.id} name={part.name} exercises={part.exercises} />
          ))}
        </div>
      );
    };
      
    const Total = ({ parts }) => {
      const initalValue = 0;
     

      const total = parts.reduce((sum, now)=> {
        return sum + now.exercises
      },initalValue)

    return(
      <h4>total of {total} excercises</h4>
    
    )
    }

    return (
      <div>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    );
  }; */

  return (
    <div>
      {course.map((course) => (
        <Component key={course.id} course={course} />
      ))}
    </div>
  );
};

export default App;
