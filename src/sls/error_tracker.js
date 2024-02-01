import { pushLog } from './pushLog';

window.onerror = function (message, source, lineno, colno, error) {
  if (message.includes('Script error')) return;
  console.error(message, source, lineno, colno, error);
  pushLog({
    key: '[WindowGlobalError]',
    message,
    source: JSON.stringify(source),
    lineno,
    colno,
    error: JSON.stringify(error)
  })
}
