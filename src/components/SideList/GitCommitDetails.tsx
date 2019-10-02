import React from 'react';
import { CommitDescriptionWithOid } from 'isomorphic-git';

const GitCommitDetails = (temp: CommitDescriptionWithOid, callBack: any) => {
  const commit = temp;
  const author = commit.author;
  const date = new Date(author.timestamp * 1000 + author.timezoneOffset * 1000);

  return (
    <div onClick={() => callBack(commit.oid)}>
      <div className="historyItemContent">{commit.message}</div>
      <div className="historyItemContent">
        <span style={{ width: '50%', display: 'inline-block' }}>
          {date.toLocaleDateString('en-UK')}
        </span>
        <span
          style={{
            textAlign: 'right',
            width: '50%',
            display: 'inline-block',
          }}
        >
          {author.name}
        </span>
      </div>
    </div>
  );
};

export { GitCommitDetails };
