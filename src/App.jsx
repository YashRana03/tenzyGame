import "./App.css";
import { useState, useEffect } from "react";
import Player from "./components/Player";

function App() {
  // dice state (includes dice value and if dice is selected or not)
  const [dicePlr1, setDicePlr1] = useState(reinitialiseDice()); // for player 1
  const [dicePlr2, setDicePlr2] = useState(reinitialiseDice()); // for player 2

  const [turn, setTurn] = useState(1); // turn state keeps track of which player is currently playing
  const [score, setScore] = useState([0, 0]); // score state to store the score

  const [btnDisabled, setBntDisabled] = useState(false); // button state (enabled/disabled)
  const [gameOver, setGameOver] = useState(false); // used to to tell if game has ended

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

  // Rolls the dice, making sure that selected dice do not change in value
  function rollDice(setDicePlr) {
    setDicePlr((prevState) => {
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
      setTurn(turn == 1 ? 2 : 1); // after rolling the dice the turn state is switched around
      return newArr; // returning updated state
    });
  }

  // restarts new game
  function resetGame() {
    setGameOver(false); // game is turned back on
    setDicePlr1(reinitialiseDice());
    setDicePlr2(reinitialiseDice()); // reinitialising the both dice sets
    setTurn(1); // turn given back to player 1 to start new game
    setScore([0, 0]); // clearing score
  }

  // here currently selected dice are checked to:
  // 1) if  2 dice of different value are currenlty selected the roll button will be disabled
  // 2) determine if game is over if all 10 are selected
  // 3) check the number of selected dice and update score accordingly
  useEffect(() => {
    let prevSelectedVal = null;
    let numSelected = 0;
    let dice = turn == 1 ? dicePlr1 : dicePlr2;
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
    // score of the current player is updated
    setScore((prevState) => {
      const newArr = [...prevState];
      if (turn == 1) {
        newArr[0] = numSelected;
      } else {
        newArr[1] = numSelected;
      }

      return newArr;
    });
    // here the numbers of selected dices is checked if 10 it means the game is over
    if (numSelected == dice.length) {
      setGameOver(true);
    }
    setBntDisabled(false); // enabling the button
  }, [dicePlr1, dicePlr2]);

  return (
    <>
      <div className="container">
        <div className="canvas">
          {gameOver ? (
            <h3 className="gameOver-msg ">
              {/* conditional rendering appopriate message */}
              CONGRATS, {turn == 1 ? "WHITE" : "BLACK"} WON!!
            </h3>
          ) : null}
          <div className="btn-container">
            <button
              disabled={btnDisabled}
              className="roll-btn"
              onClick={
                // passing as handler function resetGame or rollDice depending on gameOver state
                gameOver
                  ? resetGame
                  : turn == 1
                  ? () => rollDice(setDicePlr1)
                  : () => rollDice(setDicePlr2)
              }
              style={{
                //conditional styling
                opacity: btnDisabled ? "0.7" : "",
                transform: btnDisabled ? "none" : "",
                cursor: btnDisabled ? "not-allowed" : "",
                width: gameOver ? "100px" : "",
              }}
            >
              {/* conditional rendering appopriate message */}
              {gameOver ? "Play Again" : "Roll"}
            </button>
          </div>

          {/* small pawn in corner to convey whose turn it is */}
          <i
            className="fa-solid fa-chess-pawn turn-pawn"
            style={{ color: turn == 1 ? "white" : "black" }}
          ></i>

          {/* rendering the two dice grids */}
          <Player
            setDice={setDicePlr1}
            dice={dicePlr1}
            disableDice={turn == 1 ? false : true}
          />
          <Player
            setDice={setDicePlr2}
            dice={dicePlr2}
            disableDice={turn == 2 ? false : true}
          />
          {/* Rendering the two pawns, black and white */}
          <i className="fa-solid fa-chess-pawn pawn pawn-white"></i>
          <i className="fa-solid fa-chess-pawn pawn pawn-black"></i>

          {/* Rendering the score boxes */}
          <div className="score-box score-white">{score[0]}</div>
          <div className="score-box score-black">{score[1]}</div>
        </div>
      </div>
    </>
  );
}

export default App;
