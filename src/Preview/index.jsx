import React, { useEffect, useState } from "react";
import { useComponentContext } from "./../context/componentContext";
import PreviewScreenPanel from "./PreviewScreenPanel";
import { Route, Routes, Link, Navigate, useNavigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import PreviewPopup from "./PreviewPopup";
import PreviewSidebar from "./PreviewSidebar";
import PreviewHeader from "./PreviewHeader";
import { useTransition, animated } from 'react-spring';

function PreviewApp() {
  const {screens, setPopup, setSidebar, setHeader, selectedPopupId, selectedSidebarId, selectedHeaderId, selectedScreenIndex, sidebarNavState, popupNavState, headerNavState, interfaceView } = useComponentContext();

  console.log("🔍 Preview App Debug:", {
    screens: screens,
    screensLength: screens.length,
    selectedScreenIndex: selectedScreenIndex,
    currentScreen: screens[selectedScreenIndex],
    firstScreen: screens[0]
  });



  const navigate = useNavigate();
  const location = useLocation();

  const [sidebarScreen, setSidebarScreen] = useState(null);
  const [popScreen, setPopupScreen] = useState(null);
  const [headerScreen, setHeaderScreen] = useState(null);

  const handleSidebarClose = () => {
    setSidebarScreen(null);
    setSidebar(null);
  };

  const handlePopupClose = () => {
    setPopupScreen(null);
    setPopup(null);
  };

  useEffect(() => {
    const matchPopup = screens.filter((screen) => screen.id === selectedPopupId && screen.type === 'popup');
    const matchSidebar = screens.filter((screen) => screen.id === selectedSidebarId && screen.type === 'sidebar');
    const matchHeader = screens.filter((screen) => screen.id === selectedHeaderId && screen.type === 'header');

    if (matchPopup.length > 0) {
      setPopupScreen(matchPopup[0]);
      setPopup(matchPopup[0].id);
    } else {
      setPopupScreen(null);
      setPopup(null);
    }

    if (matchSidebar.length > 0) {
      setSidebarScreen(matchSidebar[0]);
      setSidebar(matchSidebar[0].id);
    } else {
      setSidebarScreen(null);
      setSidebar(null);
    }

    if (matchHeader.length > 0) {
      setHeaderScreen(matchHeader[0]);
      setHeader(matchHeader[0].id);
    } else {
      setHeaderScreen(null);
      setHeader(null);
    }
  }, [selectedPopupId, selectedSidebarId, selectedHeaderId, selectedScreenIndex]);

  const screenVariants = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };

  // Set up the transition logic for route changes
  const transitions = useTransition(location, {
    from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
    easing: [0.25, 0.1, 0.25, 1]
  });

  const screenWidth = interfaceView == "mobile" ? "400px" : "100%";
  const mobileViewMarginLeft = interfaceView == "mobile" ? "calc(calc(100% - 400px) / 2)" : "0px";

  return (
    <>
        {/* Wrapping transitions with animated.div for route animation */}
        {transitions((style, item) => (

          <animated.div key={item.pathname} style={{...style,width:screenWidth,marginLeft:mobileViewMarginLeft}}>
            <Routes location={item}>
              {/* Redirect from `/preview` to the selected screen's path if available */}
              <Route
                path="/"
                element={screens.length > 0 ? <Navigate to={`/preview/${screens[selectedScreenIndex]?.id || screens[0].id}`} replace /> : <div>Loading...</div>}
              />
              <Route
                path="/preview"
                element={screens.length > 0 ? <Navigate to={`/preview/${screens[selectedScreenIndex]?.id || screens[0].id}`} replace /> : <div>Loading...</div>}
              />

              {/* Define nested routes for each screen */}
              {screens.map((screen) => (
                <Route
                  key={screen.id}
                  path={`/preview/${screen.id}`}
                  element={
                    <>
                      
                        <PreviewScreenPanel
                          screen={screen}
                          sidebar={
                            selectedSidebarId && sidebarScreen ? (
                              <PreviewSidebar
                                screen={sidebarScreen}
                                isVisible={sidebarScreen !== null}
                                onClose={handleSidebarClose}
                                sidebarNavState={sidebarNavState}
                              />
                            ) : null
                          }
                          header={
                            selectedHeaderId && headerScreen ? (
                              <PreviewHeader
                                screen={headerScreen}
                                isVisible={headerScreen !== null}
                              />
                            ) : null
                          }
                        />

                      {/* Display popup if there's a selected popup */}
                      {selectedPopupId && popScreen && (
                        <PreviewPopup
                          screen={popScreen}
                          isVisible={popScreen !== null}
                          onClose={handlePopupClose}
                          popupNavState={popupNavState}
                        />
                      )}
                    </>
                  }
                />
              ))}
            </Routes>
          </animated.div>
        ))}
    </>
  );
}

export default PreviewApp;
