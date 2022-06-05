const Filter = ({ filterParameter, handleFilter }) => {
    return (
      <p>
        filter shown with <input value={filterParameter} onChange={handleFilter} />
      </p>
    );
  };
  
  export default Filter;