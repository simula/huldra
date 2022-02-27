import { getStorageReference, getFirebaseApp } from "../utils/firebase";
import { fetchConfigVariableValues } from "./handleConfigVars";
const { REACT_APP_FIREBASE_ROOT_DIRECTORY } = process.env;
const rootDirectory = REACT_APP_FIREBASE_ROOT_DIRECTORY;

getFirebaseApp();
let storageRef = getStorageReference();

const pushToBucket = () => {
  let storeToBucket = {};
  fetchConfigVariableValues("REACT_APP_outputJson").map((prop) => {
    storeToBucket[prop] = JSON.parse(localStorage.getItem(prop));
    return null;
  });
  let jsonString = JSON.stringify(storeToBucket);
  let blob = new Blob([jsonString], { type: "application/json" });
  let fileRef = storageRef.child(
    `${rootDirectory}/responses/${storeToBucket["ParticipantInfo"].ParticipantId}.json`
  );
  fileRef.put(blob).catch((err) => console.log(err));
};

export { pushToBucket };
