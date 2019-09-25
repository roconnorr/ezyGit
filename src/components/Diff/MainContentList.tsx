import React from "react";
import { VariableSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { CustomScrollbarsVirtualList } from "../SideList/ScrollBar";
import { fileChanges } from "../../git/git";
import { DiffItem } from "./DiffItem";

interface IMainContentList {
  data: Array<fileChanges>;
}

const MainContentList = (data: IMainContentList) => {
  return (
    <AutoSizer>
      {({ height, width }: any) => (
        <List
          width={width}
          height={height}
          itemCount={data.data.length}
          itemSize={index => 80}
          outerElementType={CustomScrollbarsVirtualList}
          itemData={data.data}
        >
          {DiffItem}
        </List>
      )}
    </AutoSizer>
  );
};

export { MainContentList };
