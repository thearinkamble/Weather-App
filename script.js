const apiKey = 'cd8e3eb639e9c85a3b107c835fe06c64'; // Replace with your OpenWeatherMap API key
const indianCities = ['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata'];

document.getElementById('submitButton').addEventListener('click', getWeather);

async function getWeather() {
    const city = document.getElementById('cityInput').value.trim();
    resetDisplay();

    if (!city) {
        displayError('Please enter a city name!');
        return;
    }

    await fetchWeather(city);
}

async function fetchWeather(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error('City not found');
        }

        const data = await response.json();
        updateWeatherDisplay(data);
    } catch (error) {
        displayError(error.message);
    }
}

function resetDisplay() {
    document.getElementById('errorMessage').style.display = 'none';
    document.getElementById('cityName').textContent = '';
    document.getElementById('temperature').textContent = '';
    document.getElementById('weatherDescription').textContent = '';
    document.getElementById('windSpeed').textContent = '';
    document.getElementById('humidity').textContent = '';
    document.getElementById('weatherIcon').style.display = 'none';
}

function updateWeatherDisplay(data) {
    document.getElementById('cityName').textContent = data.name;
    document.getElementById('temperature').textContent = `Temperature: ${data.main.temp} °C`;
    document.getElementById('weatherDescription').textContent = `Weather: ${data.weather[0].description}`;
    document.getElementById('windSpeed').textContent = `Wind Speed: ${data.wind.speed} m/s`;
    document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
    const icon = document.getElementById('weatherIcon');
    icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    icon.style.display = 'block';
}

function displayError(message) {
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}

// Display weather updates for major Indian cities
(async function fetchIndianCitiesWeather() {
    const cityUpdates = document.getElementById('cityUpdates');
    for (const city of indianCities) {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
            const data = await response.json();
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${data.name}</strong>: ${data.main.temp}°C, ${data.weather[0].description} 
                <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="Icon">
            `;
            cityUpdates.appendChild(li);
        } catch (error) {
            console.error(`Failed to fetch weather data for ${city}: ${error.message}`);
        }
    }
})();
