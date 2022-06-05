import React from 'react'

const Persons = ({  person, deletePerson }) => {
    return (
      <li>
        {person.map((person) => (
          <div key={person.name}>
            {person.name} {person.number}{" "}
            <button onClick={() => deletePerson(person.id, person.name)}>delete</button>
          </div>
        ))}</li>
     
    );
  };
  
  export default Persons;