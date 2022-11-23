import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Results from "./components/Results";

const App = () => {
    const weather_key = process.env.REACT_APP_OPENWEATHER_KEY;

    const [countries, setCountries] = useState([]);
    const [weather, setWeather] = useState({});
    const [filter, setFilter] = useState("");

    const showOnClick = (e) =>
        setFilter(e.target.previousElementSibling.textContent);
    const filterByName = (e) => setFilter(e.target.value);

    const filteredCountries = countries.filter(
        ({ name }) =>
            name.official.toLowerCase().includes(filter.toLowerCase()) ||
            name.common.toLowerCase().includes(filter.toLowerCase())
    );

    const filteredLength = filteredCountries.length;
    const selected = filteredLength === 1 ? filteredCountries[0] : undefined;

    useEffect(() => {
        axios
            .get("https://restcountries.com/v3.1/all")
            .then((response) => setCountries(response.data));
    }, []);
    useEffect(() => {
        if (selected !== undefined) {
            const latlng = selected.capitalInfo.latlng;
            axios
                .get(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${latlng[0]}&lon=${latlng[1]}&appid=${weather_key}`
                )
                .then((response) => setWeather(response.data));
        }
    }, [selected]);

    return (
        <div>
            <Filter
                label="find countries"
                onChange={filterByName}
                value={filter}
            />
            <Results
                countries={filteredCountries}
                forecast={weather}
                selected={selected}
                length={filteredLength}
                onClick={showOnClick}
            />
        </div>
    );
};

export default App;
