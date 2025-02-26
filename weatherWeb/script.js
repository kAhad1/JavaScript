const apiKey = "6046ddfee28c49d69a4193920250201"; 
document.getElementById("searchBtn").addEventListener("click", async () => {
  const city = document.getElementById("cityInput").value.trim();
  const weatherResult = document.getElementById("weatherResult");

  // Remove the class to reset animation
  weatherResult.classList.remove("show");
  setTimeout(() => {
    // Add the class back after a short delay
    weatherResult.classList.add("show");
  }, 180);

  if (city === "") {
    alert("Please enter a city name.");
    return;
  }

  try {
    const weatherData = await fetchWeather(city);
    displayWeather(weatherData);
    setWeatherBackground(weatherData.current.condition.text); // Set background based on weather condition
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

function setWeatherBackground(condition) {
  const videoElement = document.getElementById('bg-video');
  let videoPath = "videos/weather-video.mp4"; // Default video

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
  }   else if (condition.includes('Light snow showers')) {
    videoPath = "videos/light-snow-shower.mp4";
  }else if (condition.includes('snow')) {
    videoPath = "videos/light-snow.mp4";
  } 
  else if (condition.includes('Freezing fog')) {
    videoPath = "videos/freezing-fog.mp4";

  } else if (condition.includes('fog') || condition.includes('Mist')) {
    videoPath = "videos/Fogg.mp4";
  }  else if (condition.includes('Patchy rain') ) {
    videoPath = "videos/patchy-rain.mp4";
  } else if (condition.includes('Light rain') ) {
    videoPath = "videos/light-rain.mp4";
  }  else if (condition.includes('freezing rain') ) {
    videoPath = "videos/freezing-rain.mp4";
  }  else if (condition.includes('Heavy rain')) {
    videoPath = "videos/heavy-rain.mp4";
  } else if (condition.includes('Moderate rain')) {
    videoPath = "videos/moderate-rain.mp4";
  }
  else if (condition.includes('Blizzard')) {
    videoPath = "videos/Blizzard.mp4";
  }
  
  else if (condition.includes('Thunder') || condition.includes('Patchy light rain in area with thunder') || condition.includes("heavy rain")) {
    videoPath = "videos/moderate-rain-thunder.mp4";
  }
  else if(condition.includes('thunder')){
    videoPath= "videos/thunderstorm.webm"
  }
 

  videoElement.src = videoPath; // Change video source directly
  videoElement.load(); // Reload the video with the new source
}




// const weatherApiKey = "6046ddfee28c49d69a4193920250201"; // Your WeatherAPI key
// const pexelsApiKey = "49077168-0005298451ec092733d2cad55"; // Your Pexels API key

// document.getElementById("searchBtn").addEventListener("click", async () => {
//   const city = document.getElementById("cityInput").value.trim();
//   const weatherResult = document.getElementById("weatherResult");

//   // Remove the class to reset animation
//   weatherResult.classList.remove("show");
//   setTimeout(() => {
//     // Add the class back after a short delay
//     weatherResult.classList.add("show");
//   }, 180);

//   if (city === "") {
//     alert("Please enter a city name.");
//     return;
//   }

//   try {
//     const weatherData = await fetchWeather(city);
//     displayWeather(weatherData);
//     await setWeatherBackground(weatherData.current.condition.text); // Set background based on weather condition
//   } catch (error) {
//     alert("Could not fetch weather data. Please check the city name or try again later.");
//     console.error(error);
//   }
// });

// // Fetch weather data from WeatherAPI
// const fetchWeather = async (city) => {
//   const url = `https://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${city}`;
//   const response = await fetch(url);

//   if (!response.ok) {
//     throw new Error("Failed to fetch weather data.");
//   }

//   const data = await response.json();
//   return data;
// };

// // Display weather data
// const displayWeather = (data) => {
//   const weatherResult = document.getElementById("weatherResult");
//   document.getElementById("cityName").textContent = `Weather in ${data.location.name}, ${data.location.country}`;
//   document.getElementById("temperature").textContent = `Temperature: ${data.current.temp_c}°C`;
//   document.getElementById("description").textContent = `Condition: ${data.current.condition.text}`;
//   document.getElementById("humidity").textContent = `Humidity: ${data.current.humidity}%`;

//   weatherResult.classList.remove("hidden");
// };

// // Fetch and set weather background video from Pexels
// async function setWeatherBackground(condition) {
//   const videoElement = document.getElementById('bg-video');
//   const query = condition.toLowerCase(); // Convert condition to lowercase for Pexels query

//   try {
//     const videoUrl = await fetchWeatherVideo(query);
//     videoElement.src = videoUrl;
//     videoElement.load();
//   } catch (error) {
//     console.error("Error fetching weather video:", error);
//     videoElement.src = "videos/default.mp4"; // Fallback video
//     videoElement.load();
//   }
// }

// // Fetch a weather-related video from Pexels
// async function fetchWeatherVideo(query) {
//   const url = `https://api.pexels.com/videos/search?query=${query}&per_page=1`;
//   const response = await fetch(url, {
//     headers: {
//       Authorization: pexelsApiKey, // Your Pexels API key
//     },
//   });

//   if (!response.ok) {
//     throw new Error("Failed to fetch video from Pexels.");
//   }

//   const data = await response.json();
//   return data.videos[0].video_files[0].link; // Get the first video link
// }