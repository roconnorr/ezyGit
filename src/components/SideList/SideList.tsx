import React from "react";
import { HistoryItem } from "./HistoryItem";
import { CommitDescriptionWithOid } from "isomorphic-git";
import Scrollbars from "react-custom-scrollbars";
import ReactList from "react-list";

interface ISideListProps {
  data: Array<CommitDescriptionWithOid>;
}

class SideList extends React.Component<ISideListProps, {}> {
  HistoryItem(index: number, key: number | string) {
    const item = this.props.data[index];
    const author = item.author;
    const date = new Date(
      author.timestamp * 1000 + author.timezoneOffset * 1000
    );
    return (
      <div className={index % 2 ? "historyItemEven" : "historyItemOdd"}>
        <div className="historyItemContent">{item.message}</div>
        <div className="historyItemContent" style={{}}>
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
  }

  render() {
    const { data } = this.props;
    return (
      <Scrollbars style={{ height: "100%", width: "100%" }}>
        <ReactList
          itemRenderer={this.HistoryItem.bind(this)}
          length={data.length}
          type="uniform"
        />
      </Scrollbars>
    );
  }
}

export { SideList };
