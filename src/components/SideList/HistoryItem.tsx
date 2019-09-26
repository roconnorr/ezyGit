import React from "react";
import { CommitDescriptionWithOid } from "isomorphic-git";

interface IHistoryItem {
  data: Array<CommitDescriptionWithOid>;
  index: number;
  style: any;
}

const HistoryItem = ({ data, index, style }: IHistoryItem): any => {
  console.log(data[0]);
  const item = data[index];
  const author = item.author;
  const date = new Date(author.timestamp * 1000 + author.timezoneOffset * 1000);
  return (
    <div
      className={index % 2 ? "historyItemEven" : "historyItemOdd"}
      style={style}
    >
      <div className="historyItemContent">{item.message}</div>
      <div className="historyItemContent" style={{}}>
        <span style={{ width: "50%", display: "inline-block" }}>
          {date.toLocaleDateString("en-UK")}
        </span>
        <span
          style={{ textAlign: "right", width: "50%", display: "inline-block" }}
        >
          {author.name}
        </span>
      </div>
    </div>
  );
};

export { HistoryItem };
