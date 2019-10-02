import * as git from 'isomorphic-git';
import { CommitDescriptionWithOid } from 'isomorphic-git';
import { startWatcher, addListener } from './watcher';

const fs = require('fs');
const workingDir = './';

git.plugins.set('fs', fs);

export interface FileStatusChanges {
  path: string;
  type: string;
  original: string;
  modified: string;
  hashA: string;
  hashB: string;
}

const getGitLog = async (): Promise<Array<CommitDescriptionWithOid>> => {
  return await git.log({ dir: workingDir, depth: 1000 });
};

const getCurrentBranch = async (): Promise<string | undefined> => {
  return await git.currentBranch({
    dir: workingDir,
    fullname: true,
  });
};

interface fileDiff {
  fullpath: string;
  A: string;
  B: string;
}

export interface fileChanges {
  originalState: string;
  newState: string;
  fileName: string;
  type: string;
}

async function readFile(
  oid: string,
  encoding: string = 'utf8'
): Promise<string> {
  const { object: blob } = await git.readObject({
    dir: workingDir,
    oid,
    encoding,
  });

  return blob.toString();
}

async function getChanges(
  fileStatusChanges: Array<FileStatusChanges>
): Promise<any> {
  const files = fileStatusChanges.map(async (diff: any) => {
    if (diff.hashA !== undefined) {
      diff.original = await readFile(diff.hashA);
    }

    if (diff.hashB !== undefined) {
      diff.modified = await readFile(diff.hashB);
    }
    return diff;
  });

  return await Promise.all(files);
}

async function onFileChange(callback: any) {
  addListener(callback);
}

async function getGitStatus(): Promise<any> {
  let status = await git.statusMatrix({ dir: workingDir, pattern: '**' });

  const FILE = 0,
    HEAD = 1,
    WORKDIR = 2,
    STAGE = 3;

  const deleted = await status
    .filter(row => row[WORKDIR] === 0)
    .map(row => row[FILE]);

  const unstaged = await status
    .filter(row => row[WORKDIR] !== row[STAGE])
    .map(row => row[FILE]);

  const modified = await status
    .filter(row => row[HEAD] !== row[WORKDIR])
    .map(row => row[FILE]);

  startWatcher();

  return unstaged;
}

async function getModifiedFiles(): Promise<any> {
  const filesEdited = await getGitStatus();

  return filesEdited;
}

// async function addAllUntrackedFiles(): Promise<any> {
//   const globby = require('globby');
//   const paths = await globby([workingDir + '**', workingDir + '**/.*'], {
//     gitignore: true,
//   });
//   for (const filepath of paths) {
//     await git.add({ fs, dir: workingDir, filepath });
//   }
// }

// Needs safety checks added.
// Defaults to getting the previous 2 commits.
async function getCommitHashes(
  depth: number = 2
): Promise<{ targetHash: string; previousHash: string }> {
  const commits = await git.log({ dir: workingDir, depth });
  const oids = commits.map(commit => commit.oid);

  return {
    targetHash: oids[depth],
    previousHash: oids[oids.length - 1],
  };
}

// Im happy with this will remove the other function and move it to be
// the same as this.
async function getCommitFileDifferences(
  commitHash1: string,
  commitHash2: string,
  onlyShowChanges: boolean = true
): Promise<FileStatusChanges[]> {
  const results: FileStatusChanges[] | undefined = await git.walkBeta1({
    trees: [
      git.TREE({ fs, gitdir: workingDir + '.git', ref: commitHash1 }),
      git.TREE({ fs, gitdir: workingDir + '.git', ref: commitHash2 }),
    ],
    map: async function([A, B]) {
      // ignore directories
      if (A.fullpath === '.') {
        return;
      }
      await A.populateStat();
      if (A.type === 'tree') {
        return;
      }
      await B.populateStat();
      if (B.type === 'tree') {
        return;
      }

      // generate ids
      await A.populateHash();
      await B.populateHash();
      // determine modification type
      let type = 'equal';

      if (A.oid === B.oid && onlyShowChanges) {
        return;
      }

      if (A.oid !== B.oid) {
        type = 'modify';
      }
      if (A.oid === undefined) {
        type = 'add';
      }
      if (B.oid === undefined) {
        type = 'remove';
      }
      if (A.oid === undefined && B.oid === undefined) {
        console.log('Something weird happened:');
        console.log(A);
        console.log(B);
      }

      return {
        path: '/' + A.fullpath,
        type: type,
        original: undefined,
        modified: undefined,
        hashA: A.oid,
        hashB: B.oid,
      };
    },
  });
  return await getChanges(results!);
}

/**
 * Gets the last commit of the file
 *
 * @param files
 */
async function getCurrentCommitChanges(files: [string]): Promise<any> {
  const commits = await git.log({ dir: workingDir });

  const previousFileState = files.map(async filePath => {
    let { object: blob } = await git.readObject({
      dir: workingDir,
      oid: commits[0].oid, // Only interested in the previous commit for now
      filepath: filePath,
    });

    const currentContents = fs.readFileSync(filePath, 'utf8');

    return {
      lastCommit: blob.toString(),
      currentContents,
    };
  });

  const done = await Promise.all(previousFileState);
  console.log(done);
}

async function findAllCommitsContainingfile() {
  let commits = await git.log({ dir: '.' });
  let lastSHA = null;
  let lastCommit = null;
  let commitsThatMatter = [];

  for (let i = 0; i < commits.length; i += 1) {
    let commit = commits[i];
    try {
      let o = await git.readObject({
        dir: workingDir,
        oid: commit.oid,
        filepath: 'PathToFileGoesHere',
      });
      if (i === commits.length - 1) {
        // file already existed in first commit
        commitsThatMatter.push(commit);
        break;
      }
      if (o.oid !== lastSHA) {
        if (lastSHA !== null) {
          commitsThatMatter.push(lastCommit);
        }
        lastSHA = o.oid;
      }
    } catch (err) {
      // file no longer there
      commitsThatMatter.push(lastCommit);
      break;
    }
    lastCommit = commit;
  }
  console.log(commitsThatMatter);
}

export {
  getGitLog,
  getCurrentBranch,
  getCommitFileDifferences,
  getModifiedFiles,
  onFileChange,
  getCurrentCommitChanges,
  getCommitHashes,
};
