import * as git from 'isomorphic-git';
import { CommitDescriptionWithOid } from 'isomorphic-git';
import * as Watcher from './watcher';
import * as log from '../tools/logger';

const fs = require('fs');
git.plugins.set('fs', fs);

const MODULE_NAME = 'Git';
log.registerModule(MODULE_NAME, log.Level.WARNING);

export enum GitStats {
  IGNORED = 1, //file ignored by a .gitignore rule

  UNSTAGED_UNMODIFIED = 2, //working dir and HEAD commit match, but index differs
  UNMODIFIED = 4, //file unchanged from HEAD commit

  UNSTAGED_MODIFIED = 8, //file has modifications, not yet staged
  MODIFIED = 16, //file has modifications, staged

  UNSTAGED_DELETED = 32, //file has been removed, but the removal is not yet staged
  DELETED = 64, //file has been removed, staged

  UNSTAGED_ADDED = 128, //file is untracked, not yet staged
  ADDED = 256, //previously untracked file, staged

  UNSTAGED_ABSENT = 512, //file not present in working dir or HEAD commit, but present in the index
  ABSENT = 1024, //file not present in HEAD commit, staging area, or working dir

  ALL = 2048,
  UNSTAGED = UNSTAGED_UNMODIFIED |
    UNSTAGED_MODIFIED |
    UNSTAGED_DELETED |
    UNSTAGED_ADDED,
}
export interface FileStatusChanges {
  path: string;
  type: string;
  original: string;
  modified: string;
  hashA: string;
  hashB: string;
}
export interface FileChanges {
  originalState: string;
  newState: string;
  fileName: string;
  type: string;
}
export interface StagedTypes {
  unmodified?: Array<object>; //change this..
  modified?: Array<object>;
  deleted?: Array<object>;
  added?: Array<object>;
}
export interface GitFileStatus {
  staged?: StagedTypes;
  unstaged?: StagedTypes;
  ignored?: Array<object>;
}
export interface GitCommitLog {
  isHistory: boolean;
  commit?: CommitDescriptionWithOid;
}

//#region Events
function onWatcherEvent(event: string, path: string) {
  log.debug(MODULE_NAME, event + ' : ' + path);
}
//#endregion

//#region  Methods

/**
 * Gets the current branch of the repository
 */
async function getCurrentBranch(gitDir: string): Promise<string | undefined> {
  //Check if current branch is set, if not load it
  // if (!this.currentBranch) {
  return await git.currentBranch({
    dir: gitDir,
    fullname: true,
  });
  // }
}

/**
 * Fetch commits from logged or repository
 * @param size Amount to fetch
 * @param timestamp Commits since time
 */
async function getGitLog(
  gitDir: string,
  size: number = 20,
  timestamp: number = -1
): Promise<Array<GitCommitLog>> {
  let options = { dir: gitDir, depth: size };

  if (timestamp > -1) {
    Object.assign(options, { since: timestamp });
  }
  let requestedLog = await git.log(options);

  const modifiedLog: Array<GitCommitLog> = requestedLog.map(commitHistory => {
    return {
      isHistory: true,
      commit: commitHistory,
    };
  });

  // Insert blank commit at the start
  modifiedLog.unshift({ isHistory: false });
  return modifiedLog;
}

/**
 * Super heavy function to get the status of the whole git.
 * @param flags Customizable flags for filtering returned info
 */
async function getGitStatus(
  gitDir: string,
  flags: GitStats = GitStats.ALL
): Promise<GitFileStatus> {
  const time = Date.now();
  log.debug(MODULE_NAME, 'Started GitStatus');
  let status = await git.statusMatrix({ dir: gitDir, pattern: '**' });
  log.debug(MODULE_NAME, 'Done GitStatus : ' + (Date.now() - time) + 's');

  let fileStatus: GitFileStatus = {};

  const HEAD = 1,
    WORKDIR = 2,
    STAGE = 3;

  if (
    flags & GitStats.UNSTAGED_UNMODIFIED ||
    GitStats.UNSTAGED_MODIFIED ||
    GitStats.UNSTAGED_DELETED ||
    GitStats.UNSTAGED_ABSENT ||
    GitStats.UNSTAGED_ADDED
  ) {
    fileStatus.unstaged = {};

    if (flags & GitStats.UNSTAGED_DELETED) {
      //file has been removed, but the removal is not yet staged
      fileStatus.unstaged.deleted = await status.filter(
        row => row[HEAD] === 1 && row[WORKDIR] === 0 && row[STAGE] === 1
      );
    }

    //file is untracked, not yet staged
    if (flags & GitStats.UNSTAGED_ADDED) {
      fileStatus.unstaged.added = await status.filter(
        row => row[HEAD] === 0 && row[WORKDIR] === 2 && row[STAGE] === 0
      );
    }

    //file has modifications, not yet staged
    if (flags & GitStats.UNSTAGED_MODIFIED) {
      fileStatus.unstaged.modified = await status.filter(
        row =>
          row[HEAD] === 1 &&
          row[WORKDIR] === 2 &&
          (row[STAGE] === 1 || row[STAGE] === 3)
      );
    }
  }

  if (
    flags & GitStats.UNMODIFIED ||
    GitStats.MODIFIED ||
    GitStats.DELETED ||
    GitStats.ABSENT ||
    GitStats.UNSTAGED_ADDED
  ) {
    fileStatus.staged = {};

    if (flags & GitStats.DELETED) {
      //file has been removed, but the removal is not yet staged
      fileStatus.staged.deleted = await status.filter(
        row => row[HEAD] === 1 && row[WORKDIR] === 0 && row[STAGE] === 0
      );
    }

    //file is untracked, not yet staged
    if (flags & GitStats.ADDED) {
      fileStatus.staged.added = await status.filter(
        row => row[HEAD] === 0 && row[WORKDIR] === 2 && row[STAGE] === 2
      );
    }

    //file has modifications, not yet staged
    if (flags & GitStats.MODIFIED) {
      fileStatus.staged.modified = await status.filter(
        row => row[HEAD] === 1 && row[WORKDIR] === 2 && row[STAGE] === 2
      );
    }

    //file unchanged from HEAD commit
    if (flags & GitStats.UNMODIFIED) {
      fileStatus.staged.unmodified = await status.filter(
        row => row[HEAD] === 1 && row[WORKDIR] === 1 && row[STAGE] === 1
      );
    }
  }

  log.debug(MODULE_NAME, 'Filtering done : ' + (Date.now() - time) + 's');
  return fileStatus;
}

/**
 * Returns depth as target hash and other in previous
 * @param depth Defaults to getting the previous 2 commits.
 */
async function getCommitHashes(
  gitDir: string,
  depth: number = 2
): Promise<{ targetHash: string; previousHash: string }> {
  const commits = await git.log({ dir: gitDir, depth });
  const oids = commits.map(commit => commit.oid);

  return {
    targetHash: oids[depth],
    previousHash: oids[oids.length - 1],
  };
}

async function getCurrentCommitChanges(
  gitDir: string,
  files: [string]
): Promise<any> {
  const commits = await git.log({ dir: gitDir });

  const previousFileState = files.map(async filePath => {
    try {
      let { object: blob } = await git.readObject({
        dir: gitDir,
        oid: commits[0].oid, // Only interested in the previous commit for now
        filepath: filePath,
      });

      const currentContents = fs.readFileSync(filePath, 'utf8');

      return {
        lastCommit: blob.toString(),
        currentContents,
      };
    } catch (error) {
      log.error(MODULE_NAME, 'New File');
    }

    return '';
  });

  log.debug(MODULE_NAME, 'Changes: ', await Promise.all(previousFileState));
}

async function startFileWatcher(dir: string): Promise<any> {
  return await fetchIgnoreFile(dir)
    .then((file: string[]) => {
      if (file) {
        log.debug(MODULE_NAME, 'Ignore File: ' + file);
        file.map(line => Watcher.addToWatchIgnore(line));
        log.debug(MODULE_NAME, 'Ignore List: ', Watcher.ignoreList);
      }
    })
    .finally(() => {
      Watcher.addToWatchList(dir);
      Watcher.addEventListener(Watcher.FileWatcherEvent.ALL, onWatcherEvent);
      return Watcher;
    });
}

//Fetches the ignore file as array
async function fetchIgnoreFile(dir: string): Promise<string[]> {
  return new Promise<string[]>(resolve => {
    fs.readFile(dir + '/.gitignore', (err: string, data: any) => {
      //Bail out if file is not found. Can't see any reason for this to be so
      if (err) {
        throw log.error(MODULE_NAME, err);
      }
      let lines = data.toString().split('\n');

      lines = lines.filter((currentLine: string) => {
        if (currentLine.startsWith('#') || !currentLine.trim()) {
          return false;
        }
        return true;
      });

      lines.push('.git'); //dont need to follow git stuff

      resolve(lines);
    });
  });
}

//#region Rewrite all of these (Maybe)
// Im happy with this will remove the other function and move it to be
// the same as this.
async function getCommitFileDifferences(
  dir: string,
  commitHash1: string,
  commitHash2: string,
  onlyShowChanges: boolean = true
): Promise<FileStatusChanges[]> {
  const results: FileStatusChanges[] | undefined = await git.walkBeta1({
    trees: [
      git.TREE({ fs, gitdir: dir + '.git', ref: commitHash1 }),
      git.TREE({ fs, gitdir: dir + '.git', ref: commitHash2 }),
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

async function getChanges(
  fileStatusChanges: Array<FileStatusChanges>
): Promise<any> {
  const files = fileStatusChanges.map(async (diff: any) => {
    if (diff.hashA !== undefined) {
      diff.original = await readFile(diff.hashA);
    } else {
      diff.original = '';
    }

    if (diff.hashB !== undefined) {
      diff.modified = await readFile(diff.hashB);
    } else {
      diff.modified = '';
    }
    return diff;
  });

  return await Promise.all(files);
}

async function readFile(
  oid: string,
  encoding: string = 'utf8'
): Promise<string> {
  const { object: blob } = await git.readObject({
    dir: './',
    oid,
    encoding,
  });

  return blob.toString();
}

//#endregion
//#endregion

export {
  getCommitHashes,
  getCurrentCommitChanges,
  getCommitFileDifferences,
  getGitStatus,
  getGitLog,
  getCurrentBranch,
  startFileWatcher,
};
