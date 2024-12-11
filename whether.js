document.getElementById("getWeather").addEventListener("click", function () {
    const city = document.getElementById("city").value.trim();
    const apiKey = '00b15689f08654a98208b686f1e0b777' ; 
    
    if (!city) {
        console.log("No city entered."); 
        return;
    }

    const url = `api.openweathermap.org/data/2.5/weather?q=London&APPID=00b15689f08654a98208b686f1e0b777`;
    
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("City not found or API error");
            }
            return response.json();
        })
        .then(data => {
            console.log("API Response:", data); 
            const tempCelsius = (data.main.temp - 273.15).toFixed(2);
            const feelsLikeCelsius = (data.main.feels_like - 273.15).toFixed(2);
            const tempMinCelsius = (data.main.temp_min - 273.15).toFixed(2);
            const tempMaxCelsius = (data.main.temp_max - 273.15).toFixed(2);
            const windSpeed=(data.wind.speed *3.6).toFixed(2)
            document.getElementById("weather").innerHTML = `
                <h2>${data.name}, ${data.sys.country}</h2>
                <p><strong>Temperature:</strong> ${tempCelsius}°C</p>
                <p><strong>Weather:</strong> ${data.weather[0].description}</p>
                <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
                <p><strong>Wind Speed:</strong> ${windSpeed} km/h</p>
            `;
            document.getElementById("weather").style.display = "block";
        })
        .catch(error => {
            console.error("Error fetching weather:", error);
            document.getElementById("weather").innerHTML = `<p class="error">${error.message}</p>`;
            document.getElementById("weather").style.display = "block";
        });
});
