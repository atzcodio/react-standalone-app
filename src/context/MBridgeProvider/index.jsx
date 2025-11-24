import React, { createContext, useContext, useEffect, useRef } from "react";

const MBridgeContext = createContext(null);

export const MBridgeProvider = ({ children }) => {
  const reqCounter = useRef(0);
  const callbacks = useRef({});

  useEffect(() => {
    function handleMessage(event) {
      const { requestId, result, error } = event.data || {};
      if (!requestId || !callbacks.current[requestId]) return;

      const { resolve, reject } = callbacks.current[requestId];
      delete callbacks.current[requestId];

      if (error) reject(error);
      else resolve(result);
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  function sendRequest(type, payload = {}) {
    return new Promise((resolve, reject) => {
      const requestId = `req_${Date.now()}_${++reqCounter.current}`;

      callbacks.current[requestId] = { resolve, reject };
      window.parent.postMessage({ type, payload, requestId }, "*");
    });
  }

  // --- FULL MBRIDGE API ---
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
      showShort: (text) => sendRequest("toast.show", { text, duration: "short" }),
      showLong: (text) => sendRequest("toast.show", { text, duration: "long" }),
    },

    share: {
      share: (opts) => sendRequest("share.share", opts),
      shareText: (text, title = "") =>
        sendRequest("share.share", { text, title }),
      shareUrl: (url, title = "") =>
        sendRequest("share.share", { url, title }),
    },

    clipboard: {
      write: (text) => sendRequest("clipboard.write", { string: text }),
      read: () => sendRequest("clipboard.read"),
    },

    storage: {
      get: (key) => sendRequest("storage.get", { key }),
      set: (key, value) => sendRequest("storage.set", { key, value }),
      remove: (key) => sendRequest("storage.remove", { key }),
      clear: () => sendRequest("storage.clear"),
      keys: () => sendRequest("storage.keys"),
    },

    statusBar: {
      show: () => sendRequest("statusbar.show"),
      hide: () => sendRequest("statusbar.hide"),
      setStyle: (style) => sendRequest("statusbar.setStyle", { style }),
      setBackgroundColor: (color) =>
        sendRequest("statusbar.setBackgroundColor", { color }),
      setTheme: (theme) => sendRequest("statusbar.setTheme", { theme }),
      setTransparent: () => sendRequest("statusbar.setTransparent"),
      reset: () => sendRequest("statusbar.reset"),
      setBlue: () => sendRequest("statusbar.setTheme", { theme: "blue" }),
      setDark: () => sendRequest("statusbar.setTheme", { theme: "dark" }),
      setLight: () => sendRequest("statusbar.setTheme", { theme: "light" }),
      setRed: () => sendRequest("statusbar.setTheme", { theme: "red" }),
      setGreen: () => sendRequest("statusbar.setTheme", { theme: "green" }),
      setPurple: () => sendRequest("statusbar.setTheme", { theme: "purple" }),
    },

    splashScreen: {
      show: () => sendRequest("splashscreen.show"),
      hide: () => sendRequest("splashscreen.hide"),
    },

    platform: {
      getPlatform: () => sendRequest("capacitor.getPlatform"),
      isNativePlatform: () => sendRequest("capacitor.isNativePlatform"),
      convertFileSrc: (fileSrc) =>
        sendRequest("capacitor.convertFileSrc", { fileSrc }),
    },

    utils: {
      saveAppData: (k, v) => sendRequest("storage.set", { key: k, value: JSON.stringify(v) }),
      loadAppData: async (k) => {
        const r = await sendRequest("storage.get", { key: k });
        return r?.value ? JSON.parse(r.value) : null;
      },

      isOnline: async () => {
        const r = await sendRequest("network.getStatus");
        return r.connected;
      },

      getDevicePlatform: async () => {
        const info = await sendRequest("device.getInfo");
        return {
          platform: info.platform,
          model: info.model,
          operatingSystem: info.operatingSystem,
          osVersion: info.osVersion,
        };
      },

      showSuccess: (msg) =>
        sendRequest("toast.show", { text: `✅ ${msg}`, duration: "long" }),

      showError: (msg) =>
        sendRequest("toast.show", { text: `❌ ${msg}`, duration: "long" }),

      copyToClipboard: async (text) => {
        try {
          await sendRequest("clipboard.write", { string: text });
          await MBridge.utils.showSuccess("Copied to clipboard!");
          return true;
        } catch (e) {
          await MBridge.utils.showError("Failed to copy");
          return false;
        }
      },

      captureAndSaveImage: async (filename) => {
        const photo = await MBridge.camera.takePhoto({
          quality: 80,
          resultType: "base64",
        });

        await MBridge.filesystem.writeFile({
          path: filename,
          data: photo.base64String,
          directory: "Documents",
        });

        await MBridge.utils.showSuccess("Image saved!");
        return photo;
      },

      shareContent: async (title, text, url = null) => {
        try {
          await sendRequest("share.share", { title, text, url });
          return true;
        } catch {
          await MBridge.utils.showError("Share failed");
          return false;
        }
      },

      setAppTheme: async (isDark) => {
        const theme = isDark ? "dark" : "light";
        return sendRequest("statusbar.setTheme", { theme });
      },

      setBrandedStatusBar: async (color) => {
        await sendRequest("statusbar.setBackgroundColor", { color });

        const style = isDarkColor(color) ? "light" : "dark";
        await sendRequest("statusbar.setStyle", { style });
      },
    },
  };

  // helper
  function isDarkColor(hex) {
    if (!hex.startsWith("#")) return false;
    const c = hex.substring(1);
    const r = parseInt(c.substr(0, 2), 16);
    const g = parseInt(c.substr(2, 2), 16);
    const b = parseInt(c.substr(4, 2), 16);
    return (r * 0.299 + g * 0.587 + b * 0.114) < 128;
  }

  // Expose globally too
  window.MBridge = MBridge;

  return (
    <MBridgeContext.Provider value={MBridge}>
      {children}
    </MBridgeContext.Provider>
  );
};

export const useMBridge = () => useContext(MBridgeContext);
