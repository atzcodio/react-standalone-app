import React, { useState } from "react";

declare const MBridge: any; // If you have types, replace this

export default function MBridgeDemo() {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [deviceInfo, setDeviceInfo] = useState<string | null>(null);

  const [storageKey, setStorageKey] = useState("");
  const [storageValue, setStorageValue] = useState("");
  const [storageResult, setStorageResult] = useState<string | null>(null);

  const [fileName, setFileName] = useState("");
  const [fileContent, setFileContent] = useState("");
  const [fileResult, setFileResult] = useState<string | null>(null);
  const [fileList, setFileList] = useState<string | null>(null);

  const [toastMessage, setToastMessage] = useState("");
  const [shareTitle, setShareTitle] = useState("");
  const [shareText, setShareText] = useState("");
  const [clipboardText, setClipboardText] = useState("");
  const [clipboardResult, setClipboardResult] = useState<string | null>(null);

  const [platformInfo, setPlatformInfo] = useState<string | null>(null);

  // -------------------------
  // Camera Operations
  // -------------------------

  const takePhoto = async () => {
    try {
      const photo = await MBridge.camera.takePhoto({
        quality: 80,
        resultType: "uri",
      });
      setPhotoUrl(photo.webPath);
      await MBridge.utils.showSuccess("Photo captured successfully!");
    } catch (err) {
      await MBridge.utils.showError("Failed to take photo: " + err);
    }
  };

  const pickFromGallery = async () => {
    try {
      const photo = await MBridge.camera.pickFromGallery({
        quality: 80,
        resultType: "uri",
      });
      setPhotoUrl(photo.webPath);
      await MBridge.utils.showSuccess("Photo selected!");
    } catch (err) {
      await MBridge.utils.showError("Failed to pick from gallery: " + err);
    }
  };

  const savePhoto = async () => {
    try {
      const filename = `photo_${Date.now()}.jpg`;
      const photo = await MBridge.utils.captureAndSaveImage(filename);
      setPhotoUrl(photo.webPath);
    } catch (err) {
      await MBridge.utils.showError("Failed to save photo: " + err);
    }
  };

  // -------------------------
  // Device Info Operations
  // -------------------------

  const getDeviceInfo = async () => {
    try {
      const info = await MBridge.device.getInfo();
      setDeviceInfo(`
        Platform: ${info.platform}
        Model: ${info.model}
        OS: ${info.operatingSystem} ${info.osVersion}
        Manufacturer: ${info.manufacturer}
        Virtual: ${info.isVirtual}
      `);
    } catch (err) {
      await MBridge.utils.showError("Failed to get device info: " + err);
    }
  };

  const getBatteryInfo = async () => {
    try {
      const battery = await MBridge.device.getBatteryInfo();
      setDeviceInfo(`
        Battery Level: ${Math.round(battery.batteryLevel * 100)}%
        Charging: ${battery.isCharging}
      `);
    } catch (err) {
      await MBridge.utils.showError("Failed to get battery info: " + err);
    }
  };

  const getNetworkStatus = async () => {
    try {
      const isOnline = await MBridge.utils.isOnline();
      const status = await MBridge.network.getStatus();
      setDeviceInfo(`
        Connected: ${status.connected}
        Type: ${status.connectionType}
        Online: ${isOnline}
      `);
    } catch (err) {
      await MBridge.utils.showError("Failed to get network status: " + err);
    }
  };

  // -------------------------
  // Storage Operations
  // -------------------------

  const saveData = async () => {
    try {
      let data;
      try {
        data = JSON.parse(storageValue);
      } catch {
        data = storageValue;
      }
      await MBridge.utils.saveAppData(storageKey, data);
      await MBridge.utils.showSuccess(`Data saved with key: ${storageKey}`);
    } catch (err) {
      await MBridge.utils.showError("Failed to save data: " + err);
    }
  };

  const loadData = async () => {
    try {
      const data = await MBridge.utils.loadAppData(storageKey);
      setStorageResult(data ? JSON.stringify(data, null, 2) : "No data found");
    } catch (err) {
      await MBridge.utils.showError("Failed to load: " + err);
    }
  };

  const clearStorage = async () => {
    try {
      await MBridge.storage.clear();
      setStorageResult(null);
      await MBridge.utils.showSuccess("Storage cleared!");
    } catch (err) {
      await MBridge.utils.showError("Failed to clear storage: " + err);
    }
  };

  // -------------------------
  // File System
  // -------------------------

  const writeFile = async () => {
    try {
      await MBridge.filesystem.writeFile({
        path: fileName,
        data: fileContent,
        directory: "Documents",
        encoding: "utf8",
      });
      await MBridge.utils.showSuccess(`File written!`);
    } catch (err) {
      await MBridge.utils.showError("Failed to write file: " + err);
    }
  };

  const readFile = async () => {
    try {
      const result = await MBridge.filesystem.readFile({
        path: fileName,
        directory: "Documents",
        encoding: "utf8",
      });
      setFileResult(result.data);
    } catch (err) {
      await MBridge.utils.showError("Failed to read file: " + err);
    }
  };

  const listFiles = async () => {
    try {
      const files = await MBridge.filesystem.readdir({
        path: "",
        directory: "Documents",
      });
      setFileList(files.files.map((f:any) => `${f.name} (${f.type})`).join("\n"));
    } catch (err) {
      await MBridge.utils.showError("Failed to list files: " + err);
    }
  };

  const deleteFile = async () => {
    try {
      await MBridge.filesystem.deleteFile({
        path: fileName,
        directory: "Documents",
      });
      await MBridge.utils.showSuccess(`File deleted`);
    } catch (err) {
      await MBridge.utils.showError("Failed to delete: " + err);
    }
  };

  // -------------------------
  // Notifications & Clipboard
  // -------------------------

  const showToast = async () => {
    await MBridge.toast.showLong(toastMessage);
  };

  const showSuccess = async () => {
    await MBridge.utils.showSuccess("This is a success message!");
  };

  const showError = async () => {
    await MBridge.utils.showError("This is an error message!");
  };

  const shareContent = async () => {
    try {
      await MBridge.utils.shareContent(shareTitle, shareText);
    } catch (err) {
      console.log("Share error:", err);
    }
  };

  const copyToClipboard = async () => {
    await MBridge.utils.copyToClipboard(clipboardText);
  };

  const readClipboard = async () => {
    try {
      const result = await MBridge.clipboard.read();
      setClipboardResult(result.value || "Empty");
    } catch (err) {
      await MBridge.utils.showError("Failed to read clipboard: " + err);
    }
  };

  // -------------------------
  // Platform Controls
  // -------------------------

  const hideStatusBar = async () => {
    try {
      await MBridge.statusBar.hide();
      await MBridge.utils.showSuccess("Status bar hidden");
    } catch (err) {
      await MBridge.utils.showError("Failed: " + err);
    }
  };

  const showStatusBar = async () => {
    try {
      await MBridge.statusBar.show();
      await MBridge.utils.showSuccess("Status bar shown");
    } catch (err) {
      await MBridge.utils.showError("Failed: " + err);
    }
  };

  const getPlatformInfo = async () => {
    try {
      const platform = await MBridge.utils.getDevicePlatform();
      const platformInfo = await MBridge.platform.getPlatform();
      const isNative = await MBridge.platform.isNativePlatform();

      setPlatformInfo(`
        Platform: ${platformInfo.platform}
        Is Native: ${isNative.isNative}
        Model: ${platform.model}
        OS: ${platform.operatingSystem} ${platform.osVersion}
      `);
    } catch (err) {
      await MBridge.utils.showError("Failed to get platform info: " + err);
    }
  };

  // -------------------------
  // JSX UI
  // -------------------------

  return (
    <div style={{ padding: 20 }}>
      <h2>MBridge React Demo</h2>

      {/* CAMERA */}
      <button onClick={takePhoto}>Take Photo</button>
      <button onClick={pickFromGallery}>Pick From Gallery</button>
      <button onClick={savePhoto}>Save Photo</button>
      {photoUrl && <img src={photoUrl} style={{ width: 200, marginTop: 10 }} />}

      {/* DEVICE INFO */}
      <button onClick={getDeviceInfo}>Device Info</button>
      <button onClick={getBatteryInfo}>Battery Info</button>
      <button onClick={getNetworkStatus}>Network Status</button>

      {deviceInfo && <pre>{deviceInfo}</pre>}

      {/* STORAGE */}
      <input
        value={storageKey}
        onChange={(e) => setStorageKey(e.target.value)}
        placeholder="Key"
      />
      <textarea
        value={storageValue}
        onChange={(e) => setStorageValue(e.target.value)}
        placeholder="Value"
      />
      <button onClick={saveData}>Save</button>
      <button onClick={loadData}>Load</button>
      <button onClick={clearStorage}>Clear</button>
      {storageResult && <pre>{storageResult}</pre>}

      {/* FILE SYSTEM */}
      <input
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
        placeholder="File name"
      />
      <textarea
        value={fileContent}
        onChange={(e) => setFileContent(e.target.value)}
        placeholder="File content"
      />
      <button onClick={writeFile}>Write File</button>
      <button onClick={readFile}>Read File</button>
      <button onClick={listFiles}>List Files</button>
      <button onClick={deleteFile}>Delete File</button>
      {fileResult && <pre>{fileResult}</pre>}
      {fileList && <pre>{fileList}</pre>}

      {/* NOTIFICATIONS */}
      <input
        value={toastMessage}
        onChange={(e) => setToastMessage(e.target.value)}
        placeholder="Toast message"
      />
      <button onClick={showToast}>Show Toast</button>
      <button onClick={showSuccess}>Show Success</button>
      <button onClick={showError}>Show Error</button>

      {/* SHARE */}
      <input
        value={shareTitle}
        onChange={(e) => setShareTitle(e.target.value)}
        placeholder="Share title"
      />
      <input
        value={shareText}
        onChange={(e) => setShareText(e.target.value)}
        placeholder="Share text"
      />
      <button onClick={shareContent}>Share</button>

      {/* CLIPBOARD */}
      <input
        value={clipboardText}
        onChange={(e) => setClipboardText(e.target.value)}
        placeholder="Copy text"
      />
      <button onClick={copyToClipboard}>Copy</button>
      <button onClick={readClipboard}>Read Clipboard</button>
      {clipboardResult && <pre>{clipboardResult}</pre>}

      {/* PLATFORM */}
      <button onClick={hideStatusBar}>Hide Status Bar</button>
      <button onClick={showStatusBar}>Show Status Bar</button>
      <button onClick={getPlatformInfo}>Platform Info</button>

      {platformInfo && <pre>{platformInfo}</pre>}
    </div>
  );
}
