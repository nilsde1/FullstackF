import { useState } from "react";

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>{text} </button>
);

const StatisticLine = ({ text, value }) => (
  //little bit overboard (wouldn't need table,thead,tbody)
  <table border="1">
    <thead></thead>
    <tbody>
      <tr>
        <th>{text}</th>
        <th> {value}</th>
      </tr>
    </tbody>
  </table>
);

const Statistics = (stats) => {
  const total = stats.good + stats.bad + stats.neutral;
  const average = (stats.good - stats.bad) / total;
  const positive = (stats.good / total) * 100;

  if (total > 0) {
    return (
      <div>
        <StatisticLine text="good" value={stats.good} />
        <StatisticLine text="neutral" value={stats.neutral} />
        <StatisticLine text="bad" value={stats.bad} />
        <StatisticLine text="Total" value={total} />
        <StatisticLine text="Average" value={average} />
        <StatisticLine text="Positive" value={positive + "%"} />
      </div>
    );
  } else {
    return <div>No Feedback</div>;
  }
};

const App = () => {
  // save clicks of each button to its own state

  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
