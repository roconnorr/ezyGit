import React from 'react';
import GitGraph, { IGitGraphProps } from '../components/GitGraph/GitGraph';
import gitdata from './storydata/gitdata.json';

export default {
  title: 'Git Graph',
};

const gitGraphProps: IGitGraphProps = {
  gitJson: gitdata,
};

export const thisRepo = () => <GitGraph {...gitGraphProps} />;
