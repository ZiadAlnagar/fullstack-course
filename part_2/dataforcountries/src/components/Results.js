import Country from "./Country";
import Weather from "./Weather";

const Results = ({ countries, selected, forecast, length, onClick }) => {
    switch (true) {
        case length === 0:
            return <p>No matches, specify another filter</p>;

        case length === 1:
            return (
                <div>
                    <Country country={selected} />
                    <Weather forecast={forecast} />
                </div>
            );

        case length <= 10:
            return countries.map(({ name }) => (
                <div key={name.common}>
                    <span>{name.official}</span>
                    <button onClick={onClick}>show</button>
                </div>
            ));

        case length > 10:
            return <p>Too many matches, specify another filter</p>;

        default:
            return <div></div>;
    }
};

export default Results;
