import React from "react";

const Filter = ({ filterParam, handleFilterChange }) => (
  <>
    find countries <input value={filterParam} onChange={handleFilterChange} />
  </>
);

export default Filter;
