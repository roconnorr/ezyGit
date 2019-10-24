import * as React from 'react';
import { Gitgraph } from '@gitgraph/react';

export interface IGitGraphProps {
  gitJSON: object;
}

const GitGraph: React.FunctionComponent<IGitGraphProps> = props => {
  return (
    <Gitgraph>
      {gitgraph => {
        gitgraph.import(props.gitJSON);
      }}
    </Gitgraph>
  );
};

export default GitGraph;
