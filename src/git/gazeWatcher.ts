import * as fs from 'fs';
import { promisify } from 'util';
import { tsParameterProperty } from '@babel/types';

const readFileAsync = promisify(fs.readFile);

enum FileWatcherEvent {
  ALL = 'all',
  CREATED = 'added',
  MODIFIED = 'changed',
  RENAMED = 'renamed',
  DELETED = 'deleted',
}

const FileWatcherDefaults = {
  cwd: './',
};

/**
 * This is a wrapper class for the gaze libary.
 */
class FileWatcher {
  protected gazeInstance: any;
  protected workingDir: string;

  /**
   * @param _gazeInstance Gaze instance
   */
  constructor(_gazeInstance: any, _workingDir: string) {
    this.gazeInstance = _gazeInstance;
    this.workingDir = _workingDir;

    // Files have all started watching
    this.gazeInstance.on('ready', (watcher: any) => {
      console.log('WTF?');
    });

    this.gazeInstance.on('all', (event: string, filepath: string) => {
      console.log(filepath + ' was ' + event);
    });
  }

  stopWatcher() {
    this.gazeInstance.close();
  }
}

// // A file has been added/changed/deleted has occurred
// gaze.on('all', (event: any, filepath: string) => {
//   console.log('Temp');
// });

export const fetchIgnoreFileContents = async (
  workingDir: string
): Promise<string[]> => {
  const filePath = process.cwd() + '/.gitignore';

  const content = await readFileAsync(filePath);
  let lines = content.toString().split('\n');
  lines = lines.filter((currentLine: string) => {
    if (currentLine.startsWith('#') || !currentLine.trim()) {
      return false;
    }
    return true;
  });

  const temp = lines.map((content: string) => {
    const tempString = content.replace(/^\//, '');
    return '!**/' + tempString + '**';
  });

  lines.push('!**/.git'); //dont need to follow git stuff

  return temp;
};

export default FileWatcher;
