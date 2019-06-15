import React from 'react';

function Groups() {
  const numberOfGroups = 5;
  const createGroupList = () => {};
  return (
    <ul className='level-list'>
      {Array.from(new Array(numberOfGroups)).map((_, index) => {
        return <li>Group {index + 1}</li>;
      })}
    </ul>
  );
}

export default Groups;
