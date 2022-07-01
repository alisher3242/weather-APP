import { useRef, useState } from "react";
import "./App.css"


function App() {
    const API = "7e69414855f7bf775e23d140ef362321"
    const[city, setCity] = useState(null)
    const inputRef = useRef(null)
    const search = (evt) => {
        evt.preventDefault()
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputRef.current.value}&appid=${API}`)
            .then(res => res.json())
            .then(data => setCity(data))
        inputRef.current.value = ""
    }

  return (
    <div className="App">
      <div className="weather">
        <div className="container">
          <form onSubmit={search} className="weather__form">
            <input
              type="text"
              placeholder="Search ..."
              required
              className="weather__input"
              ref={inputRef}
            />
            <button className="weather__btn">Search</button>
          </form>
          {city && <div className="weather__card">
            <h2 className="weather__city">
                <span className="weather__city--name">{city.name}</span>
                <sup className="weather__city--country">{city.sys? city.sys.country: null}</sup>
            </h2>
            <h2 className="weather__temp">
                {city.main?  (((city.main.temp)-273.15).toFixed(1)) : null}
                <sup>°C</sup>
            </h2>
            <div className="weather__info">
                <p className="weather__info--type">{city.weather? city.weather[0].description : null}</p>
            </div>
          </div>}
        </div>
      </div>
    </div>
  );
}

export default App;
