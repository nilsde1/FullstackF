import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonsForm";
import Ppersons from "./components/Pperson";
import personService from "./service/Persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newNameP, setNewNameP] = useState({ name: "", number: "" });
  const [filterParam, setFilterParam] = useState("");
  const [personsToShow, setPersonsToShow] = useState([]);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    personService
    .getAll()
    .then((initialPersons) => {
      setPersons(initialPersons);
      setPersonsToShow(initialPersons);
    });
  }, []);

  
  const addPerson = (event) => {
    event
    .preventDefault();
    const currentPersonName = persons.filter(
      (person) => person.name === newNameP.name
    );

    if (currentPersonName.length === 0) {
      personService
        .create(newNameP)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setPersonsToShow(persons.concat(returnedPerson));
          setMessage(`Added ${newNameP.name} to phonebook`);
        })
        .catch((error) => setMessage(error.response.data.error));
    } else {
      if (
        window.confirm(
          `${newNameP.name} is already in the phonebook, do you want to replace the number?`
        )
      ) {
        personService
          .update(currentPersonName[0].id, newNameP)
          .then((returnedPerson) => {
            const updatedPerson = persons.map((person) =>
              person.id !== returnedPerson.id ? person : returnedPerson
            );
            setPersons(updatedPerson);
            setPersonsToShow(updatedPerson);
            setMessage(`Updated ${newNameP.name}'s number`);
          })
          .catch((error) => setMessage(error.response.data.error));
      }
    }
    setNewNameP({ name: "", number: "" });
  };
useEffect(() => {
    const timer = setTimeout(() => {
      setMessage(null);
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [message]);

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService.remove(id).then((response) => {
        const updatedPersons = persons.filter((person) => person.id !== id);
        setPersons(updatedPersons);
        setPersonsToShow(updatedPersons);
        setMessage(`Removed ${name} from phonebook`);
      });
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewNameP({ ...newNameP, [name]: value });
  };

  const filterByName = (event) => {
    const search = event.target.value;
    setFilterParam(search);
    setPersonsToShow(
      persons.filter((person) => person.name.toLowerCase().includes(search))
    );
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter filterParam={filterParam} filterByName={filterByName} />
      <PersonForm
        addPerson={addPerson}
        newPerson={newNameP}
        handleChange={handleChange}
      />
      <h2>Numbers</h2>
      <Ppersons personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
