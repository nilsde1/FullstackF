import Country from "./Country";

const ListCountry = ({ countries, setFilterParameter }) =>
  countries.length === 1 ? (
    <div>
      <Country country={countries} />
    </div>
  ) : countries.length > 10 ? (
    <div>
      <h1>Too many matches, specify another filter</h1>
    </div>
  ) : (
    <div>
      {countries.map((country) => (
        <div key={country.cca3}>
          {country.name.common}
          <button onClick={() => setFilterParameter(country.name.common)}>
            show
          </button>
        </div>
      ))}
    </div>
  );

export default ListCountry;
