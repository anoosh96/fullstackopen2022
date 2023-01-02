import axios from "axios"
import { useState, useEffect } from "react"


const Country = ({country, showDetails}) => {

  const [showDet, setshowDet] = useState(showDetails)
  const [weather, setweather] = useState({})
  const [weatherLoading, setweatherLoading] = useState(true)

  const detailToggle = () => {
    setshowDet(!showDet)
  }


  useEffect(() => {
    setshowDet(showDetails)
  }, [showDetails])

  useEffect(() => {
    if (showDetails) {
      axios
        .get('http://api.weatherapi.com/v1/current.json', {params: {key: process.env.REACT_APP_WEATHER_API_KEY, q: country.capital}})
        .then((res)=>{
          console.log(res.data);
          setweather(res.data);
          setweatherLoading(false);
        })
    }
  }, [showDetails])

  return (
    <div>
      <h2>{country.name}</h2>
      <button onClick={detailToggle}>show details</button>

      { showDet &&
        <div className="country-details" style={{marginTop: '10px'}}>
          <div>Capital: {country.capital}</div>
          <div>Area: {country.area}</div>
          <h3>Languages</h3>
          <ul>
            {country.languages.map((l)=><li key={l.name}>{l.name}</li>)}
          </ul>
          <div>
            <img src={country.flag} style={{width: '50px', height: '50px', objectFit: 'cover'}}/>
          </div>

          { !weatherLoading && 
            <div>
              <h3>Weather in {country.capital}</h3>
              <div>Temperature: {weather.current.temp_c} Celcius</div>
              <img src={weather.current.condition.icon}/>
              <div>Wind: {weather.current.wind_kph} </div>
            </div>
          }
        </div>
      }
    </div>
  )
}

export default Country
