import React, { useState, useEffect } from 'react'

const Button = (props) => {
  return (
    <>
      <button onClick={props.foo}>{props.name}</button>
    </>
  )
}

const StatisticLine = (props) => {
  return (
    <>
      <td>{props.name}</td> 
      <td>{props.statistic} {props.unit}</td>
    </>
  )
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const [showStatistics, setShowStatistics] = useState(false);
  const message = "No feedback given"

  useEffect(() => {
    if (all === 0) return;
    setShowStatistics(true)
    setAverage((good - bad) / all)
    setPositive(good / all * 100)
  }, [good, neutral, bad, all])

  const handleGood = () => {
    setGood(good + 1)
    setAll(all + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
  }

  const handleBad = () => {
    setBad(bad + 1)
    setAll(all + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button name="good" foo={handleGood}/>
      <Button name="neutral" foo={handleNeutral}/>
      <Button name="bad" foo={handleBad}/>
      <h1>statistics</h1>
      {showStatistics &&
      <table>
        <tbody>
          <tr>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr><StatisticLine name="good" statistic={good} unit=""/></tr>
          <tr><StatisticLine name="neutral" statistic={neutral} unit="" /></tr>
          <tr><StatisticLine name="bad" statistic={bad} unit="" /></tr>
          <tr><StatisticLine name="all" statistic={all} unit="" /></tr>
          <tr><StatisticLine name="average" statistic={average} unit="" /></tr>
          <tr><StatisticLine name="positive" statistic={positive} unit="%" /></tr>
        </tbody>
      </table>
      }
      {!showStatistics && message}
    </div>
  )
}

export default App
