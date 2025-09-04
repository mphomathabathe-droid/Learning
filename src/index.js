// A single object to hold all the DOM elements you'll be interacting with
const elements = {
  temperature: document.querySelector("#current-temperature"),
  city: document.querySelector("#current-city"),
  description: document.querySelector("#description"),
  humidity: document.querySelector("#humidity"),
  windSpeed: document.querySelector("#wind-speed"),
  date: document.querySelector("#current-date"),
  searchForm: document.querySelector("#search-form"),
  searchInput: document.querySelector("#search-input"),
  icon: document.querySelector("#icon"),
};

const apiKey = "b2a5adcct04b33178913oc335f405433";
const apiUrl = "https://api.shecodes.io/weather/v1/current?";

function updateWeather(response) {
  const data = response.data;
  
  // Use a single object to update the DOM to reduce repetition
  elements.city.innerHTML = data.city;
  elements.temperature.innerHTML = Math.round(data.temperature.current);
  elements.description.innerHTML = data.condition.description;
  elements.humidity.innerHTML = data.temperature.humidity;
  elements.windSpeed.innerHTML = data.wind.speed;
  elements.date.innerHTML = formatDate(new Date(data.time * 1000));
  elements.icon.innerHTML = `<img src="${data.condition.icon_url}" class="current-temperature-icon" />`;
}

function fetchWeather(city) {
  axios.get(`${apiUrl}query=${city}&key=${apiKey}&units=metric`)
    .then(updateWeather)
    .catch(error => {
      console.error("Error fetching weather data:", error);
      alert("Could not retrieve weather for that city. Please try again.");
    });
}

function handleSearch(event) {
  event.preventDefault();
  const city = elements.searchInput.value.trim();
  if (city) {
    fetchWeather(city);
  } else {
    alert("Please enter a city name.");
  }
}

function formatDate(date) {
  const days = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
  ];
  
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const day = days[date.getDay()];
  
  return `${day} ${hours}:${minutes}`;
}

// Event listeners
elements.searchForm.addEventListener("submit", handleSearch);

// Fetch weather for a default city on page load
fetchWeather("Paris");