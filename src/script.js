function showCityTemperature(response) {
  let temp = Math.round(response.data.main.temp);
  let wind = Math.round(response.data.wind.speed);
  let cityTemp = document.querySelector("#temperature");
  cityTemp.innerHTML = `${temp}`;
  let cityHumid = document.querySelector("#wind");
  cityHumid.innerHTML = `${wind}`;
  let cityDescription = document.querySelector("#weather-mood");
  cityDescription.innerHTML = response.data.weather[0].description;

  celsiusTemperature = response.data.main.temp;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}
function findCity(city) {
  let h1 = document.querySelector("#h1");
  h1.innerHTML = `${city}`;
  let textCity = document.querySelector("#text-city");
  textCity.innerHTML = `${city}`;
  let key = "c9b1d26ba353d1f56882373209bf2852";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;

  axios.get(apiUrl).then(showCityTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-name");
  findCity(cityInputElement.value);
}

function displayCurrent(response) {
  let h1 = document.querySelector("#h1");
  h1.innerHTML = "Current Location";
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = `${response.data.main.temp}°C|F°`;
  let currentHumid = document.querySelector("#current-hmd");
  currentHumid.innerHTML = `${response.data.wind.speed}km/h`;
  let currentDescription = document.querySelector("#weather-mood");
  currentDescription.innerHTML = response.data.weather[0].description;
  let currentLoc = document.querySelector("#text-city");
  currentLoc.innerHTML = "your current location";
  celsiusTemperature = response.data.main.temp;
}

function showPosition(position) {
  console.log(position);

  let key2 = "c9b1d26ba353d1f56882373209bf2852";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key2}&units=metric`;

  axios.get(url).then(displayCurrent);
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

function showCurrentLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let celsiusTemperature = null;

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", showCurrentLocation);

let form = document.querySelector("#search");
form.addEventListener("submit", findCity);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

findCity("Tehran");
