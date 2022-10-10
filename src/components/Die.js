import React from "react";

export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white",
  };

  let result;
  switch (props.value) {
    case 1:
      result = (
        <div className="first-face" style={styles} onClick={props.holdDice}>
          <span className="pip"></span>
        </div>
      );
      break;
    case 2:
      result = (
        <div className="second-face" style={styles} onClick={props.holdDice}>
          <span className="pip"></span>
          <span className="pip"></span>
        </div>
      );
      break;
    case 3:
      result = (
        <div className="third-face" style={styles} onClick={props.holdDice}>
          <span className="pip"></span>
          <span className="pip"></span>
          <span className="pip"></span>
        </div>
      );
      break;
    case 4:
      result = (
        <div className="fourth-face" style={styles} onClick={props.holdDice}>
          <div className="column">
            <span className="pip"></span>
            <span className="pip"></span>
          </div>
          <div className="column">
            <span className="pip"></span>
            <span className="pip"></span>
          </div>
        </div>
      );
      break;
    case 5:
      result = (
        <div className="fifth-face" style={styles} onClick={props.holdDice}>
          <div className="column">
            <span className="pip"></span>
            <span className="pip"></span>
          </div>
          <div className="column">
            <span className="pip"></span>
          </div>
          <div className="column">
            <span className="pip"></span>
            <span className="pip"></span>
          </div>
        </div>
      );
      break;
    case 6:
      result = (
        <div className="sixth-face" style={styles} onClick={props.holdDice}>
          <div className="column">
            <span className="pip"></span>
            <span className="pip"></span>
            <span className="pip"></span>
          </div>
          <div className="column">
            <span className="pip"></span>
            <span className="pip"></span>
            <span className="pip"></span>
          </div>
        </div>
      );
      break;
    default:
      break;
  }
  return result;
}
