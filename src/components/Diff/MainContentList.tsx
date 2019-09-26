import React from "react";
import { fileChanges } from "../../git/git";
import {
  CellMeasurer,
  CellMeasurerCache,
  List,
  ListRowProps,
  AutoSizer
} from "react-virtualized";
import { DiffViewer } from "../Editor/DiffViewer";
import { CustomScrollbarsVirtualList } from "../SideList/ScrollBar";
import Scrollbars from "react-custom-scrollbars";
interface IMainContentList {
  data: Array<fileChanges>;
}

class MainContentList extends React.Component<IMainContentList, {}> {
  private cache: CellMeasurerCache;

  constructor(props: IMainContentList) {
    super(props);
    this.cache = new CellMeasurerCache({
      fixedWidth: false,
      defaultHeight: 100
    });
  }

  handleScroll = ({ target }: any) => {
    const { scrollTop, scrollLeft } = target;

    // const { Grid: grid } = this.List;

    // grid.handleScrollEvent({ scrollTop, scrollLeft });
  };

  itemRenderer(props: ListRowProps) {
    //console.log(props);
    return (
      <CellMeasurer
        key={props.key}
        cache={this.cache}
        parent={props.parent}
        columnIndex={0}
        rowIndex={props.index}
      >
        <div style={props.style}>
          {DiffViewer(
            this.props.data[props.index].newState,
            this.props.data[props.index].originalState
          )}
        </div>
      </CellMeasurer>
    );
  }

  render() {
    const { data } = this.props;

    return (
      <AutoSizer>
        {({ height, width }: any) => (
          <List
            rowRenderer={this.itemRenderer.bind(this)}
            width={width}
            height={height}
            deferredMeasurementCache={this.cache}
            rowHeight={this.cache.rowHeight}
            rowCount={data.length}
            // overscanRowCount={4}
          />
        )}
      </AutoSizer>
    );
  }
}

export { MainContentList };
