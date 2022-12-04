import React from "react";

const CountryContext = React.createContext()

function CountryProvider(props) {

  const[countries, setCountries] = React.useState()

  React.useEffect(() => {
    fetchData()
    async function fetchData(){
      const data = await import("../data/countries")
      setCountries(data.countries)
    }
  }, [])


  return<CountryContext.Provider value = {[countries]} {...props}/>
}

function useCountry() {
  const context = React.useContext(CountryContext)

  if(!context) {
    throw new Error("can't find a context")
  }

  return context
}

export {CountryProvider, useCountry}