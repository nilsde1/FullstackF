const PersonForm = ({ onSubmit, newNameP, handlePChange }) => {
    return (
      <form onSubmit={onSubmit}>
        <div>
          name:{" "}
          <input name="name" value={newNameP.name} onChange={handlePChange} />
        </div>
        <div>
          number:{" "}
          <input name="number" value={newNameP.number} onChange={handlePChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    );
  };
  
  export default PersonForm;