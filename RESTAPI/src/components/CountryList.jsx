function CountryList({ countries, onShow }) {
  if (!Array.isArray(countries) || countries.length === 0) {
    return null
  }

  if (countries.length > 10) {
    return <p>Too many matches, please refine your search.</p>
  }

  return (
    <ul>
      {countries.map((country) => (
        <li key={country.cca3}>
          {country.name.common}{' '}
          <button onClick={() => onShow(country)}>Show</button>
        </li>
      ))}
    </ul>
  )
}

export default CountryList;
