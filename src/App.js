import "./App.css";
import React from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  const bestScoreInit = localStorage.getItem("bestScore");
  const bestTimeInit = localStorage.getItem("bestTime");

  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [bestScore, setBestScore] = React.useState(
    JSON.parse(bestScoreInit) || 1000
  );
  const [bestTime, setBestTime] = React.useState(
    JSON.parse(bestTimeInit) || Number.MAX_SAFE_INTEGER
  );
  const [time, setTime] = React.useState(0);

  React.useEffect(() => {
    let interval = null;

    if (!tenzies) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [tenzies]);

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
    }
  }, [dice]);

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  function rollDice() {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.isHeld ? die : generateNewDie();
      })
    );
    setScore((prevScore) => prevScore + 1);
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  function newGame() {
    setTenzies(false);
    setDice(allNewDice());
    if (bestScore === 1000) {
      setBestScore(score);
    } else if (score < bestScore) {
      setBestScore(score);
    }
    if (bestTime === Number.MAX_SAFE_INTEGER) {
      setBestTime(time);
    } else if (time < bestTime) {
      setBestTime(time);
    }
    setScore(0);
    setTime(0);
  }

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        {tenzies
          ? "YOU WON!"
          : "Roll until all dice are the same. Click each die to freeze it at its current value between rolls."}
      </p>
      <p className="scores">
        <b className="best">
          Lowest Rolls: {bestScore === 1000 ? "-" : bestScore}
        </b>
        &emsp;
        <b className="best">
          Best Time:{" "}
          {bestTime === Number.MAX_SAFE_INTEGER ? "-" : bestTime + "s"}
        </b>
      </p>
      <p className="scores">
        <b>Rolls: {score}</b>&emsp;
        <b>Time: {time}s</b>
      </p>
      <div className="dice-container">{diceElements}</div>
      <button className="roll-dice" onClick={tenzies ? newGame : rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}
