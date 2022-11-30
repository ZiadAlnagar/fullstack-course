import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import phonebook from './services/phonebook';
import Notification from './components/Notification';

const App = () => {
  // States
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState('');
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [message, setMessage] = useState({});

  useEffect(() => {
    phonebook.index().then((persons) => setPersons(persons));
  }, []);

  const notify = (content, type) => {
    setMessage({ content: content, type: type });
    setTimeout(() => {
      setMessage('');
    }, 5000);
  };

  const errorMessage = (name) =>
    `Information of ${name} has already been removed from server`;

  const addNewName = (e) => setNewName(e.target.value);
  const addNewNumber = (e) => setNewNumber(e.target.value);
  const filterByName = (e) => setFilter(e.target.value);
  const addPerson = (e) => {
    e.preventDefault();
    const foundPerson = persons.find(({ name }) => name === newName);
    if (foundPerson !== undefined) {
      const updatedPerson = { ...foundPerson, number: newNumber };
      const id = updatedPerson.id;
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        phonebook
          .update(id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(persons.map((p) => (p.id !== id ? p : returnedPerson)));
            notify(`Updated ${returnedPerson.name}`, 'success');
            setNewName('');
            setNewNumber('');
          })
          .catch((err) => {
            const errorMsg = err.response.data.error;
            if (errorMsg) notify(errorMsg, 'error');
            else notify(errorMessage(updatedPerson.name), 'error');
          });
      }
    } else {
      const person = { name: newName, number: newNumber };
      phonebook
        .create(person)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          notify(`Createad ${returnedPerson.name}`, 'success');
          setNewName('');
          setNewNumber('');
        })
        .catch((err) => {
          const errorMsg = err.response.data.error;
          if (errorMsg) notify(errorMsg, 'error');
        });
    }
  };

  const deletePerson = (id) => () => {
    const personName = persons.find((p) => p.id === id).name;
    if (window.confirm(`Delete ${personName}`)) {
      phonebook
        .destroy(id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== id));
          notify(`Deleted ${personName}`, 'success');
        })
        .catch((err) => notify(errorMessage(personName), 'error'));
    }
  };

  const personsToShow = persons.filter(({ name }) =>
    name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message.content} type={message.type} />
      <Filter
        label="filter shown with"
        onChange={filterByName}
        value={filter}
      />
      <h2>add a new</h2>
      <PersonForm
        onSubmit={addPerson}
        name={{ label: 'name: ', onChange: addNewName, value: newName }}
        number={{
          label: 'number: ',
          onChange: addNewNumber,
          value: newNumber,
        }}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} onClickDelete={deletePerson} />
    </div>
  );
};

export default App;
