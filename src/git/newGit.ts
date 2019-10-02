import * as git from 'isomorphic-git';
import { CommitDescriptionWithOid } from 'isomorphic-git';
import * as chokidar from 'chokidar';
import { FileWatcher, FileWatcherEvent } from './watcher';
import { number } from 'prop-types';

const fs = require('fs');

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

class Git {
  //#region Properties
  directory: string;
  ignore: Array<string> = new Array<string>();
  watcher: FileWatcher;

  //Repository Props
  currentBranch: string | undefined;
  logs: Array<CommitDescriptionWithOid> = new Array<CommitDescriptionWithOid>();
  //#endregion

  //#region Setup / Control Methods
  constructor(workingDir: string, fileWatcher: FileWatcher) {
    this.directory = workingDir;
    this.watcher = fileWatcher;

    //Assign the file system module for iso-git (using standard node for now)
    //https://github.com/isomorphic-git/lightning-fs
    git.plugins.set('fs', fs);

    fs.readFile(this.directory + '/.gitignore', this.parseIgnore.bind(this));
  }
  //Handlers for parsing ignore file to asist with watcher
  parseIgnore(err: any, data: string) {
    //Bail out if file is not found. Can't see any reason for this to be so
    if (err) {
      throw console.error(err);
    }

    let lines = data.toString().split('\n');
    console.log('Parsed Ignore');

    this.ignore = lines.filter((currentLine: string) => {
      if (currentLine.startsWith('#') || !currentLine.trim()) {
        return false;
      }
      return true;
    });

    this.setupWatcher();
  }

  setupWatcher() {
    if (!this.watcher)
      throw console.error(
        'File watcher is non existant, Something is slightly wrong here..'
      );

    this.watcher.directory = this.directory;
    this.watcher.options = {
      ignored: this.ignore,
      ignoreInitial: true,
    };

    this.watcher.start();
    this.watcher.addEvent(FileWatcherEvent.ALL, this.onWatcherEvent.bind(this));
    console.log('Watcher started');
  }

  //#endregion

  //#region Events
  onWatcherEvent(event: string, path: string) {
    console.log(event + ' : ' + path);
  }
  //#endregion

  //#region  Methods

  /**
   * Gets the current branch of the repository
   */
  async getCurrentBranch(): Promise<string | undefined> {
    //Check if current branch is set, if not load it
    if (!this.currentBranch) {
      this.currentBranch = await git.currentBranch({
        dir: this.directory,
        fullname: true,
      });
    }

    return this.currentBranch;
  }

  /**
   * Fetch commits from logged or repository
   * @param size Amount to fetch
   * @param timestamp Commits since time
   */
  async getGitLog(
    size: number = 20,
    timestamp: number = -1
  ): Promise<Array<CommitDescriptionWithOid>> {
    let options = { dir: this.directory, depth: size };

    if (timestamp > -1) {
      Object.assign(options, { since: timestamp });
    }
    let requestedLog = await git.log(options);

    return requestedLog;
  }

  async getGitStatus(flags: GitStats = GitStats.ALL): Promise<GitFileStatus> {
    const time = Date.now();
    console.log('Started GitStatus');
    let status = await git.statusMatrix({ dir: this.directory, pattern: '**' });
    console.log('Done GitStatus : ' + (Date.now() - time) + 's');

    let fileStatus: GitFileStatus = {};

    const FILE = 0,
      HEAD = 1,
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

    console.log('Filtering done : ' + (Date.now() - time) + 's');
    return fileStatus;
  }

  async getCurrentCommitChanges(files: [string]): Promise<any> {
    const commits = await git.log({ dir: this.directory });

    const previousFileState = files.map(async filePath => {
      try {
        let { object: blob } = await git.readObject({
          dir: this.directory,
          oid: commits[0].oid, // Only interested in the previous commit for now
          filepath: filePath,
        });

        const currentContents = fs.readFileSync(filePath, 'utf8');

        return {
          lastCommit: blob.toString(),
          currentContents,
        };
      } catch (error) {
        console.log('New File');
      }

      return '';
    });

    const done = await Promise.all(previousFileState);
    console.log(done);
  }

  //#endregion
}

export { Git };
