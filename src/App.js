import React, { useState } from 'react';

const api = {
  key: "0e128f999e1fb1174d7af1d207406c01",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === 'Enter') {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          if (result.cod === "404") {
            document.getElementById("myModal").style.display = "block";
          }
        });
    }
  }

  const closeModal = () => {
    //alert("Holaaa");
    document.getElementById("myModal").style.display = "none";
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = [d.getFullYear()];

    return `${day} ${date} ${month} ${year}`;
  }

  return (

    <div className={(typeof weather.main != "undefined")
      ? ((weather.main.temp > 20)
        ? 'app warm' : 'app cold') : 'app'}>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar search-focus"
            placeholder="Type a city ..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>

        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp)}ºC
              </div>
              <div className="weather">
                {weather.weather[0].description}
              </div>
            </div>
          </div>
        ) : ('')}
        <div className="visit-me">
          <a href="https://www.alexiglesias.in/#work" target="__blank" className="visit-me-link">Go back</a>
        </div>
      </main>

      <div id="myModal" class="modal">
        <div class="modal-content">
          <div class="modal-header">
            <span class="close" onClick={closeModal}>&times;</span>
            <h2>Ouups!!</h2>
          </div>
          <div class="modal-body">
            <p>It looks like the city you entered doesn't exist. did you spell them right? 🤔</p>
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;