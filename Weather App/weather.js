const apiKey = "934c3b8796d27ab0cc0d34a06a86bdc1";
const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");
const weatherInfo = document.getElementById("weather-info");
const errorMessage = document.getElementById("error-message");

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeatherData(city);
    }
});

// Allow hitting "Enter" key inside input field to submit
cityInput.addEventListener("keypress", (e) => {
    if(e.key === "Enter") {
        const city = cityInput.value.trim();
        if (city) getWeatherData(city);
    }
});

async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error("City not found");
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        showError();
    }
}

function displayWeather(data) {
    //Reveal info panel and cover previous error
    weatherInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");

    // Inject metrics down into targeting DOM text Layers
    document.getElementById("city-name").textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById("condition").textContent = data.weather[0].main;
    document.getElementById("temperature").textContent = `${Math.round(data.main.temp)}°C`;
    document.getElementById("humidity").textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById("wind").textContent = `Wind: ${data.wind.speed} km/h`;

    // Dynamically query weather graphics directly out of OpenWeather CDN
    const iconCode = data.weather[0].icon;
    document.getElementById("weather-icon").src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

function showError() {
    weatherInfo.classList.add("hidden");
    errorMessage.classList.remove("hidden");
}


