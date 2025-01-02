const apiKey = "6046ddfee28c49d69a4193920250201"; 
document.getElementById("searchBtn").addEventListener("click", async () => {
  const city = document.getElementById("cityInput").value.trim();
  
  if (city === "") {
    alert("Please enter a city name.");
    return;
  }
  
  try {
    const weatherData = await fetchWeather(city);
    displayWeather(weatherData);
  } catch (error) {
    alert("Could not fetch weather data. Please check the city name or try again later.");
    console.error(error);
  }
});

const fetchWeather = async (city) => {
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch weather data.");
  }

  const data = await response.json();
  return data;
};

const displayWeather = (data) => {
  const weatherResult = document.getElementById("weatherResult");
  document.getElementById("cityName").textContent = `Weather in ${data.location.name}, ${data.location.country}`;
  document.getElementById("temperature").textContent = `Temperature: ${data.current.temp_c}°C`;
  document.getElementById("description").textContent = `Condition: ${data.current.condition.text}`;
  document.getElementById("humidity").textContent = `Humidity: ${data.current.humidity}%`;
  
  weatherResult.classList.remove("hidden");
};
