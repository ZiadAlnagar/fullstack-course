const PersonForm = ({onSubmit, name, number}) => (
    <form onSubmit={onSubmit}>
    <div>
        name: <input label={name.label} onChange={name.onChange} value={name.value} />
    </div>
    <div>
        number: <input label={number.label} onChange={number.onChange} value={number.value} />
    </div>
    <div>
        <button type="submit">add</button>
    </div>
</form>
);

export default PersonForm;