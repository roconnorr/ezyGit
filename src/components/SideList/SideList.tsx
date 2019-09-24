import React from "react";
import { VariableSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { CustomScrollbarsVirtualList } from "./ScrollBar";
import { HistoryItem } from "./HistoryItem";
import { CommitDescriptionWithOid } from "isomorphic-git";

interface ISideListProps {
  data: Array<CommitDescriptionWithOid>;
}

const SideList = (props: ISideListProps) => {
  const { data } = props;
  return (
    <AutoSizer>
      {({ height, width }: any) => (
        <List
          width={width}
          height={height}
          itemCount={data.length}
          itemSize={index => 80}
          outerElementType={CustomScrollbarsVirtualList}
          itemData={data}
        >
          {HistoryItem}
        </List>
      )}
    </AutoSizer>
  );
};

export { SideList };
