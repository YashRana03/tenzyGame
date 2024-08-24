import "./App.css";
import { useState, useEffect } from "react";
import Dice from "./components/Dice";

function App() {
  const [diceValues, setDiceValues] = useState(tenRandomValues()); //10 random numbers from 1 to 6
  const [selected, setSelected] = useState(new Array(10).fill(false));

  // Rolls the dice, making sure that selected dice do not change in value
  function rollDice() {
    setDiceValues((prevState) => {
      // console.log(prevState, selected);
      const newArr = [...prevState];
      for (let i = 0; i < selected.length; i++) {
        if (!selected[i]) {
          newArr[i] = random();
        }
      }
      return newArr;
    });
  }

  // Returns random number in range 1-6
  function random() {
    return Math.floor(Math.random() * 6) + 1;
  }

  // returns 10 random numbers in the range 1-6
  function tenRandomValues() {
    const newArr = [];
    for (let i = 0; i < 10; i++) {
      newArr.push(random());
    }
    return newArr;
  }

  // selects/unselects dice on click
  function toggleSelected(event) {
    setSelected((prevState) => {
      const newArr = [...prevState];
      newArr[event.target.id] = !newArr[event.target.id];
      return newArr;
    });
  }

  // creating  array of dice elements to be rendered from random values
  const elementsArr = diceValues.map((val1, i) => {
    return (
      <Dice
        num={val1}
        key={i}
        id={i}
        handleClick={toggleSelected}
        selected={selected[i]}
      />
    );
  });
  return (
    <>
      <div className="container">
        <div className="canvas">
          <button className="roll-btn" onClick={rollDice}>
            ROLL
          </button>
          <div className="grid-container">
            <div className="dice-grid">{elementsArr}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
