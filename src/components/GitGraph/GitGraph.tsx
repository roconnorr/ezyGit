import React, { useState, ReactElement } from 'react';
import { Gitgraph } from '@gitgraph/react';
import { GitgraphCore } from '@gitgraph/core';

export interface IGitGraphProps {
  gitJSON: object;
}

class GitGraph extends React.Component<IGitGraphProps, {}> {
  createGraph = (): ReactElement => {
    const graph = new GitgraphCore<React.ReactElement<SVGElement>>();

    const gitgraph = graph.getUserApi();
    gitgraph.import(this.props.gitJSON);
    // graph doesn't rerender on props change though
    return <Gitgraph graph={graph} />;
  };

  render() {
    return this.createGraph();
  }
}

export default GitGraph;
