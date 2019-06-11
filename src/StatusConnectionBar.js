import React from 'react';
import cx from 'classnames';

const StatusConnectionBar = props => {
  return <div className={cx('status-bar', { connected: props.status, disconnected: !props.status })} />;
};

export default StatusConnectionBar;
