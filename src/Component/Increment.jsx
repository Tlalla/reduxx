import React from 'react';

const Increment = ({ onClick, disabled }) => {
  return <button onClick={onClick} disabled={disabled}>+</button>;
};

export default Increment;