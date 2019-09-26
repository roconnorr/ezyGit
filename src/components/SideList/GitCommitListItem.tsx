import React from "react";
import { CommitDescriptionWithOid } from "isomorphic-git";

const GitCommitListItem = (
  index: number,
  key: number | string,
  commit: CommitDescriptionWithOid,
  onClickCallback: any
): any => {
  const author = commit.author;
  const date = new Date(author.timestamp * 1000 + author.timezoneOffset * 1000);
  return (
    <div
      key={key}
      className={index % 2 ? "historyItemEven" : "historyItemOdd"}
      onClick={() => onClickCallback(commit.oid)}
    >
      <div className="historyItemContent">{commit.message}</div>
      <div className="historyItemContent">
        <span style={{ width: "50%", display: "inline-block" }}>
          {date.toLocaleDateString("en-UK")}
        </span>
        <span
          style={{
            textAlign: "right",
            width: "50%",
            display: "inline-block"
          }}
        >
          {author.name}
        </span>
      </div>
    </div>
  );
};

export { GitCommitListItem };
