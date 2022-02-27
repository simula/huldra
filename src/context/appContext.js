import React, { useState, createContext, useEffect } from "react";
import { getFirebaseApp, anonymousAuthentication } from "../utils/firebase";
import {
  fetchConfigVariable,
  fetchConfigVariablesBatch,
} from "../utils/handleConfigVars";

export const AppContext = createContext();
export const AppProvider = (props) => {
  const firebaseConfig = fetchConfigVariablesBatch([
    "REACT_APP_FIREBASE_API_KEY",
    "REACT_APP_FIREBASE_AUTH_DOMAIN",
    "REACT_APP_FIREBASE_PROJECT_ID",
    "REACT_APP_FIREBASE_STORAGE_BUCKET",
    "REACT_APP_FIREBASE_MESSAGING_SENDER_ID",
    "REACT_APP_FIREBASE_APP_ID",
    "REACT_APP_FIREBASE_ROOT_DIRECTORY",
  ]);
  const REACT_APP_general = fetchConfigVariable("REACT_APP_general");

  const getCurrentPageIndex = () => {
    return setPageLocator(parseInt(localStorage.getItem("PageLocator"), 10));
  };
  const getCasesCount = () => {
    let casesArray = JSON.parse(localStorage.getItem("CaseOrder"));
    return casesArray ? casesArray.length : 0;
  };

  const [PageLocator, setPageLocator] = useState(
    parseInt(localStorage.getItem("PageLocator"), 10) || 0
  );
  const [disableNextButton, setDisableNextButton] = useState(false);
  const [clientUid, setClientId] = useState("");
  const [casesCount, setCasesCount] = useState(0);
  const [currentDemonstrationPageIndex, setCurrentDemonstrationPageIndex] =
    useState(0);

  const rootDirectory = firebaseConfig.REACT_APP_FIREBASE_ROOT_DIRECTORY;
  useEffect(() => {
    getFirebaseApp();
    (async () => {
      let uid = await anonymousAuthentication();
      setClientId(uid);
    })();
    setPageLocator(getCurrentPageIndex);
    PageLocator && setPageLocator(PageLocator);
  }, [setPageLocator, PageLocator]);

  const value = {
    disableNextButton,
    setDisableNextButton,
    getCurrentPageIndex,
    PageLocator,
    setPageLocator,
    firebaseConfig,
    rootDirectory, 
    clientUid,
    casesCount,
    REACT_APP_general,
    setCasesCount,
    getCasesCount,
    currentDemonstrationPageIndex,
    setCurrentDemonstrationPageIndex,
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
