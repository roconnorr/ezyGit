const modules: ModuleOption[] = [];

interface ModuleOption {
  id: string;
  level: Level;
  enabled: boolean;
}

enum Level {
  OFF = -1,
  DEBUG = 0,
  INFO = 1,
  WARNING = 2,
  ERROR = 3,
  VERBOSE = 4,
}

function registerModule(id: string, level: Level, enabled: boolean = true) {
  if (modules.some(m => m.id == id) == false) {
    modules.push({ id: id, level: level, enabled: enabled });
  }
}
function enableModule(id: string) {
  modules.some(m => {
    m.enabled = true;
  });
}

function disableModule(id: string) {
  modules.some(m => {
    m.enabled = false;
  });
}

function setLogLevel(id: string, level: Level) {
  modules.some(m => {
    m.level = level;
  });
}

function debug(id: string, msg: string, ...args: any[]) {
  logEvent('DEBUG', id, msg, ...args);
}
function info(id: string, msg: string, ...args: any[]) {
  logEvent('INFO', id, msg, ...args);
}
function error(id: string, msg: string, ...args: any[]) {
  logEvent('ERROR', id, msg, ...args);
}
function warn(id: string, msg: string, ...args: any[]) {
  logEvent('WARNING', id, msg, ...args);
}

function logEvent(event: string, id: string, msg: string, ...args: any[]) {
  let mod = modules.find(m => m.id == id);

  if (mod && mod.enabled) {
    switch (event) {
      case 'DEBUG':
        if (mod.level >= Level.DEBUG) {
          console.debug(msg, ...args);
        }
        break;
      case 'INFO':
        if (mod.level >= Level.INFO) {
          console.info(msg, ...args);
        }
        break;
      case 'ERROR':
        if (mod.level >= Level.ERROR) {
          console.error(msg, ...args);
        }
        break;
      case 'WARNING':
        if (mod.level >= Level.WARNING) {
          console.warn(msg, ...args);
        }
        break;
    }
  }
}

export {
  registerModule,
  enableModule,
  disableModule,
  setLogLevel,
  info,
  error,
  warn,
  debug,
  Level,
};
