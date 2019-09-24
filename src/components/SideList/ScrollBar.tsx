import React, { useCallback } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { Colors } from "@blueprintjs/core";

const renderThumb = ({ style, ...props }: any) => (
  <div
    {...props}
    style={{
      ...style,
      backgroundColor: Colors.WHITE,
      width: "4px",
      opacity: "0.5"
    }}
  />
);

const CustomScrollbars = ({ onScroll, forwardedRef, style, children }: any) => {
  const refSetter = useCallback(scrollbarsRef => {
    if (scrollbarsRef) {
      forwardedRef(scrollbarsRef.view);
    } else {
      forwardedRef(null);
    }
  }, []);

  return (
    <Scrollbars
      ref={refSetter}
      style={{ ...style, overflow: "hidden" }}
      onScroll={onScroll}
      renderThumbVertical={renderThumb}
    >
      {children}
    </Scrollbars>
  );
};

const CustomScrollbarsVirtualList = React.forwardRef((props, ref) => (
  <CustomScrollbars {...props} forwardedRef={ref} />
));

export { CustomScrollbarsVirtualList };
