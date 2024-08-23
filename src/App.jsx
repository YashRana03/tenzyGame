import "./App.css";
import { useState, useEffect } from "react";
import Dice from "./components/Dice";

function App() {
  let valuesArr = [1, 3, 5, 2, 6, 2, 1, 4, 4, 3]; // 10 random numbers from 1 to 6
  const [selected, setSelected] = useState(new Array(10).fill(false));

  // selects/unselects dice on click
  function toggleSelected(event) {
    setSelected((prevState) => {
      const newArr = [...prevState];
      newArr[event.target.id] = !newArr[event.target.id];
      return newArr;
    });
  }

  // creating  array of dice elements to be rendered from random values
  const elementsArr = valuesArr.map((val1, i) => {
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
          <div className="grid-container">
            <div className="dice-grid">{elementsArr}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
