import React from "react";
import { VariableSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { CustomScrollbarsVirtualList } from "./ScrollBar";

// These row heights are arbitrary.
// Yours should be based on the content of the row.
const rowHeights = new Array(1000)
  .fill(true)
  .map(() => 25 + Math.round(Math.random() * 50));

const getItemSize = (index: any) => rowHeights[index];

const Row = ({ index, style }: any): any => (
  <div className={index % 2 ? "ListItemOdd" : "ListItemEven"} style={style}>
    {" "}
    Row {index}
  </div>
);

const Example = () => (
  <AutoSizer>
    {({ height, width }: any) => (
      <List
        width={width}
        height={height}
        itemCount={1000}
        itemSize={getItemSize}
        outerElementType={CustomScrollbarsVirtualList}
      >
        {Row}
      </List>
    )}
  </AutoSizer>
);

export { Example };
