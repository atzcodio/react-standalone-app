import { useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context';
import PreviewApp from './Preview';
import { setGlobalContext } from './context/GlobalContext'
import { ComponentProvider, useComponentContext } from './context/componentContext';
import './App.css';
import './index.css';
import { MBridgeProvider } from "./context/MBridgeProvider";


import { IAppData } from './types';
type AppProps = {
  appData: IAppData;
};


// APP_DATA_PLACEHOLDER - This will be replaced with actual data during export
// const appData = {};

function AppContent() {
  const { onDragEnd, screens, queries, setQueries, updateComponentByName, setPopup, setSidebar, setHeader } = useComponentContext();
  useEffect(() => {
    setGlobalContext({ screens, queries, setQueries, updateComponentByName, setPopup, setSidebar, setHeader });
  }, [screens, queries]);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/*" element={<PreviewApp />} />
        </Routes>
      </div>
    </Router>
  );
}

function App({ appData }: AppProps) {
  return (
    <AppProvider initialData={{ "screens": appData.screens, "queries": appData.queries }}>
      <ComponentProvider initialData={{ "screens": appData.screens as any, "queries": appData.queries as any }}>
        <AppContent />
      </ComponentProvider>
    </AppProvider>
  );
}

export default App;