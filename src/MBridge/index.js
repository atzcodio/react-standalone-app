// mbridge.js
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

// ---------------------------
// 🔥 Main SDK Object
// ---------------------------

const MBridge = {
  camera: {
    takePhoto: (opts = {}) => sendRequest("camera.takePhoto", opts),
    pickFromGallery: (opts = {}) => sendRequest("camera.pickFromGallery", opts),
  },

  filesystem: {
    readFile: (opts) => sendRequest("filesystem.readFile", opts),
    writeFile: (opts) => sendRequest("filesystem.writeFile", opts),
    deleteFile: (opts) => sendRequest("filesystem.deleteFile", opts),
    mkdir: (opts) => sendRequest("filesystem.mkdir", opts),
    rmdir: (opts) => sendRequest("filesystem.rmdir", opts),
    readdir: (opts) => sendRequest("filesystem.readdir", opts),
    stat: (opts) => sendRequest("filesystem.stat", opts),
  },

  device: {
    getInfo: () => sendRequest("device.getInfo"),
    getBatteryInfo: () => sendRequest("device.getBatteryInfo"),
    getLanguageCode: () => sendRequest("device.getLanguageCode"),
  },

  network: {
    getStatus: () => sendRequest("network.getStatus"),
  },

  toast: {
    show: (text, opts = {}) => sendRequest("toast.show", { text, ...opts }),
  },

  clipboard: {
    write: (text) => sendRequest("clipboard.write", { string: text }),
    read: () => sendRequest("clipboard.read"),
  },

  // ---- utilities ----
  utils: {
    saveAppData: (k, v) =>
      sendRequest("storage.set", { key: k, value: JSON.stringify(v) }),

    loadAppData: async (k) => {
      const r = await sendRequest("storage.get", { key: k });
      return r?.value ? JSON.parse(r.value) : null;
    },

    showSuccess: (msg) =>
      sendRequest("toast.show", { text: `✅ ${msg}`, duration: "long" }),

    showError: (msg) =>
      sendRequest("toast.show", { text: `❌ ${msg}`, duration: "long" }),
  },
};

// Attach globally
if (typeof window !== "undefined") {
  window.MBridge = MBridge;
}

export default MBridge;
