import React from 'react';
import PropTypes from 'prop-types';

function Level(props) {
  return (
    <div title={`${props.title}`} onClick={props.onClick} onMouseDown={props.onMouseDown} className='level'>
      {props.children}
      {props.grade ? <p className={'group-grade'}>{props.grade}%</p> : ''}
    </div>
  );
}

Level.propTypes = {
  onClick: PropTypes.func,
  onMouseDown: PropTypes.func,
  title: PropTypes.string.isRequired,
  isGroup: PropTypes.bool,
  grade: PropTypes.string
};

Level.defaultProps = {
  isGroup: false
};
export default Level;
