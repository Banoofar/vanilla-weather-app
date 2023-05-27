function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastElement2 = document.querySelector("#forecast-2");
  let forecastHTML = `<div class="row">`;
  let forecastHTML2 = "";

  forecast.forEach(function (forecastDay, index) {
    if (index < 2) {
      forecastHTML += ` <div class="col-5 card-styling-1" >
                      <div class="card-title same-size weather-forecast-date">
                       ${formatDay(forecastDay.dt)}
                      </div>
                      <div class="cloud-2">
                        <img
                          src="https://openweathermap.org/img/wn/${
                            forecastDay.weather[0].icon
                          }@2x.png"
                        />
                      </div>
                      <div class="row subtitle-1">
                        <div class="col-6">Temp</div>
                        <div class="col-6">Wind</div>
                      </div>
                      <div class="row weather-forecast-temperature">
                        <div class="col-6">
                          <span class="weather-forecast-temperature-min"
                            >${Math.round(forecastDay.temp.min)}°</span
                          >/<span class="weather-forecast-temperature-max"
                            >${Math.round(forecastDay.temp.max)}°</span
                          >
                        </div>
                        <div class="col-6"><strong>${Math.round(
                          forecastDay.wind_speed * 3.6
                        )}</strong> km/h</div>
                      </div>
                    </div> `;
    } else {
      if (index < 5) {
        forecastHTML2 += ` <div class="forecast-item  card-styling-2"> 
        <div class="card-title same-size">   ${formatDay(forecastDay.dt)}</div>
        <div class="cloud-3"> <img
                          src="https://openweathermap.org/img/wn/${
                            forecastDay.weather[0].icon
                          }@2x.png"
                          width = "60%"
                        /></div>
        <div class="row">
          <div class="col-6">Temp</div>
          <div class="col-6">Wind</div>
        </div>
        <div class="row weather-forecast-temperature">
          <div class="col-6 smaller">
              <span class="weather-forecast-temperature-min"
                            >${Math.round(forecastDay.temp.min)}°</span
                          >/<span class="weather-forecast-temperature-max"
                            >${Math.round(forecastDay.temp.max)}°</span
                          >
          </div>
          <div class="col-6 smaller">
            <strong>${Math.round(forecastDay.wind_speed * 3.6)}</strong> km/h
          </div>
        </div>
      </div> `;
      }
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;

  const forecastContainer = document.createElement("div");
  forecastContainer.classList.add("forecast-container");
  forecastContainer.innerHTML = forecastHTML2;

  forecastElement2.innerHTML = "";
  forecastElement2.appendChild(forecastContainer);
}

function getforecast(coordinates) {
  let apiKey = "53f3bc1f5d348c44be3e3754c7185573";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showCityTemperature(response) {
  let h1 = document.querySelector("#h1");
  let textCity = document.querySelector("#text-city");
  let cityTemp = document.querySelector("#temperature");
  let cityWind = document.querySelector("#wind");
  let cityDescription = document.querySelector("#weather-mood");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  h1.innerHTML = response.data.name;
  textCity.innerHTML = response.data.name;
  cityTemp.innerHTML = Math.round(response.data.main.temp);
  cityWind.innerHTML = Math.round(response.data.wind.speed * 3.6);
  cityDescription.innerHTML = response.data.weather[0].description;
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getforecast(response.data.coord);
}

function findCity(city) {
  let key = "c9b1d26ba353d1f56882373209bf2852";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;

  axios.get(apiUrl).then(showCityTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-name");
  findCity(cityInputElement.value);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function displayCurrent(response) {
  let h1 = document.querySelector("#h1");
  h1.innerHTML = "Current Location";
  let currentTemp = document.querySelector("#temperature");
  currentTemp.innerHTML = Math.round(response.data.main.temp);
  let currentHumid = document.querySelector("#wind");
  currentHumid.innerHTML = Math.round(response.data.wind.speed * 3.6);
  let currentDescription = document.querySelector("#weather-mood");
  currentDescription.innerHTML = response.data.weather[0].description;
  let currentLoc = document.querySelector("#text-city");
  currentLoc.innerHTML = "your current location";
}

function showPosition(position) {
  console.log(position);

  let key2 = "c9b1d26ba353d1f56882373209bf2852";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key2}&units=metric`;

  axios.get(url).then(displayCurrent);
  axios.get(url).then(displayForecast);
}

function showCurrentLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", showCurrentLocation);

findCity("Tehran");
