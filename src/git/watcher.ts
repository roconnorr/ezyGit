import * as chokidar from 'chokidar';

enum FileWatcherEvent {
  ALL = 'all',
  CREATED = 'add',
  MODIFIED = 'change',
  REMOVED = 'unlink',
  DIRADD = 'addDir',
  DIRDELETED = 'unlinkDir',
  ERROR = 'error',
}

class FileWatcher {
  directory: string | undefined;
  ignore: Array<string> = [];
  agent: any;

  start() {
    if (this.agent) {
      this.agent.close();
    }

    this.agent = chokidar
      .watch(process.cwd(), {
        ignored: (path: any) => this.ignore.some(s => path.includes(s)),
        cwd: this.directory,
      })
      .on('ready', () => {
        'Watcher started!';
      });
  }

  stop() {
    if (this.agent) {
      this.agent.close();
    }
  }

  addEvent(event: FileWatcherEvent, callback: any) {
    //TODO:Re-write this
    if (this.agent) {
      this.agent.on(event, callback);
    }
  }
}

export { FileWatcher, FileWatcherEvent };
