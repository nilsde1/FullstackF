//import { Component } from "react";

const Component = ({ course }) => {
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
  };
export default Component