// mbridge.jsx
let reqCounter = 0;
const callbacks = {};

function handleMessage(event) {
  const { requestId, result, error } = event.data || {};
  if (!requestId || !callbacks[requestId]) return;

  const { resolve, reject } = callbacks[requestId];
  delete callbacks[requestId];

  error ? reject(error) : resolve(result);
}

if (typeof window !== "undefined" && !window.__MBridge_Initialized__) {
  window.__MBridge_Initialized__ = true;
  window.addEventListener("message", handleMessage);
}

function sendRequest(type, payload = {}) {
  return new Promise((resolve, reject) => {
    const requestId = `req_${Date.now()}_${++reqCounter}`;
    callbacks[requestId] = { resolve, reject };

    window.parent.postMessage({ type, payload, requestId }, "*");
  });
}

function isDarkColor(hex) {
  if (!hex?.startsWith("#")) return false;
  const c = hex.slice(1);
  const r = parseInt(c.substr(0, 2), 16);
  const g = parseInt(c.substr(2, 2), 16);
  const b = parseInt(c.substr(4, 2), 16);
  return r * 0.299 + g * 0.587 + b * 0.114 < 128;
}

// ...rest of your logic...
