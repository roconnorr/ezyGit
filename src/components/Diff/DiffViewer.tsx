import React from 'react';
import ReactDiffViewer from 'react-diff-viewer';

const defaultStyles = {
  variables: {
    diffViewerBackground: '#282c34',
    addedBackground: '#e6ffed',
    addedColor: '#24292e',
    removedBackground: '#f2dede',
    removedColor: '#b94a48',
    wordAddedBackground: '#acf2bd',
    wordRemovedBackground: '#fdb8c0',
    addedGutterBackground: '#cdffd8',
    removedGutterBackground: '#f2dede',
    gutterBackground: '#282c34',
    gutterBackgroundDark: '#282c34',
    highlightBackground: '#fffbdd',
    highlightGutterBackground: '#fff5b1',
    codeFoldGutterBackground: '#282c34',
    codeFoldBackground: '#282c34',
    emptyLineBackground: '#282c34',
  },
  //   diffContainer: {}, //style object
  //   diffRemoved: {}, //style object
  //   diffAdded: {}, //style object
  //   marker: {}, //style object
  //   highlightedLine: {}, //style object
  //   highlightedGutter: {}, //style object
  //   gutter: { emptyLineBackground: "#282c34" }, //style object
  //   line: {}, //style object
  //   wordDiff: {}, //style object
  //   wordAdded: {}, //style object
  //   wordRemoved: {}, //style object
  //   codeFoldGutter: {}, //style object
  //   emptyLine: {}, //style object
  //   emptyGutter: { emptyLineBackground: "#282c34" } //style object
};

const DiffViewer = (oldValue: any, newValue: any) => {
  return (
    <ReactDiffViewer
      oldValue={oldValue}
      newValue={newValue}
      splitView={false}
      extraLinesSurroundingDiff={1}
      styles={defaultStyles}
    />
  );
};
export { DiffViewer };
