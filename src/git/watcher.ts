import { AppToaster } from '../components/Toaster/Toaster';
import * as chokidar from 'chokidar';
import { identifier, Function } from '@babel/types';

const home = '.';
const ignored = ['/(^|[/\\])../', 'node_modules', '.*'];
let watcher: any;

async function startWatcher() {
  watcher = chokidar
    .watch(home, {
      ignored: ignored,
      ignoreInitial: true,
      persistent: true,
    })
    .on('ready', setupEvents);

  return;
}

//Find better way
function addListener(listener: any) {
  watcher.on('all', listener);
}

//Sets up all the listening events for notifications
function setupEvents() {
  watcher
    .on('add', (path: string) =>
      AppToaster.show({ message: `File ${path} has been added` })
    )
    .on('change', (path: string) =>
      AppToaster.show({ message: `File ${path} has been changed` })
    )
    .on('unlink', (path: string) =>
      AppToaster.show({ message: `File ${path} has been removed` })
    )
    .on('addDir', (path: string) =>
      AppToaster.show({ message: `Directory ${path} has been added` })
    )
    .on('unlinkDir', (path: string) =>
      AppToaster.show({ message: `Directory ${path} has been removed` })
    )
    .on('error', (error: string) =>
      AppToaster.show({ message: `Watcher error: ${error}` })
    );

  console.log('Events hooked.');
}

enum FileWatcherEvent {
  ALL = 'all',
  READY = 'ready',
  ADD = 'add',
  CHANGE = 'change',
  UNLINK = 'unlink',
  DIRADD = 'addDir',
  DIR_UNLINK = 'unlinkDir',
  ERROR = 'error',
}

class FileWatcher {
  directory: string | undefined;
  options: chokidar.WatchOptions | undefined;
  agent: chokidar.FSWatcher | undefined;

  start() {
    if (this.agent) {
      this.agent.close();
    }
    console.log(this.options);
    this.agent = chokidar.watch(home, this.options).on('all', (event, path) => {
      console.log(event + ' : ' + path);
    });
  }

  stop() {
    if (this.agent) {
      this.agent.close();
    }
  }

  addEvent(event: FileWatcherEvent, callback: any) {
    if (this.agent) {
      this.agent.on(event, callback);
    }
  }
}

export { startWatcher, addListener, FileWatcher, FileWatcherEvent };
