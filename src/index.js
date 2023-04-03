let now = new Date();
let date = now.getDate();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saterday",
];
let day = days[now.getDay()];
let hour = now.getHours();
let minutes = now.getMinutes();

let months = [
  "Janurary",
  "Feburary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Augest",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
function formatDate() {
  let currentDate = ` ${day}, ${month} ${date} ${hour}:${minutes}`;
  return currentDate;
}

let currentDate = document.querySelector(".dateAndTime");
currentDate.innerHTML = formatDate();

function locationSubmit(event) {
  event.preventDefault();
  let location = document.querySelector(".location");
  let city = document.querySelector(".locationButton");
  location.innerHTML = `📍${city.value}`;
  let apiKey = "7e49ad65828a14847aabf2ad2cab3619";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=metric&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function retrieveWeather(position) {
  let apiKey = "7e49ad65828a14847aabf2ad2cab3619";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}
navigator.geolocation.getCurrentPosition(retrieveWeather);

function showTemperature(response) {
  let location = document.querySelector(".location");
  location.innerHTML = `📍${response.data.name}`;
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#currentWeather");
  temperatureElement.innerHTML = `${temperature}°c`;
  let description = response.data.weather[0].description;
  let descriptionElement = document.querySelector("#weatherDesctiption");
  descriptionElement.innerHTML = `${description}`;
  let humidity = Math.round(response.data.main.humidity);
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `Humidity: ${humidity}%`;
  let wind = Math.round(response.data.wind.speed);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `Wind: ${wind}mph`;
}

function currentLocation(event) {
  if (event.preventDefault) {
    event.preventDefault();
  }
  navigator.geolocation.getCurrentPosition(retrieveWeather);
}

let locationButton = document.querySelector("#currentButton");
locationButton.addEventListener("click", currentLocation);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", locationSubmit);
navigator.geolocation.getCurrentPosition(currentLocation);
