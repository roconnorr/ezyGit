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

  buildIgnoreRegex(): RegExp {
    let expression = '';
    let template = '(\\w*{1}\\w*)|';

    for (const ignore in this.ignore) {
      expression += template.replace(/\{1}/, this.ignore[ignore]);
    }
    return new RegExp(expression.replace(/\//g, '\\/').replace(/\|$/, ''));
  }

  start() {
    if (this.agent) {
      this.agent.close();
    }

    this.agent = chokidar
      .watch(process.cwd(), {
        ignored: [/(^|[\/\\])\../, this.buildIgnoreRegex()],
        ignoreInitial: true,
        persistent: true,
      })
      .on('ready', () => console.log('Watcher Ready!'));
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
