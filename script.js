// This is a conceptual script. You'll need an actual API key and weather service.
const searchForm = document.getElementById('search-form');
const searchInput = document.querySelector('.search-input');
const currentCityElement = document.getElementById('current-city');
const currentDateElement = document.getElementById('current-date');
const currentTemperatureElement = document.getElementById('current-temperature');
const currentDetailsElement = document.querySelector('.current-details');

// Function to fetch weather data
async function fetchWeather(city) {
    const apiKey = "YOUR_API_KEY"; // Replace with your actual API key
    const apiUrl = `https://api.exampleweather.com/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await axios.get(apiUrl);
        const data = response.data;
        
        // Update the HTML with the new data
        currentCityElement.textContent = data.name;
        currentTemperatureElement.textContent = Math.round(data.main.temp);
        currentDateElement.textContent = formatCurrentDate(new Date());
        currentDetailsElement.innerHTML = `${data.weather[0].description} <br> Humidity: <strong>${data.main.humidity}%</strong>, Wind: <strong>${data.wind.speed}km/h</strong>`;
        
    } catch (error) {
        alert('Could not find weather for that city.');
        console.error('Error fetching weather data:', error);
    }
}

// Function to format the date
function formatCurrentDate(date) {
    const dayOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const day = dayOfWeek[date.getDay()];
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day} ${hours}:${minutes}`;
}

// Event listener for form submission
searchForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const city = searchInput.value.trim();
    if (city) {
        fetchWeather(city);
    }
})