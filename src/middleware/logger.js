// Logger middleware for the app
const LOG_KEY = 'url_shortener_logs';

function getLogs() {
  return JSON.parse(localStorage.getItem(LOG_KEY) || '[]');
}

function saveLog(entry) {
  const logs = getLogs();
  logs.push(entry);
  localStorage.setItem(LOG_KEY, JSON.stringify(logs));
}

const logger = {
  log: (message, meta = {}) => saveLog({ type: 'log', message, meta, timestamp: new Date().toISOString() }),
  info: (message, meta = {}) => saveLog({ type: 'info', message, meta, timestamp: new Date().toISOString() }),
  warn: (message, meta = {}) => saveLog({ type: 'warn', message, meta, timestamp: new Date().toISOString() }),
  error: (message, meta = {}) => saveLog({ type: 'error', message, meta, timestamp: new Date().toISOString() }),
  getLogs,
};

export default logger;
