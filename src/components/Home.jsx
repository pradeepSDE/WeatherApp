import React, { useState, useEffect } from "react";

// Remove reference to App.css, styles moved to Tailwind

function Home() {
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = "e58cc08c2a2a4646ae385025240803"; // Replace with your actual weather API key

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
            className="px-4 py-2 ml-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
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
          <h3 className=" text-2xl font-semibold ">{weatherData.location.name},{weatherData.location.region}</h3>
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
      <h1 className="text-2xl mt-5 p-2 pb-5 font-bold mb-4">By Pradeep_bisen</h1>
      </div>
    </div>
  );
}

export default Home;
