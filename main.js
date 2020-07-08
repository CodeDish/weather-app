// // General UI Variables
// const notification = document.querySelector(".notification");
// const searchBox = document.querySelector(".search-box");
// const city = document.querySelector(".city");
// const country = document.querySelector(".country");
// const currentDate = document.querySelector(".date");
// const icon = document.querySelector(".icon");
// const temperature = document.querySelector(".temperature");
// const minTemp = document.querySelector(".min");
// const maxTemp = document.querySelector(".max");

// // Current Time
// const time = new Date();
// currentDate.innerHTML = `<p>${time.toDateString()}</p>`;

// // Get User Geolocation Position on Load
// document.addEventListener("DOMContentLoaded", () => {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(getPosition, displayError);
//   } else {
//     notification.style.display = "block";
//     notification.innerHTML = "<p>Browser Doesn't Support Geolocation</p>";
//   }
// });

// function getPosition(position) {
//   let latitude = position.coords.latitude;
//   let longitude = position.coords.longitude;

//   getCurrentWeather(latitude, longitude);
// }

// function displayError(error) {
//   notification.style.display = "block";
//   notification.innerHTML = `<p>${error.message}</p>`;
// }

// function getCurrentWeather(latitude, longitude) {
//   const key = "16955d729b3c76913ae62114164ca0d7";
//   const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric`;

//   fetch(url)
//     .then((response) => {
//       let data = response.json();
//       return data;
//     })
//     .then((data) => {
//       console.log(data);
//     });
// }
