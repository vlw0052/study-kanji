import React from 'react';
import PropTypes from 'prop-types';

function Level(props) {
  return (
    <div title={`${props.title}`} onClick={props.onClick} onMouseDown={props.onMouseDown} className='level'>
      {props.children}
    </div>
  );
}

Level.propTypes = {
  onClick: PropTypes.func,
  onMouseDown: PropTypes.func,
  label: PropTypes.string
};
export default Level;
