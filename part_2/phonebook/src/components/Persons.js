import Button from './Button';

const Persons = ({ persons, onClickDelete }) => (
  <div>
    {persons.map(({ id, name, number }) => (
      <div key={name}>
        <span>
          {name} {number}
        </span>
        <Button onClick={onClickDelete(id)} text="delete" />
      </div>
    ))}
  </div>
);

export default Persons;
