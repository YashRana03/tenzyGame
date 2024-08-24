import "./App.css";
import { useState, useEffect } from "react";
import Dice from "./components/Dice";

function App() {
  // dice state (includes dice value and if dice is selected or not)
  const [dice, setDice] = useState(
    tenRandomValues().map((val) => {
      return {
        value: val,
        selected: false,
      };
    })
  );

  // button state (enabled/disabled)
  const [btnDisabled, setBntDisabled] = useState(false);

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
    setDice((prevState) => {
      const id = event.target.id; // getting id of clicked dice
      const newArr = [...prevState];

      // updating the dice object
      newArr[id] = {
        ...newArr[id],
        selected: !newArr[id].selected,
      };
      return newArr; // returning the updated array of dice
    });
  }

  // Rolls the dice, making sure that selected dice do not change in value
  function rollDice() {
    setDice((prevState) => {
      const newArr = [...prevState]; // copy of previous state
      for (let i = 0; i < prevState.length; i++) {
        // if the dice is not selected a new value will be randomly assigned
        if (!prevState[i].selected) {
          newArr[i] = {
            ...prevState[i],
            value: random(),
          };
        }
      }
      return newArr; // returning updated state
    });
  }

  // here currently selected dice are checked
  // if  2 dice of different value are currenlty selected the roll button will be disabled
  useEffect(() => {
    let prevSelectedVal = null;
    for (let i = 0; i < dice.length; i++) {
      if (dice[i].selected) {
        if (prevSelectedVal == null) {
          prevSelectedVal = dice[i].value;
        } else {
          if (prevSelectedVal != dice[i].value) {
            setBntDisabled(true); // disalbing button as at least 2 dice of different number are selected
            return;
          }
        }
      }
    }
    setBntDisabled(false); // enabling the button
  }, [dice]);

  // creating array of dice elements from random values, to be rendered
  const elementsArr = dice.map((die, i) => {
    return (
      <Dice
        num={die.value}
        key={i}
        id={i}
        handleClick={toggleSelected}
        selected={die.selected}
      />
    );
  });

  return (
    <>
      <div className="container">
        <div className="canvas">
          <button
            disabled={btnDisabled}
            className="roll-btn"
            onClick={rollDice}
            style={{
              opacity: btnDisabled ? "0.7" : "",
              transform: btnDisabled ? "none" : "",
              cursor: btnDisabled ? "not-allowed" : "",
            }}
          >
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
