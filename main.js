// General UI Variables
const notification = document.querySelector(".notification");
const city = document.querySelector(".city");
const country = document.querySelector(".country");
const currentDate = document.querySelector(".date");
const icon = document.querySelector(".icon");
const temperature = document.querySelector(".temperature");
const tempDescription = document.querySelector(".temp-description");
const minTemp = document.querySelector(".min");
const maxTemp = document.querySelector(".max");
const geolocationBtn = document.querySelector(".geolocation-btn");

// Essentials
const key = "16955d729b3c76913ae62114164ca0d7";

// Fetched data will be injected in these objects
const weatherData = {
  city: {},
  country: {},
  temperature: {},
  tempDescription: {},
  iconId: {},
  tempMax: {},
  tempMin: {},
};

// Current Time
const time = new Date();
currentDate.innerHTML = `<p>${time.toDateString()}</p>`;

// Event Listener when clicked on Geolocation Button to get Local Geolocation
geolocationBtn.addEventListener("click", (e) => {
  // Check if browser has geolocation
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getPosition, displayError);
  } else {
    // Error if browser doesn't support geolocation
    alert("Browser Doesn't Support Geolocation");
  }
});

// Get the computer geolocation
function getPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  // Once coords obtained, fire this function
  getCurrentWeather(latitude, longitude);
}

// In case an error occurs
function displayError(error) {
  alert(error.message);
}

// Main Function to get Geolocation and Display it on the UI
function getCurrentWeather(latitude, longitude) {
  const url = `https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric`;

  // Get Data from the API
  fetch(url)
    .then((response) => {
      let data = response.json();
      return data;
    })
    .then((data) => {
      weatherData.city = data.name;
      weatherData.country = data.sys.country;
      weatherData.temperature = Math.floor(data.main.temp);
      weatherData.tempDescription = data.weather[0].description;
      weatherData.iconId = data.weather[0].icon;
      weatherData.minTemp = Math.floor(data.main.temp_min);
      weatherData.maxTemp = Math.floor(data.main.temp_max);
    })
    .then(() => {
      // Fire this function to display the stored data to the UI
      displayCurrentWeather();
    });

  function displayCurrentWeather() {
    city.innerHTML = `${weatherData.city}, `;
    country.innerHTML = `${weatherData.country}`;
    icon.innerHTML = `<img src="./assets/${weatherData.iconId}.svg" />`;
    temperature.innerHTML = `${weatherData.temperature}<span> C°</span>`;
    tempDescription.innerHTML = `${weatherData.tempDescription}`;
    minTemp.innerHTML = `<p>${weatherData.minTemp}</p>`;
    maxTemp.innerHTML = `<p>${weatherData.maxTemp}</p>`;
  }
}

// Input Functionality

const input = document.querySelector(".input-field");

// Event Listener on Input
input.addEventListener("keypress", (e) => {
  // Get Weather from Input
  const url = `https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${key}&units=metric`;

  if (e.keyCode === 13) {
    getWeatherForCity();
    input.value = "";
  }

  function getWeatherForCity() {
    fetch(url)
      .then((response) => {
        let data = response.json();
        return data;
      })
      .then((data) => {
        weatherData.city = data.name;
        weatherData.country = data.sys.country;
        weatherData.temperature = Math.floor(data.main.temp);
        weatherData.tempDescription = data.weather[0].description;
        weatherData.iconId = data.weather[0].icon;
        weatherData.minTemp = Math.floor(data.main.temp_min);
        weatherData.maxTemp = Math.floor(data.main.temp_max);
      })
      .then(() => {
        getCityWeather();
      })
      .catch(() => {
        alert("Please enter a valid city name.");
      });

    function getCityWeather() {
      city.innerHTML = `${weatherData.city}, `;
      country.innerHTML = `${weatherData.country}`;
      icon.innerHTML = `<img src="./assets/${weatherData.iconId}.svg" />`;
      temperature.innerHTML = `${weatherData.temperature}<span>°C</span>`;
      tempDescription.innerHTML = `${weatherData.tempDescription}`;
      minTemp.innerHTML = `<p>${weatherData.minTemp}</p>`;
      maxTemp.innerHTML = `<p>${weatherData.maxTemp}</p>`;
    }
  }
});
