import Header from "./Header";

const Country = ({ country }) => (
    <div>
        <Header level={0} text={country.name.official} />
        <p>capital {country.capital}</p>
        <p>area {country.area}</p>
        <Header text='languages:' />
        <ul>
            {Object.entries(country.languages).map(([key, language]) => (
                <li key={key}>{language}</li>
            ))}
        </ul>
        <img src={country.flags.png} alt="flag" />
    </div>
);

export default Country;
