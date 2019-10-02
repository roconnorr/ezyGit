import React from 'react';

const GitStatusDetails = (callBack: any) => {
  return (
    <div onClick={() => callBack(false)}>
      File changes are going to show here
      <div style={{ fontStyle: 'italic' }}>Commit Changes</div>
    </div>
  );
};

export { GitStatusDetails };
