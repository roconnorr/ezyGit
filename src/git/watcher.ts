import { AppToaster } from '../components/Toaster/Toaster';
import * as chokidar from 'chokidar';
var newWatch = require('watch');

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
  CREATED = 'created',
  MODIFIED = 'changed',
  REMOVED = 'removed',
}

class FileWatcher {
  directory: string | undefined;
  ignore: Array<string> = [];
  agent: any;

  start() {
    if (this.agent) {
      this.agent.close();
    }

    // this.agent = newWatch.createMonitor(
    //   this.directory,
    //   {
    //     filter: this.gitIgnoreFilter.bind(this),
    //     ignoreDotFiles: true,
    //     interval: 3,
    //   },

    //   (monitor: any) => {
    //     this.agent = monitor;
    //     monitor.on('created', function (f: any, stat: any) {
    //       // Handle new files
    //       console.log('created : ' + f, stat);
    //     });
    //     monitor.on('changed', function (f: any, curr: any, prev: any) {
    //       // Handle file changes
    //       console.log('changed : ' + f, curr, prev);
    //     });
    //     monitor.on('removed', function (f: any, stat: any) {
    //       // Handle removed files
    //       // console.log('removed : ' + f, stat);
    //     });
    //   }
    // );
  }
  /**
   * Cheeky custom filter callback for watcher, helps map git ignore to file watcher filter
   * @param file File currently being checked
   * @param stat Current status of that file
   */
  gitIgnoreFilter(file: string, stat: any): boolean {
    for (const ignore in this.ignore) {
      if (file.includes(this.ignore[ignore])) {
        return false;
      }
    }
    return true;
  }

  stop() {
    if (this.agent) {
      this.agent.close();
    }
  }

  addEvent(event: FileWatcherEvent, callback: any) {
    //TODO:Re-write this
    // if (this.agent) {
    //   this.agent.on(event, callback);
    // }
  }
}

export { startWatcher, addListener, FileWatcher, FileWatcherEvent };
