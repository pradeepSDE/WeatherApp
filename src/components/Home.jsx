import React, { useState, useEffect } from "react";

// Remove reference to App.css, styles moved to Tailwind

function Home() {
  console.log("njn");
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = "e58cc08c2a2a4646ae385025240803"; // Replace with your actual weather API key

  const handlesubmit = (e) => {
    e.preventDefault();
    console.log("handlesubmit vhala ");
    try {
      fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`statu: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setWeatherData(data);
          console.log(data);
        });
    } catch (error) {
      console.log("mhui jhua");
    }
  };
  console.log(weatherData);

  return (
    <div className=" bg-gray-200 min-h-screen flex flex-col items-center justify-center">
      <header className="App-header flex flex-col items-center p-8">
        <h1 className="text-2xl font-bold mb-4">Weather App</h1>
        <form className="flex justify-between w-full" onSubmit={handlesubmit}>
          <input
            type="text"
            placeholder="Enter City Name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
          >
            Search
          </button>
        </form>
        {error && <p className="text-red-500 font-bold">{error}</p>}
      </header>
      {weatherData && (
        <div className="weather-card bg-white rounded-md shadow-md p-4 flex flex-col items-center gap-4">
          <h3>{}</h3>
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
    </div>
  );
}

export default Home;