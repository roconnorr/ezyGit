import * as git from 'isomorphic-git';
import { CommitDescriptionWithOid } from 'isomorphic-git';
import * as chokidar from 'chokidar';

const fs = require('fs');

class Git {
  directory: string;
  ignore: Array<string> = new Array<string>();
  watcher: any;

  constructor(workingDir: string) {
    this.directory = workingDir;
    fs.readFile(this.directory + '/.gitignore', this.parseIgnore.bind(this));
  }

  //Handlers for parsing ignore file to asist with watcher
  parseIgnore(err: any, data: string) {
    //Bail out if file is not found. Can't see any reason for this to be so
    if (err) {
      throw console.error(err);
    }

    let lines = data.toString().split('\n');

    const newSet = lines.filter((currentLine: string) => {
      if (currentLine.startsWith('#') || !currentLine.trim()) {
        return false;
      }
      return true;
    });
  }
}

export { Git };
