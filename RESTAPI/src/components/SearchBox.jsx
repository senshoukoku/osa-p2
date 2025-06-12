function SearchBox ({value, onChange}) {
    return(
        <div>
            <label>Search for a Country (full country name) </label> 
            <input value={value} onChange={(e) => onChange(e.target.value)}/>
        </div>
    )
}
export default SearchBox