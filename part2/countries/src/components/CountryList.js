import Country from './Country'

const CountryList = ({countries}) => {
  //console.log(countries)
  const countries_ = countries.map((c)=><Country country={c} showDetails={countries.length > 1 ? false : true} key={c.name}/>)
  return (
    <div>
      {countries_}
    </div>
  )
}

export default CountryList
