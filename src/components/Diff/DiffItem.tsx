import React from "react";
import { fileChanges } from "../../git/git";
import { DiffViewer } from "../Editor/DiffViewer";

interface IHistoryItem {
  data: Array<fileChanges>;
  index: number;
  style: any;
}

const DiffItem = ({ data, index, style }: IHistoryItem): any => {
  const item = data[index];
  return <div>{DiffViewer(item.newState, item.originalState)}</div>;
};

export { DiffItem };
