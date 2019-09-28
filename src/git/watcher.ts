import { AppToaster } from "../components/Toaster/Toaster";
const chokidar = require('chokidar');

const home = ".";
const ignored = ["/(^|[\/\\])\../", 'node_modules', '.*'];
let watcher: any;

async function startWatcher() {

  watcher = chokidar.watch(home, {
    ignored: ignored,
    ignoreInitial: true,
    persistent: true
  }).on('ready', setupEvents);

  return;
}

//Find better way
function addListener(listener: any) {
  watcher.on("all", listener);
}

//Sets up all the listening events for notifications
function setupEvents() {

  watcher
    .on('add', (path: string) => AppToaster.show({ message: `File ${path} has been added` }))
    .on('change', (path: string) => AppToaster.show({ message: `File ${path} has been changed` }))
    .on('unlink', (path: string) => AppToaster.show({ message: `File ${path} has been removed` }))
    .on('addDir', (path: string) => AppToaster.show({ message: `Directory ${path} has been added` }))
    .on('unlinkDir', (path: string) => AppToaster.show({ message: `Directory ${path} has been removed` }))
    .on('error', (error: string) => AppToaster.show({ message: `Watcher error: ${error}` }))

  console.log("Events hooked.");
}


export { startWatcher, addListener };