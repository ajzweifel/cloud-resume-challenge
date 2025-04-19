const apiKey = '099748bf9616d36572ae3671978cf776';
const weatherWidget = document.getElementById('weather-widget');

function getWeather(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      const temp = Math.round(data.main.temp);
      const city = data.name;
      const condition = data.weather[0].main;
      const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

      weatherWidget.innerHTML = `
        <img src="${icon}" alt="${condition}" title="${condition}" />
        <p>${temp}°F – ${condition}<br><small>${city}</small></p>
      `;
    })
    .catch(() => {
      weatherWidget.textContent = 'Unable to load weather.';
    });
}

function loadWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      pos => {
        const { latitude, longitude } = pos.coords;
        getWeather(latitude, longitude);
      },
      () => {
        weatherWidget.textContent = 'Location access denied.';
      }
    );
  } else {
    weatherWidget.textContent = 'Geolocation not supported.';
  }
}

window.addEventListener('DOMContentLoaded', loadWeather);