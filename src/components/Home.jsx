import React, { useState, useEffect } from "react";

// Remove reference to App.css, styles moved to Tailwind

function Home() {
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [currentWeatherData, setcurrentWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");

  const apiKey = "e58cc08c2a2a4646ae385025240803"; // Replace with your actual weather API key
  //  let cor = {lat}
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  function showPosition(position) {
    setLong(position.coords.longitude);
    setLat(position.coords.latitude);
    // Do something with the latitude value (e.g., display it, store it)
  }
  console.log(lat);
  function showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.");
        break;
      default:
        alert("An unknown error occurred.");
    }
  }
  useEffect(() => {
    getLocation();

    try {
     lat &&  fetch(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${long}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(`status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setcurrentWeatherData(data);
          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  }, [lat, long]);

  console.log(currentWeatherData);
  const handlesubmit = (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      fetch(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(`status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setWeatherData(data);
          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };
  console.log(weatherData);

  return (
    <div className=" bg-gray-200 min-h-screen flex flex-col items-center justify-center">
      <header className="App-header flex flex-col items-center p-8">
        <h1 className="text-4xl pb-5 font-bold mb-4">Weather App</h1>
        {currentWeatherData && (
          <div className="weather-card bg-white rounded-md shadow-md p-4 flex flex-col items-center gap-4">
            <h3 className=" text-2xl font-semibold ">
              {currentWeatherData.location.name},{" "}
              {currentWeatherData.location.region}
            </h3>
            <p className="flex items-center gap-2">
              <span className="text-xl">
                {currentWeatherData.current.condition.text}
              </span>
            </p>
            <ul className="list-disc pl-4">
              <li>Feels Like: {currentWeatherData.current.temp_c} </li>
              <li>Wind Speed: {currentWeatherData.current.wind_kph}km/h</li>
              <li>Humidity:{currentWeatherData.current.humidity}</li>
            </ul>
          </div>
        )}
        <form
          className="flex justify-between w-full mt-8"
          onSubmit={handlesubmit}
        >
          <input
            type="text"
            placeholder="Enter City Name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
          <button
            type="submit"
            className="px-4 py-2  ml-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
          >
            Search
          </button>
        </form>
        {error && <p className="text-red-500 font-bold">{error}</p>}
      </header>
      {loading && (
        <p className="text-2xl font-blue-500 font-semibold font-sans ">
          {" "}
          Loading..{" "}
        </p>
      )}
      {weatherData && (
        <div className="weather-card bg-white rounded-md shadow-md p-4 flex flex-col items-center gap-4">
          <h3 className=" text-2xl font-semibold ">
            {weatherData.location.name}, {weatherData.location.region}
          </h3>
          <p className="flex items-center gap-2">
            <span className="text-xl">
              {weatherData.current.condition.text}
            </span>
          </p>
          <ul className="list-disc pl-4">
            <li>Feels Like: {weatherData.current.temp_c} </li>
            <li>Wind Speed: {weatherData.current.wind_kph}km/h</li>
            <li>Humidity:{weatherData.current.humidity}</li>
          </ul>
        </div>
      )}
      <div>
        <h1 className="text-2xl mt-5 p-2 pb-5 font-bold mb-4">
          By Pradeep_bisen
        </h1>
      </div>
    </div>
  );
}

export default Home;
