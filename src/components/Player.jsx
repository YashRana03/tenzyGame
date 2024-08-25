/* eslint-disable react/prop-types */
import Dice from "./Dice";

export default function Player(props) {
  // selects/unselects dice on click
  function toggleSelected(event) {
    props.setDice((prevState) => {
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

  // creating array of dice elements from dice state array
  const elementsArr = props.dice.map((die, i) => {
    return (
      <Dice
        num={die.value}
        key={i}
        id={i}
        handleClick={toggleSelected}
        selected={die.selected}
        disableDice={props.disableDice}
      />
    );
  });
  return (
    <>
      <div className="grid-container">
        <div className="dice-grid">{elementsArr}</div>
      </div>
    </>
  );
}
