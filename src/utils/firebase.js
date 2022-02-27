import firebase from "firebase/app";
import auth from "firebase/auth";
import "firebase/storage";
import axios from "axios";
import _ from "lodash";

/* GET FIREBASE ENVIRONMENT VARIABLES */
const {
  REACT_APP_FIREBASE_API_KEY,
  REACT_APP_FIREBASE_AUTH_DOMAIN,
  REACT_APP_FIREBASE_PROJECT_ID,
  REACT_APP_FIREBASE_STORAGE_BUCKET,
  REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  REACT_APP_FIREBASE_APP_ID,
  REACT_APP_FIREBASE_ROOT_DIRECTORY,
} = process.env;
/* INITIALIZE FIREBASE CONFIGURATION OBJECT */
const firebaseConfig = {
  apiKey: REACT_APP_FIREBASE_API_KEY,
  authDomain: REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: REACT_APP_FIREBASE_APP_ID,
};
/* INITIALIZE A FIREBASE APP */
const getFirebaseApp = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    /* IF ALREADY INTIALIZED USE THE CURRENT INSTANCE */
    firebase.app();
  }
};
/* ANONYMOUSLY AUTHENTICATE THE WEB APP TO INTERACT WITH PRIVATE FIREBASE STORAGE */
const anonymousAuthentication = async () => {
  let user = await firebase.auth().signInAnonymously();
  return user.user.uid;
};

/* RETURN A REFERENCE TO FIREBASE STORAGE */
const getStorageReference = () => {
  return firebase.storage().ref();
};
/* GIVEN A PATH,RETURN AN ARRAY CONTAINING THE
   FOLDERS INSIDE THE CORRESPONDING DIRECTORY */

/* EXAMPLE */
/* --root
     -----folder1
     -----folder2
     -----folder3
*/
/* INPUT: "root" */
/* OUTPUT: ["folder1","folder2","folder3"] */
const listfolders = async (path) => {
  let folders = [];
  let response = await (await getFolderReference(path).listAll()).prefixes;
  response.map((item) =>
    folders.push(item._delegate._location.path_.split("/").pop())
  );
  return folders;
};

const listFiles = async (path, substring) => {
  let galleryItems = [];
  let result = await getFolderReference(
    REACT_APP_FIREBASE_ROOT_DIRECTORY.concat(path)
  ).listAll();
  result._delegate["items"]
    .filter((e) => e._location.path_.includes(substring))
    .map((e) => {
      let fullPath = e._location.path_.split("/");
      fullPath.shift();
      galleryItems.push(`/${fullPath.join("/")}`);
      return null;
    });
  return galleryItems;
};

/* GIVEN A PATH, RETURN A REFERENCE TO THE CORRESPONDING FOLDER */
const getFolderReference = (path) => {
  return getStorageReference().child(path);
};
const getImageDownloadUrl = async (path) => {
  let appendedPath = REACT_APP_FIREBASE_ROOT_DIRECTORY.concat(path);
  let imagePath;
  let split = appendedPath.split("/");
  split.pop();
  let newPath = split.join("/");
  let test = await getStorageReference().child(newPath).listAll();
  test = test._delegate.items.filter(
    (item) =>
      item._location.path_.split(".")[0] ===
      appendedPath.split(".")[0].substring(1)
  );

  if (test[0] !== undefined) {
    imagePath = test[0]._location.path_;
    return getStorageReference()
      .child(imagePath)
      .getDownloadURL()
      .catch((err) => {
        console.log(err);
      });
  } else {
    return null;
  }
};

const getFileDownloadUrl = async (path) => {
  return getStorageReference()
    .child(path)
    .getDownloadURL()
    .catch((err) => {
      console.log(err);
    });
};
const fetchJsonAttributeValue = async (jsonPath, attributeName) => {
  let url = await await getFileDownloadUrl(jsonPath);
  let attributeValue = await axios.get(url).then((res) => {
    return res.data[attributeName];
  });
  return attributeValue;
};

const checkAssets = async (folderPath, caseType) => {
  let result;
  switch (caseType) {
    case "image": {
      let assets = await listFiles(`${folderPath}`, "");
      let galleryItems = await listFiles(`${folderPath}`, "similar");
      let baseItems = assets.filter((e) => galleryItems.indexOf(e) < 0);
      result = baseItems.length >= 3;
      break;
    }
    case "audio": {
      let assets = await listFiles(folderPath, "");
      result = assets.length >= 2;
      break;
    }
    case "video": {
      let assets = await listFiles(folderPath, "");
      result = assets.length >= 2;
      break;
    }
    case "hybrid": {
      let assets = await listFiles(folderPath, "");
      result = assets.length >= 3;
      break;
    }
    default:
      break;
  }
  return result;
};
const validateCases = async (cases) => {
  let lookup = {
    audio: "audio",
    video: "video",
    hybrid: "hybrid",
  };
  return Promise.all(
    cases.map(async (e) => {
      return (
        (await checkAssets(
          `/gallery/cases/${e}`,
          lookup[e.split("-").shift().toLowerCase()] || "image"
        )) === true
      );
    })
  );
};
const fetchCases = async (configExists, path, cases, shuffle) => {
  let videoCases = [];
  let imageCases = [];
  let audioCases = [];
  let hybridCases = [];
  let check;
  let validCases;

  if (configExists) {
    check = await validateCases(cases);
    validCases = cases.filter((e) => check[cases.indexOf(e)] === true);
    validCases.map((element) => {
      let prefix = element.split("-")[0].toLowerCase();
      return prefix === "video" 
        ? videoCases.push(element)
        : prefix === "audio"
        ? audioCases.push(element)
        : prefix === "hybrid"
        ? hybridCases.push(element)
        : imageCases.push(element);
    });

    if (shuffle === "categorized") {
      let res = [
        ..._.shuffle(imageCases),
        ..._.shuffle(hybridCases),
        ..._.shuffle(videoCases),
        ..._.shuffle(audioCases),
      ];
      return res;
    } else if (shuffle === "full") {
      return [..._.shuffle(validCases)];
    } else {
      return validCases;
    }
  } else {
    let cases = await listfolders(path);
    check = await validateCases(cases);
    validCases = cases.filter((e) => check[cases.indexOf(e)] === true);
    validCases.map((element) => {
      let prefix = element.split("-")[0].toLowerCase();
      return prefix === "video" 
        ? videoCases.push(element)
        : prefix === "audio"
        ? audioCases.push(element)
        : prefix === "hybrid"
        ? hybridCases.push(element)
        : imageCases.push(element);
    });

    return [
      ..._.shuffle(imageCases),
      ..._.shuffle(hybridCases),
      ..._.shuffle(videoCases),
      ..._.shuffle(audioCases),
    ];
  }
};

export {
  getFirebaseApp,
  anonymousAuthentication,
  getStorageReference,
  listfolders,
  getFolderReference,
  getImageDownloadUrl,
  getFileDownloadUrl,
  fetchJsonAttributeValue,
  listFiles,
  fetchCases,
};
