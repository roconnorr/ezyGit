import { diffLines, formatLines } from 'unidiff';
import { parseDiff } from 'react-diff-view';

function getGitDifference(originText, changedText) {
  console.log(originText, changedText);
  const diffText = formatLines(diffLines(originText, changedText), {
    context: 3,
  });
  return parseDiff(diffText, { nearbySequences: 'zip' });
}

export { getGitDifference };
