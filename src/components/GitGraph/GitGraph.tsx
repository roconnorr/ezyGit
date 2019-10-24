import * as React from 'react';
import { Gitgraph } from '@gitgraph/react';

export interface IGitGraphProps {
  gitJson: object;
}

const GitGraph: React.FunctionComponent<IGitGraphProps> = props => {
  return (
    <Gitgraph>
      {gitgraph => {
        gitgraph.import(props.gitJson);
      }}
    </Gitgraph>
  );
};

export default GitGraph;
