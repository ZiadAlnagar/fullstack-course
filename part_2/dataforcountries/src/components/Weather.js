import Header from "./Header";

const Weather = ({ forecast }) =>
    Object.keys(forecast).length !== 0 ? (
        <div>
            <Header text={`Weather in ${forecast.name}`} />
            <p>temperature {forecast.main.temp} Celcius</p>
            <img
                src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
                alt="weather icon"
            />
            <p>wind {forecast.wind.speed} m/s</p>
        </div>
    ) : (
        null
    );

export default Weather;
