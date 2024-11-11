const apiKey = "d48724fcbc383608c98adfb53e27afe6";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkweather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        const data = await response.json();

        // Update weather details in the card
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

        // Change weather icon and background based on weather condition
        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "images/clouds.png";
            document.body.style.backgroundImage = "url('backgrounds/clouds.jpg')"; // Cloudy background
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "images/clear.png";
            document.body.style.backgroundImage = "url('backgrounds/clear.jpg')"; // Clear sky background
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "images/rain.png";
            document.body.style.backgroundImage = "url('backgrounds/rain.jpg')"; // Rainy background
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
            document.body.style.backgroundImage = "url('backgrounds/drizzle.jpg')"; // Drizzle background
        } else if (data.weather[0].main == "Mist" || data.weather[0].main == "Fog" || data.weather[0].main == "Smoke") {
            weatherIcon.src = "images/mist.png";
            document.body.style.backgroundImage = "url('backgrounds/mist.jpg')"; // Misty background
        }

        // Show weather details and hide the error message
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

// Event listener for the "Search" button
searchBtn.addEventListener("click", () => {
    checkweather(searchBox.value); // Calls checkweather with the value from searchBox
});

// Event listener for "Enter" key press inside the input field
searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        checkweather(searchBox.value); // Calls checkweather with the value from searchBox
    }
});
