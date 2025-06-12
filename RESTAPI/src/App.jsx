//developed in Firefox

import { useState, useEffect, use } from 'react'
import axios from 'axios'
import CountryList from './components/CountryList'
import CountryDetails from './components/CountryDetails'
import SearchBox from './components/SearchBox'

function App () {

  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [error, setError] = useState(null)

  
  useEffect(() => {
    if (!search) {
      setCountries([])
      setSelectedCountry(null)
      setError(null)
      return
    }

    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${search}`)
      .then((response) => {
        const data = response.data

        if (data.name) {
          // Single match
          setSelectedCountry(data)
          setCountries([data]) // for consistency
        } else if (Array.isArray(data)) {
          // Multiple matches
          setSelectedCountry(null)
          setCountries(data)
        } else {
          setCountries([])
          setSelectedCountry(null)
        }

        setError(null)
      })
      .catch((err) => {
        setError('Country not found or fetch failed.')
        setCountries([])
        setSelectedCountry(null)
      })
  }, [search]);

  return (
    <div>
      <h1>Country Information</h1>
      <SearchBox value={search} onChange={setSearch} />

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {selectedCountry ? (
        <CountryDetails country={selectedCountry} />
      ) : (
        <CountryList countries={countries} onSelect={setSearch} />
      )}
    </div>
  );

}

export default App