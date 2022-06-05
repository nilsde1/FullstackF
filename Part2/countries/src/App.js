import React, { useEffect, useState } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import CountryList from "./components/CountryList";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filterParameter, setFilterParamter] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleFilterChanges = (event) => {
    setFilterParamter(event.target.value);
  };

  const matchingCountry =
    filterParameter === ""
      ? countries
      : countries.filter((country) =>
          country.name.common
            .toLowerCase()
            .includes(filterParameter.toLowerCase())
        );

  return (
    <div>
      <Filter
        newFilter={filterParameter}
        handleFilterChange={handleFilterChanges}
      />
      <CountryList
        countries={matchingCountry}
        setFilterParam={setFilterParamter}
      />
    </div>
  );
};

export default App;
