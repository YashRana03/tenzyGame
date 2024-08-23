/* eslint-disable react/prop-types */
export default function Dice(props) {
  const styles = {
    // if selected change color to red otherwise leave as is
    backgroundColor: props.selected ? "#c73724" : "",
  };
  return (
    <>
      <div
        className="dice"
        id={props.id}
        onClick={props.handleClick}
        style={styles}
      >
        {props.num}
      </div>
    </>
  );
}
