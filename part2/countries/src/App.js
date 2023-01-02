import axios from "axios";
import { useState, useEffect } from "react";
import Country from "./components/Country";
import CountryList from "./components/CountryList";

function App() {

  const [searchTerm, setsearchTerm] = useState('')
  const [countries, setcountries] = useState([])

  const onSearchChange = (e) => {
    setsearchTerm(e.target.value)
  }

  const filteredCountries = countries.filter((country)=> country.name.includes(searchTerm))

  const listCountries = filteredCountries.map((c)=>{
    return <li key={c.name}>{c.name}</li>
  })


  useEffect(() => {
    axios
      .get('https://restcountries.com/v2/all')
      .then((res)=>{
        console.log(res.data)
        setcountries(res.data)
      })
  }, [])
  
  return (
    <div className="App">
         <form>
           <label>Search: </label>
           <input value={searchTerm} onChange={onSearchChange}/>
         </form>

         {filteredCountries.length <= 10 && <CountryList countries={filteredCountries}/> }

         {filteredCountries.length > 10 && <span>Too many matches please specify another filter</span> }
    </div>
  );
}

export default App;
