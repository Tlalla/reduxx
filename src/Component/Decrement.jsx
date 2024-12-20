import React from 'react';

const Decrement = ({ onClick, disabled }) => {
  return <button onClick={onClick} disabled={disabled}>-</button>;
};

export default Decrement;
