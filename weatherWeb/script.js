const apiKey = "6046ddfee28c49d69a4193920250201"; 


const videoPaths = [
  "videos/clear.mp4",
  "videos/partlycloudy.mp4",
  "videos/sunny.mp4",
  "videos/cloudy.mp4",
  "videos/overcast.mp4",
  "videos/rainy.mp4",
  "videos/snowy.mp4",
  "videos/light-snow-shower.mp4",
  "videos/light-snow.mp4",
  "videos/freezing-fog.mp4",
  "videos/mist2.mp4",
  "videos/Fogg.mp4",
  "videos/patchy-rain.mp4",
  "videos/light-rain.mp4",
  "videos/freezing-rain.mp4",
  "videos/heavy-rain.mp4",
  "videos/moderate-rain.mp4",
  "videos/Blizzard.mp4",
  "videos/moderate-rain-thunder.mp4",
  "videos/thunderstorm.mp4"
];


function preloadVideos() {
  videoPaths.forEach((path) => {
    const video = document.createElement("video");
    video.src = path;
    video.preload = "auto"; 
  });
}


window.onload = preloadVideos;

document.getElementById("searchBtn").addEventListener("click", async () => {
  const city = document.getElementById("cityInput").value.trim();
  const weatherResult = document.getElementById("weatherResult");

  weatherResult.classList.remove("show");
  setTimeout(() => {
    weatherResult.classList.add("show");
  }, 180);

  if (city === "") {
    alert("Please enter a city name.");
    return;
  }
  document.getElementById("loadingSpinner").classList.remove("hidden");
  try {
    const weatherData = await fetchWeather(city);
    displayWeather(weatherData);
    setWeatherBackground(weatherData.current.condition.text); 
  } catch (error) {
    alert("Could not fetch weather data. Please check the city name or try again later.");
    console.error(error);
  }finally {
    // Hide the loading spinner
    document.getElementById("loadingSpinner").classList.add("hidden");
  }
});

document.getElementById("cityInput").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    document.getElementById("searchBtn").click(); 
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

function setWeatherBackground(condition) {
  const videoElement = document.getElementById('bg-video');
  let videoPath = "videos/weather-video.mp4"; 

  if (condition.includes('Clear')) {
    videoPath = "videos/clear.mp4";
  } else if (condition.includes('Partly cloudy')) {
    videoPath = "videos/partlycloudy.mp4";
  } else if (condition.includes('Sunny')) {
    videoPath = "videos/sunny.mp4";
  } else if (condition.includes('Cloudy')) {
    videoPath = "videos/cloudy.mp4";
  } else if (condition.includes('Overcast')) {
    videoPath = "videos/overcast.mp4";
  } else if (condition.includes('Rain')) {
    videoPath = "videos/rainy.mp4";
  } else if (condition.includes('Heavy snow')) {
    videoPath = "videos/snowy.mp4";
  } else if (condition.includes('Light snow showers')) {
    videoPath = "videos/light-snow-shower.mp4";
  } else if (condition.includes('snow')) {
    videoPath = "videos/light-snow.mp4";
  } else if (condition.includes('Freezing fog')) {
    videoPath = "videos/freezing-fog.mp4";
  } else if (condition.includes('Mist')) {
    videoPath = "videos/mist2.mp4";
  } else if (condition.includes('Fog')) {
    videoPath = "videos/Fogg.mp4";
  } else if (condition.includes('Patchy rain')) {
    videoPath = "videos/patchy-rain.mp4";
  } else if (condition.includes('Light rain')) {
    videoPath = "videos/light-rain.mp4";
  } else if (condition.includes('freezing rain')) {
    videoPath = "videos/freezing-rain.mp4";
  } else if (condition.includes('Heavy rain')) {
    videoPath = "videos/heavy-rain.mp4";
  } else if (condition.includes('Moderate rain')) {
    videoPath = "videos/moderate-rain.mp4";
  } else if (condition.includes('Blizzard')) {
    videoPath = "videos/Blizzard.mp4";
  } else if (condition.includes('Thunder') || condition.includes('Patchy light rain in area with thunder') || condition.includes("heavy rain")) {
    videoPath = "videos/moderate-rain-thunder.mp4";
  } else if (condition.includes('thunder')) {
    videoPath = "videos/thunderstorm.mp4";
  }

  videoElement.src = videoPath;
videoElement.load(); 
videoElement.play();

}