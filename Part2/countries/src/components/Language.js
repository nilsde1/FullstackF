const Language = ({ languages }) => (
  <>
    <h3>Languages</h3>
    <ul>
      {languages.map((language) => (
        <li key={language[0]}>{language[1]}</li>
      ))}
    </ul>
  </>
);

export default Language;
