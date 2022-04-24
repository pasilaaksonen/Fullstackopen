import React, { useState, useEffect } from 'react';
import axios from 'axios';



function Checker({ results, isTooMany, setSearchWith }) {

  const [temperature, setTemperature] = useState(null)
  const [tempIconUrl, setTempIconUrl] = useState(null)
  const [windSpeed, setWindSpeed] = useState(null)
  const [windDirection, setWindDirection] = useState(null)

  if (isTooMany) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  } else {

    if (results.length > 1) {
      return (
      <>
        {results.map(result =>
          <p key={result.name}>
            {result.name} 
            <button onClick={() => setSearchWith(result.name)}>show</button>
          </p>
        )}
      </>
      )
    }

    if (results.length === 1) {

      const params = {
        access_key: process.env.REACT_APP_API_KEY,
        query: results[0].name
      }
      
      axios.get('http://api.weatherstack.com/current', {params})
      .then(response => {
        const apiResponse = response.data;
        setTemperature(apiResponse.current.temperature)
        setTempIconUrl(apiResponse.current.weather_icons[0])
        setWindSpeed(apiResponse.current.wind_speed)
        setWindDirection(apiResponse.current.wind_dir)
      }).catch(error => {
        console.log(error);
      });

      return (
        <>
          <h1>{results[0].name}</h1>
          <p>
            capital {results[0].capital}<br />
            population {results[0].population}
          </p>
          <h2>Spoken languages</h2>
          <ul>
          {results[0].languages.map(language =>
          <li key={language.name}>{language.name}</li>)}
          </ul>
          <br />
          <img 
            src={results[0].flag}
            alt="new"
            width="150"
            height="150"
          />
          <h2>Weather in {results[0].capital}</h2>
          <p><b>temperature:</b> {temperature} Celcius</p>
          <img 
            src={tempIconUrl}
            alt="weather_icon"
          />
          <p><b>wind:</b> {windSpeed} mph direction {windDirection}</p>
        </>
      )
    }
  }
}


function App() {

  //All data
  const [countryData, setCountryData] = useState([]);
  //Searched data
  const [searchWith, setSearchWith] = useState("")
  const [results, setResults] = useState([]);
  const [isTooMany, setIsTooMany] = useState(false);

  const handleIsTooMany = (number) => {
    if (number >= 10) {
      setIsTooMany(true)
    } if (number < 10) {
      setIsTooMany(false)
    }
  }

  //Gets all the data at the first render
  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then((response) => setCountryData(response.data))
  }, [])

  //Makes a search based on search field and updates results
  useEffect(() => {
      if (!searchWith) return;
      let countries = countryData.filter(country => country.name.toUpperCase().includes(searchWith.toUpperCase()))
      setResults(countries)
      handleIsTooMany(countries.length)
  }, [searchWith, countryData])

  return (
    <>
      find countries <input onChange={(e) => setSearchWith(e.target.value)} />
      {results.length > 0 && <Checker isTooMany={isTooMany} results={results} setSearchWith={setSearchWith}/>}
    </>
  );
}

export default App;
