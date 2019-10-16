// import chokidar, { FSWatcher } from 'chokidar';

// enum FileWatcherEvent {
//   ALL = 'all',
//   CREATED = 'add',
//   MODIFIED = 'change',
//   REMOVED = 'unlink',
//   DIRADD = 'addDir',
//   DIRDELETED = 'unlinkDir',
//   ERROR = 'error',
// }

// class FileWatcher {
//   protected ignoreList = new Array<string>();
//   protected watcher?: FSWatcher;

//   /**
//    * This will automatically start the file watcher.
//    *
//    * @param dir The file directory of the GIT repo.
//    */
//   constructor(dir: string) {
//     this.watcher = chokidar.watch(dir);
//   }

//   /**
//    * Will create and start the filewatcher.
//    * Untill this function is called the file watcher will not be listening to events.
//    */
//   public startWatcher() {
//     this.watcher.options.ignored;
//   }
// }

// const fileWatcherAgent = new chokidar.FSWatcher({
//   persistent: true,
//   ignoreInitial: true,
//   ignored: ignoreFilter,
// }).on(FileWatcherEvent.ALL, logger);

// function logger(event: string, path: string) {
//   console.log('Things happpend');
// }

// /**
//  * Helper function for chokdir to filter files
//  */
// function ignoreFilter(path: string): boolean {
//   return ignoreList.some(s => path.includes(s));
// }

// /**
//  * Adds a file or directory to the watchl lits
//  * Need to rename this function
//  * @param path Dir or file to watch
//  */
// function addToWatchList(path: string): chokidar.FSWatcher {
//   if (fileWatcherAgent) {
//     // log.debug(MODULE_NAME, 'Now watching: ' + path);
//     fileWatcherAgent.add(path);
//   }
//   return fileWatcherAgent;
// }

// /**
//  * Adds a file or directory to the ignore list
//  * Need to rename this function
//  * @param path Dir or file to ignore
//  */
// function addToWatchIgnore(path: string): chokidar.FSWatcher {
//   if (ignoreList) {
//     // log.debug(MODULE_NAME, 'Adding to ignore: ' + path);
//     ignoreList.push(path);
//   }
//   return fileWatcherAgent;
// }

// function stopWatcher(): chokidar.FSWatcher {
//   if (fileWatcherAgent) {
//     fileWatcherAgent.close();
//   }
//   return fileWatcherAgent;
// }

// function addEventListener(
//   event: FileWatcherEvent,
//   callback: any
// ): chokidar.FSWatcher {
//   //TODO:Re-write this
//   if (fileWatcherAgent) {
//     fileWatcherAgent.on(event, callback);
//   }
//   return fileWatcherAgent;
// }

// export {
//   fileWatcherAgent,
//   addToWatchList,
//   stopWatcher,
//   addEventListener,
//   FileWatcherEvent,
//   addToWatchIgnore,
//   ignoreList,
// };

export {};
