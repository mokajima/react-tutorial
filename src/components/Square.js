import React from 'react';

function Square(props) {
  const { isHighlighted } = props

  return (
    <button
      className="square"
      onClick={props.onClick}
      style={{ background: isHighlighted ? 'yellow' : 'none' }}
    >
      {props.value}
    </button>
  );
}

export default Square;
