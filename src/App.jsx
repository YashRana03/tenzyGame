import "./App.css";
import { useState, useEffect } from "react";
import Dice from "./components/Dice";

function App() {
  // dice state (includes dice value and if dice is selected or not)
  const [dice, setDice] = useState(reinitialiseDice());

  // button state (enabled/disabled)
  const [btnDisabled, setBntDisabled] = useState(false);
  const [gameOver, setGameOver] = useState(true);

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

  // generates object arrray made of random numbers for the state of dice
  function reinitialiseDice() {
    const newArr = tenRandomValues().map((val) => {
      return {
        value: val,
        selected: false,
      };
    });
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

  // restarts new game
  function resetGame() {
    setGameOver(false);
    setDice(reinitialiseDice());
  }

  // here currently selected dice are checked to:
  // 1) if  2 dice of different value are currenlty selected the roll button will be disabled
  // 2) determine if game is over if all 10 are selected
  useEffect(() => {
    let prevSelectedVal = null;
    let numSelected = 0;
    for (let i = 0; i < dice.length; i++) {
      if (dice[i].selected) {
        numSelected += 1;
        if (prevSelectedVal == null) {
          prevSelectedVal = dice[i].value;
        } else {
          if (prevSelectedVal != dice[i].value) {
            if (!gameOver) {
              setBntDisabled(true); // disalbing button as at least 2 dice of different number are selected
            }
            return;
          }
        }
      }
    }
    // here the numbers of selected dices is checked if 10 it means the game is over
    if (numSelected == dice.length) {
      setGameOver(true);
    }
    setBntDisabled(false); // enabling the button
  }, [dice, gameOver]);

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
          {gameOver ? (
            <h3 className="gameOver-msg ">CONGRATS! YOU WON!!</h3>
          ) : null}

          <div className="btn-container">
            <button
              disabled={btnDisabled}
              className="roll-btn"
              onClick={gameOver ? resetGame : rollDice}
              style={{
                opacity: btnDisabled ? "0.7" : "",
                transform: btnDisabled ? "none" : "",
                cursor: btnDisabled ? "not-allowed" : "",
                width: gameOver ? "100px" : "",
              }}
            >
              {gameOver ? "Play Again" : "Roll"}
            </button>
          </div>

          <div className="grid-container">
            <div className="dice-grid">{elementsArr}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
