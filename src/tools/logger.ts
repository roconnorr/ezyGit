const modules: ModuleOption[] = [];

interface ModuleOption {
  id: string;
  level: Level;
  enabled: boolean;
}

enum Level {
  VERBOSE = 0,
  DEBUG = 1,
  INFO = 2,
  WARNING = 3,
  ERROR = 4,
  OFF = 5,
}

function registerModule(id: string, level: Level, enabled: boolean = true) {
  if (modules.some(m => m.id === id) === false) {
    modules.push({ id: id, level: level, enabled: enabled });
  }
}
function enableModule(id: string) {
  modules.some(m => (m.enabled = true));
}

function disableModule(id: string) {
  modules.some(m => (m.enabled = false));
}

function setLogLevel(id: string, level: Level) {
  modules.some(m => (m.level = level));
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
  let mod = modules.find(m => m.id === id);

  if (mod && mod.enabled) {
    msg = '[' + id + ']: ' + msg;
    switch (event) {
      case 'DEBUG':
        if (mod.level <= Level.DEBUG) {
          console.debug(msg, ...args);
        }
        break;
      case 'INFO':
        if (mod.level <= Level.INFO) {
          console.info(msg, ...args);
        }
        break;
      case 'ERROR':
        if (mod.level <= Level.ERROR) {
          console.error(msg, ...args);
        }
        break;
      case 'WARNING':
        if (mod.level <= Level.WARNING) {
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

//Testing logging levels
registerModule('LOGGER', Level.OFF);
debug('LOGGER', 'DEBUG TEST');
info('LOGGER', 'INFO TEST');
warn('LOGGER', 'WARN TEST');
error('LOGGER', 'ERROR TEST');
