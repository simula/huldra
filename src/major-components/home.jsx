import React, { useState, useEffect, useContext } from "react";
import firebase from "firebase/app";
import "firebase/storage";
import { AppContext } from "../context/appContext";
import { toastError } from "../utils/toast";
import axios from "axios";
import { logSessionEvent, pushToLocalStorage } from "../utils/localStorage";
import { pushToBucket } from "../utils/cloudStorage";
import GenericButton from "../minor-components/genericButton";
const Home = ({ history, REACT_APP_home, setRouteIsAllowed }) => {
  const { firebaseConfig, rootDirectory, REACT_APP_general } =
    useContext(AppContext);
  const [participantId, setParticipantId] = useState("");

  useEffect(() => {
    if (localStorage.getItem("ParticipantInfo")) {
      let data = JSON.parse(localStorage.getItem("ParticipantInfo"));
      setParticipantId(data.ParticipantId);
    }
  }, []);

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app(); 
  }
  let storageRef = firebase.storage().ref();

  const fetchParticipantData = async (url) => {
    return await await axios
      .get(url)
      .catch((err) => {})
      .then((res) => {
        return res;
      });
  };
  const handleRedirectToRegistration = () => {
    history.push("/survey/registration");
  };
  const handleLogin = async () => {
    storageRef
      .child(`${rootDirectory}/responses/${participantId}.json`)
      .getDownloadURL()
      .catch((error) => {
        toastError(
          `The participant ID you entered is invalid.`,
          "top-center",
          "error"
        );
        return;
      })
      .then(async (res) => {
        let response = await fetchParticipantData(res);
        if (response && response.data) {
          if (response.data["ParticipantInfo"]) {
            if (response.data.SessionInfo.SessionComplete) {
              toastError(
                `The participant ID you entered has completed the survey.`,
                "top-center",
                "error"
              );
            } else {
              setRouteIsAllowed(true);
              pushToLocalStorage(new Array(response.data));
              logSessionEvent("Login page", "Start survey", 1);
              pushToBucket();
              history.push("/survey/background");
            }
          } else {
            pushToLocalStorage([{ ParticipantInfo: response.data }]);
            history.push("/survey/background");
          }
        }
      });
  };
  return (
    <div className="welcome">
      <div className="home-header">
        <h2>
          {(REACT_APP_home && REACT_APP_home["title"]) ||
            (REACT_APP_general && REACT_APP_general["appName"])}
        </h2>
        <div className="intro">
          {REACT_APP_home && REACT_APP_home["introText"]}
        </div>
      </div>
      <div className="registration-wrapper">
        <div className="login">
          <div className="participant-id-field">
            <input
              autoComplete="off"
              onChange={(e) => {
                setParticipantId(e.currentTarget.value);
              }}
              type="text"
              name="login"
              id="login"
              defaultValue={participantId}
              placeholder="Participant ID"
            />
          </div>
          <GenericButton
            onClick={handleLogin}
            hasIcon={true}
            className={"btn"}
            id="start-survey-button"
            iconClassName={"fa fa-play mr-2"}
            label="Start survey"
          />
        </div>
        <div className="signup">
          <p className="signup-message">
            {REACT_APP_home && REACT_APP_home["signupText"]}
          </p>
          <GenericButton
            onClick={handleRedirectToRegistration}
            hasIcon={true}
            className="btn"
            id="get-participant-id"
            iconClassName="fa fa-user-plus  mr-2"
            label="Get participant ID"
          />
          <span className="additionalText">
            {REACT_APP_home && REACT_APP_home["additionalText"]}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Home;
