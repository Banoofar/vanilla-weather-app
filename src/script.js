let weather = {
  paris: {
    temp: 19.7,
    humidity: 80,
  },
  tokyo: {
    temp: 17.3,
    humidity: 50,
  },
  lisbon: {
    temp: 30.2,
    humidity: 20,
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100,
  },
  oslo: {
    temp: -5,
    humidity: 20,
  },
};

let city = prompt("Enter a city");
if (weather[city] !== undefined) {
  let temperature = weather[city].temp;
  let humid = weather[city].humidity;
  let celsius = Math.round(temperature);
  let fahrenheit = Math.round((temperature * 9) / 5 + 32);
  alert(
    `It is currently ${celsius}°C (${fahrenheit}°F) in ${city} with a humidity of ${humid}%`
  );
} else {
  alert(
    `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city}`
  );
}

function showCityTemperature(response) {
  let temp = Math.round(response.data.main.temp);
  let hmd = Math.round(response.data.main.humidity);
  let cityTemp = document.querySelector("#current-temp");
  cityTemp.innerHTML = `${temp}°C`;
  let cityHumid = document.querySelector("#current-hmd");
  cityHumid.innerHTML = `${hmd}%`;
  let cityDescription = document.querySelector("#weather-mood");
  cityDescription.innerHTML = response.data.weather[0].description;
}
function findCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-name");
  let h1 = document.querySelector("#h1");
  h1.innerHTML = `${cityInput.value}`;
  let textCity = document.querySelector("#text-city");
  textCity.innerHTML = `${cityInput.value}`;
  let searchCity = `${cityInput.value}`;
  let key = "c9b1d26ba353d1f56882373209bf2852";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${key}&units=metric`;

  axios.get(apiUrl).then(showCityTemperature);
}

let form = document.querySelector("#search");
form.addEventListener("submit", findCity);

function displayCurrent(response) {
  let h1 = document.querySelector("#h1");
  h1.innerHTML = "Current Location";
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = `${response.data.main.temp}°C`;
  let currentHumid = document.querySelector("#current-hmd");
  currentHumid.innerHTML = `${response.data.main.humidity}%`;
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

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", showCurrentLocation);
