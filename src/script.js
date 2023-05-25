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
