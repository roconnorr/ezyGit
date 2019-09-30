import * as git from 'isomorphic-git';
import { CommitDescriptionWithOid } from 'isomorphic-git';
import * as chokidar from 'chokidar';
import { FileWatcher, FileWatcherEvent } from './watcher';
import { number } from 'prop-types';

const fs = require('fs');

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

  //#endregion
}

export { Git };
