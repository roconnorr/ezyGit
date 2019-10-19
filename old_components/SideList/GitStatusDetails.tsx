import React from 'react';

const GitStatusDetails = (
  onClickCallback: (oid: string, parent: string) => void
) => {
  return (
    <div onClick={() => onClickCallback('', '')}>
      File changes are going to show here
      <div style={{ fontStyle: 'italic' }}>Commit Changes</div>
    </div>
  );
};

export { GitStatusDetails };
