import React, { useEffect, useState, useContext } from "react";
import SummaryAndFeedback from "../major-components/summaryAndFeedback";
import Home from "./home";
import Registration from "./registration";
import Background from "./background";
import Demonstration from "./demonstration";
import CaseImage from "./caseImage";
import CaseVideo from "../major-components/caseVideo";
import CaseHybrid from "./caseHybrid";
import CaseAudio from "./caseAudio";
import End from "./end";
import Footer from "../minor-components/footer";
import { Route, Switch } from "react-router-dom";
import { AppContext } from "../context/appContext";
import { useBeforeunload } from "react-beforeunload";
import { ToastContainer } from "react-toastify";
import { toastError, toastInfo } from "../utils/toast";
import { v4 as uuidv4 } from "uuid";
import { generateTimeStamp } from "../utils/timestamp";
import { generateBlobFromJson } from "../utils/transform";
import { isValidEmail, validateFeedbackForm } from "../utils/inputValidation";
import copy from "copy-to-clipboard";
import version from "../VERSION.md";
import useHotkeys from "@reecelucas/react-use-hotkeys";
import "firebase/storage";
import { copyToClipboard } from "../utils/text";
import ProtectedRoute from "../minor-components/protectedRoute";
import Header from "../minor-components/header";
import { pushToBucket } from "../utils/cloudStorage";
import { logSessionEvent } from "../utils/localStorage";
import Modal from "@material-ui/core/Modal";
import ConfirmationDialog from "../minor-components/confirmationDialog";
import { getOs, browserName, browserVersion } from "../utils/clientMetadata";
import { getFolderReference, fetchCases } from "../utils/firebase";

const Survey = ({
  history,
  REACT_APP_home,
  REACT_APP_registration,
  REACT_APP_background,
  REACT_APP_demonstration,
  REACT_APP_caseImage,
  REACT_APP_caseVideo,
  REACT_APP_caseAudio,
  REACT_APP_caseHybrid,
  REACT_APP_summaryAndFeedback,
  REACT_APP_end,
  REACT_APP_outputJson,
  REACT_APP_footer,
  REACT_APP_header,
  REACT_APP_caseOrder,
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openEndDialog, setOpenEndDialog] = useState(false);
  const [Version, setVersion] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [comments, setComments] = useState("");
  const [degree, setDegree] = useState([]);
  const [fieldOfExpertise, setFieldOfExpertise] = useState([]);
  const [degreeOther, setDegreeOther] = useState("");
  const [activeYears, setActiveYears] = useState("");
  const [disableRegistration] = useState(false);
  const [termsOfUse, setTermsOfUse] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const [routeIsAllowed, setRouteIsAllowed] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [demonstrationPageIndex, setDemonstrationPageIndex] = useState(0);
  useState(0);

  const {
    PageLocator,
    disableNextButton,
    setDisableNextButton,
    getCurrentPageIndex,
    setPageLocator,
    rootDirectory,
    casesCount,
    setCasesCount,
    REACT_APP_general,
    getCasesCount,
    currentDemonstrationPageIndex,
    setCurrentDemonstrationPageIndex,
  } = useContext(AppContext);
  const handleDialogClose = () => {
    setOpenDialog(false);
  };
  const handleEndDialogClose = () => {
    setOpenEndDialog(false);
  };

  useEffect(() => {
    setSubscribed(true);
    setRouteIsAllowed(localStorage.getItem("ParticipantInfo") ? true : false);
    setCasesCount(getCasesCount);
    subscribed === true &&
      fetch(version)
        .then((res) => res.text())
        .then((text) => setVersion(text.replace(/\s+/g, "")));
    return () => setSubscribed(false);
  }, [setCasesCount, getCasesCount, subscribed]);

  useHotkeys("Shift+f", () => {
    if (history.location.pathname === "/survey/registration") {
      setName("NA (Development)");
      setEmail("huldra@simula.no");
      setCountry("NA (Development)");
      setDegree("NA (Development)");
      setFieldOfExpertise("NA (Development)");
      setActiveYears(999);
      setComments("Form filled out as part of development.");
      setTermsOfUse(true);
      toastInfo(
        "Form filled out as part of development.",
        "top-center",
        "req-error"
      );
    }
  });

  const onActiveYearsChange = (e) => {
    setActiveYears(e.currentTarget.value);
  };
  const onFieldOfExpertiseChange = (e) => {
    setFieldOfExpertise(e.currentTarget.value);
  };
  const handleDegreeChange = (option, state) => {
    let newArray = Array.from(degree);
    if (state) {
      if (newArray.indexOf(option) < 0) {
        setDegree([...newArray, option]);
      }
    } else {
      setDegree(newArray.filter((item) => item !== option));
    }
  };

  const handleOtherDegreeChange = (value) => {
    setDegreeOther(value);
  };

  const onNameChange = (e) => {
    setName(e.currentTarget.value);
  };
  const onEmailChange = (e) => {
    setEmail(e.currentTarget.value);
  };
  const onCountryChange = (e) => {
    setCountry(e.currentTarget.value);
  };
  const onCommentsChange = (e) => {
    setComments(e.currentTarget.value);
  };
  const validateEmail = (email) => {
    return isValidEmail(email);
  };
  let rightButtonLabel;
  let onLeftButtonClick;
  let onRightButtonClick;
  let leftButtonClassName;
  let rightButtonClassName;
  let disableLeftButton;
  let disableRightButton;
  if (history.location.pathname === "/survey/home") {
    leftButtonClassName = "hidden-button";
    rightButtonClassName = "hidden-button";
  } else if (history.location.pathname === "/survey/registration") {
    rightButtonLabel = "Start Survey";
    onRightButtonClick = () => getParticipantId();
    leftButtonClassName = "hidden-button";
    rightButtonClassName = "btn control";
  } else if (
    history.location.pathname === "/survey/background" ||
    history.location.pathname === "/survey/demonstration"
  ) {
    rightButtonLabel = "Next";
    onLeftButtonClick = () => handlePrevious();
    onRightButtonClick = () => handleNext();
    leftButtonClassName = "btn control";
    rightButtonClassName = "btn control";
  } else if (history.location.pathname.includes("/survey/case")) {
    rightButtonLabel = "Next";
    onLeftButtonClick = () => handlePrevious();
    onRightButtonClick = () => handleNext();
    leftButtonClassName = "btn control";
    rightButtonClassName = "btn control";
    disableRightButton = disableNextButton;
  } else if (history.location.pathname === "/survey/summary-and-feedback") {
    rightButtonLabel = "End Survey";
    onLeftButtonClick = () => handlePrevious();
    onRightButtonClick = () => handleEndSurvey();
    leftButtonClassName = "btn control";
    rightButtonClassName = "btn control";
  } else if (history.location.pathname === "/survey/end") {
    leftButtonClassName = "hidden-button";
    rightButtonClassName = "hidden-button";
  }
  let pageIsRegistration = history.location.pathname === "/survey/registration";
  let pageIsEndPage = history.location.pathname === "/survey/end";
  let pageIsHome = history.location.pathname === "/survey/home";

  useBeforeunload(() => "You'll lose your data!");

  const submitSurvey = () => {
    setOpenEndDialog(false);

    const CaseStudyAnswers = JSON.parse(
      localStorage.getItem("CaseStudyAnswers")
    );
    const FeedbackFormAnswers = JSON.parse(
      localStorage.getItem("FeedbackFormAnswers")
    );
    const ParticipantInfo = JSON.parse(localStorage.getItem("ParticipantInfo"));
    const SessionEvents = JSON.parse(localStorage.getItem("SessionEvents"));
    const SoftwareInfo = JSON.parse(localStorage.getItem("SoftwareInfo"));
    const CaseOrder = JSON.parse(localStorage.getItem("CaseOrder"));

    const storeToBucket = {
      SoftwareInfo,
      ParticipantInfo,
      CaseOrder,
      SessionInfo: {
        PageLocator: PageLocator,
        SessionComplete: true,
      },
      SessionEvents: [
        ...SessionEvents,
        {
          Location: "Summary and feedback",
          ButtonType: "End survey",
          Timestamp: generateTimeStamp(),
        },
      ],
      CaseStudyAnswers: CaseStudyAnswers,
      FeedbackFormAnswers: FeedbackFormAnswers,
    };

    let jsonString = JSON.stringify(storeToBucket);
    let blob = generateBlobFromJson(jsonString);
    let fileRef = getFolderReference(
      `${rootDirectory}/responses/${ParticipantInfo.ParticipantId}.json`
    );
    fileRef.put(blob);
    history.replace("/survey/end");
  };
  const handleEndSurvey = () => {
    const FeedbackFormAnswers = JSON.parse(
      localStorage.getItem("FeedbackFormAnswers")
    );
    if (!FeedbackFormAnswers) {
      toastError("Please verify mandatory fields.", "top-center", "req-error");
    } else {
      let hasError = validateFeedbackForm(
        REACT_APP_summaryAndFeedback["feedbackForm"].feedbackFormQuestions,
        FeedbackFormAnswers
      ).hasError;
      if (hasError) {
        toastError(
          "Please verify mandatory fields.",
          "top-center",
          "req-error"
        );
      } else {
        setOpenEndDialog(true);
      }
    }
  };

  useHotkeys("Enter", () => {
    if (disableNextButton === true) {
      return;
    } else {
      handleNext();
    }
  });
  useHotkeys("Shift+Enter", () => {
    if (history.location.pathname.includes("/survey/case")) {
      setDisableNextButton(false);
      handleNext();
      setDisableNextButton(true);
    }
  });
  const handleNext = () => {
    getCurrentPageIndex();
    if (history.location.pathname === "/survey/background") {
      logSessionEvent("Next", "Background", 0);
      pushToBucket();
      if (REACT_APP_demonstration.length === 0) {
        setPageLocator(1);
        history.push(`/survey/case1`);
      } else {
        setDemonstrationPageIndex(0);
        setCurrentDemonstrationPageIndex(1);
        history.push(`/survey/demonstration`);
      }
    } else if (history.location.pathname === "/survey/demonstration") {
      logSessionEvent(
        "Next",
        `Demonstration${currentDemonstrationPageIndex}`,
        0
      );
      pushToBucket();

      if (currentDemonstrationPageIndex >= REACT_APP_demonstration.length) {
        setCurrentDemonstrationPageIndex(REACT_APP_demonstration.length);
        setPageLocator(1);
        history.push(`/survey/case1`);
      } else {
        setDemonstrationPageIndex(currentDemonstrationPageIndex);
        setCurrentDemonstrationPageIndex(currentDemonstrationPageIndex + 1);
        history.push(`/survey/demonstration`);
      }
    } else if (PageLocator < casesCount) {
      logSessionEvent("Next", `Case${PageLocator}`, PageLocator);
      pushToBucket();
      const newPageNumber = PageLocator + 1;
      setPageLocator(newPageNumber);
      history.push(`/survey/case${newPageNumber}`);
    } else if (PageLocator === casesCount) {
      logSessionEvent("Next", `Case${casesCount}`, PageLocator);
      pushToBucket();
      history.push(`/survey/summary-and-feedback`);
    } else {
      return;
    }
  };
  const handlePrevious = () => {
    getCurrentPageIndex();
    if (history.location.pathname === "/survey/summary-and-feedback") {
      logSessionEvent("Previous", `Summary and feedback`, PageLocator);
      pushToBucket();
      history.push(`/survey/case${casesCount}`);
    } else if (history.location.pathname === "/survey/demonstration") {
      logSessionEvent(
        "Previous",
        `Demonstration${currentDemonstrationPageIndex}`,
        PageLocator
      );
      pushToBucket();
      switch (currentDemonstrationPageIndex) {
        case 1:
          setCurrentDemonstrationPageIndex(currentDemonstrationPageIndex - 1);
          history.push(`/survey/background`);
          break;
        case 2:
          setCurrentDemonstrationPageIndex(currentDemonstrationPageIndex - 1);
          setDemonstrationPageIndex(0);
          history.push(`/survey/demonstration`);
          break;
        case 3:
          setCurrentDemonstrationPageIndex(currentDemonstrationPageIndex - 1);
          setDemonstrationPageIndex(1);
          history.push(`/survey/demonstration`);
          break;
        default:
          setCurrentDemonstrationPageIndex(3);
          setDemonstrationPageIndex(2);
          history.push(`/survey/demonstration`);
          break;
      }
    } else if (history.location.pathname === "/survey/background") {
      setOpenDialog(true);
    } else if (history.location.pathname === "/survey/registration") {
      history.push(`/`);
    } else if (PageLocator === 1) {
      logSessionEvent("Previous", `Case1`, PageLocator);
      pushToBucket();
      setCurrentDemonstrationPageIndex(
        Math.min(REACT_APP_demonstration.length, 3)
      );
      switch (REACT_APP_demonstration.length) {
        case 0:
          history.push(`/survey/background`);
          break;

        case 1:
          setDemonstrationPageIndex(0);

          history.push(`/survey/demonstration`);
          break;
        case 2:
          setDemonstrationPageIndex(1);
          history.push(`/survey/demonstration`);
          break;
        case 3:
          setDemonstrationPageIndex(2);
          history.push(`/survey/demonstration`);
          break;
        default:
          setDemonstrationPageIndex(2);
          history.push(`/survey/demonstration`);
          break;
      }
    } else {
      logSessionEvent("Previous", `Case${PageLocator}`, PageLocator);
      pushToBucket();
      const newPageNumber = PageLocator - 1;
      setPageLocator(newPageNumber);
      history.push(`/survey/case${newPageNumber}`);
    }
  };
  const getParticipantId = async (e) => {
    e && e.preventDefault();
    if (
      country &&
      (degree.length > 0 || degreeOther) &&
      fieldOfExpertise.length > 0 &&
      termsOfUse
    ) {
      if (
        (notifications && !email) ||
        (notifications && !validateEmail(email)) ||
        (email && !validateEmail(email))
      ) {
        toastError(
          "Please provide your email address.",
          "top-center",
          "email-error"
        );
      } else {
        setRouteIsAllowed(true);
        let CaseOrder;
        if (REACT_APP_caseOrder && REACT_APP_caseOrder["cases"].length !== 0) {
          CaseOrder = await fetchCases(
            true,
            null,
            REACT_APP_caseOrder["cases"],
            REACT_APP_caseOrder["shuffle"]
          );
        } else
          CaseOrder = await fetchCases(
            false,
            `${rootDirectory}/gallery/cases/`,
            null,
            null
          ); 
        localStorage.clear();
        let uuid = uuidv4();
        copy(uuid);
        let ParticipantInfo = {
          ParticipantId: uuid,
          Name: name,
          EmailAddress: email,
          Country: country,
          Comments: comments,
          Degree: degreeOther ? [...degree, degreeOther] : degree,
          FieldOfExpertise: fieldOfExpertise,
          ActiveYears: parseInt(activeYears, 10),
          Tickbox1: termsOfUse,
          Tickbox2: notifications,
        };
        let SoftwareInfo = {
          SoftwareInfoTag: REACT_APP_general["softwareInfoTag"],
          Version: Version,
          OperatingSystem: getOs(),
          Browser: `${browserName} ${browserVersion}`,
          ScreenResolution: `${window.innerWidth} x ${window.innerHeight}`,
        };
        let SessionEvents = [
          {
            Location: "Registration",
            ButtonType: "Get participant ID",
            Timestamp: generateTimeStamp(),
          },
        ];
        let saveToBucket = {
          SoftwareInfo,
          ParticipantInfo,
          CaseOrder,
          SessionInfo: {
            SessionComplete: false,
          },

          CaseStudyAnswers: "",
          FeedbackFormAnswers: "",
          SessionEvents,
        };

        let jsonString = JSON.stringify(saveToBucket);
        let blob = generateBlobFromJson(jsonString);
        let fileRef = getFolderReference(
          `${rootDirectory}/responses/${uuid}.json`
        );
        fileRef.put(blob);
        localStorage.setItem(
          "ParticipantInfo",
          JSON.stringify(ParticipantInfo)
        );
        setRouteIsAllowed(true);

        localStorage.setItem("SessionEvents", JSON.stringify(SessionEvents));
        localStorage.setItem("SoftwareInfo", JSON.stringify(SoftwareInfo));
        localStorage.setItem("CaseOrder", JSON.stringify(CaseOrder));
        history.replace("/survey/background");
      }
    } else {
      toastError("Please verify mandatory fields.", "top-center", "req-error");
    }
  };

  return (
    <div
      className={
        history.location.pathname === "/survey/registration"
          ? "full-scroll-survey-wrapper-no-padding"
          : "full-scroll-survey-wrapper"
      }>
      <Modal
        className="modal"
        open={openDialog}
        onClose={handleDialogClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description">
        <ConfirmationDialog
          dialogQuestion={"Are you sure you want to go back?"}
          cancelText={"Cancel"}
          confirmText={"Yes"}
          onCancel={() => setOpenDialog(false)}
          onConfirm={() => {
            history.replace("/");
          }}
          onClick={() => {
            setOpenDialog(false);
          }}
        />
      </Modal>
      <Modal
        className="modal"
        open={openEndDialog}
        onClose={handleEndDialogClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description">
        <ConfirmationDialog
          dialogQuestion={"Do you want to submit your answers?"}
          cancelText={"Cancel"}
          confirmText={"Submit"}
          onCancel={() => setOpenEndDialog(false)}
          onConfirm={() => submitSurvey()}
          onClick={() => {
            setOpenEndDialog(false);
          }}
        />
      </Modal>
      {localStorage.length > 0 &&
      !pageIsRegistration &&
      !pageIsEndPage &&
      !pageIsHome ? (
        <Header
          leftLabel={`Participant ID: ${
            JSON.parse(localStorage.getItem("ParticipantInfo"))["ParticipantId"]
          }`}
          leftIcon1TooltipMessage="This is your participant ID. You can copy this ID to keep for later reference, as well as to be able to resume your survey in case of accidental exit before completion."
          leftIcon2TooltipMessage=" Copy to clipboard"
          leftIcon1ClassName="fa fa-info-circle form-tooltip"
          leftIcon2ClassName="fa fa-clone ml-3 form-tooltip"
          leftIcon1OnClick={() => {
            return;
          }}
          leftIcon2OnClick={() =>
            copyToClipboard(
              JSON.parse(localStorage.getItem("ParticipantInfo"))[
                "ParticipantId"
              ]
            )
          }
          rightLabel={
            history.location.pathname !== "/survey/end" && (
              <div className="survey-header">
                {history.location.pathname === "/survey/background" ? (
                  <span>{`${REACT_APP_general && REACT_APP_general["appName"]} |
                   ${REACT_APP_header && REACT_APP_header["labelBackground"]}
                  `}</span>
                ) : history.location.pathname === "/survey/demonstration" ? (
                  <span>{`${
                    REACT_APP_general && REACT_APP_general["appName"]
                  } | 
                  ${
                    REACT_APP_header && REACT_APP_header["labelDemonstration"]
                  }`}</span>
                ) : history.location.pathname ===
                  "/survey/summary-and-feedback" ? (
                  <span>{`${
                    REACT_APP_general && REACT_APP_general["appName"]
                  } | 
                  ${
                    REACT_APP_header &&
                    REACT_APP_header["labelSummaryAndFeedback"]
                  }`}</span>
                ) : history.location.pathname.includes("case") ? (
                  <span>{`${
                    REACT_APP_general && REACT_APP_general["appName"]
                  } | 
                  ${
                    REACT_APP_header && REACT_APP_header["labelCase"]
                  } | Case ${PageLocator}/${casesCount}`}</span>
                ) : (
                  <span></span>
                )}
              </div>
            )
          }
        />
      ) : (
        ""
      )}
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />
      <ToastContainer />
      <Switch>
        <ProtectedRoute
          routeIsAllowed={routeIsAllowed}
          path="/survey/summary-and-feedback"
          exact
          render={(props) => (
            <SummaryAndFeedback
              {...props}
              REACT_APP_summaryAndFeedback={REACT_APP_summaryAndFeedback}
            />
          )}
        />
        <ProtectedRoute
          routeIsAllowed={routeIsAllowed}
          path="/survey/end"
          exact
          render={(props) => <End {...props} REACT_APP_end={REACT_APP_end} />}
        />

        <ProtectedRoute
          routeIsAllowed={routeIsAllowed}
          path="/survey/background"
          exact
          render={(props) => (
            <Background
              {...props}
              totalPages={casesCount}
              REACT_APP_background={REACT_APP_background}
            />
          )}
        />
        <ProtectedRoute
          routeIsAllowed={routeIsAllowed}
          path="/survey/demonstration"
          exact
          render={(props) => (
            <Demonstration
              {...props}
              REACT_APP_demonstration={
                REACT_APP_demonstration[demonstrationPageIndex]
              }
            />
          )}
        />
        <Route
          path="/survey/registration"
          exact
          render={(props) => (
            <Registration
              {...props}
              onCountryChange={onCountryChange}
              onCommentsChange={onCommentsChange}
              handleDegreeChange={handleDegreeChange}
              handleOtherDegreeChange={handleOtherDegreeChange}
              onFieldOfExpertiseChange={onFieldOfExpertiseChange}
              onActiveYearsChange={onActiveYearsChange}
              setTermsOfUse={setTermsOfUse}
              setNotifications={setNotifications}
              disableRegistration={disableRegistration}
              getParticipantId={getParticipantId}
              onNameChange={onNameChange}
              onEmailChange={onEmailChange}
              REACT_APP_registration={REACT_APP_registration}
            />
          )}
        />
        <ProtectedRoute
          routeIsAllowed={routeIsAllowed}
          path={`/survey/case:id`}
          exact
          render={(props) => {
            let prefix = JSON.parse(localStorage.getItem("CaseOrder"))
              [PageLocator - 1].split("-")[0]
              .toLowerCase();
            return prefix === "video" ? (
              <CaseVideo
                {...props}
                totalCases={casesCount}
                caseId={PageLocator}
                REACT_APP_caseVideo={REACT_APP_caseVideo}
                REACT_APP_outputJson={REACT_APP_outputJson}
              />
            ) : prefix === "audio" ? (
              <CaseAudio
                {...props}
                totalCases={casesCount}
                caseId={PageLocator}
                REACT_APP_caseAudio={REACT_APP_caseAudio}
                REACT_APP_outputJson={REACT_APP_outputJson}
              />
            ) : prefix === "hybrid" ? (
              <CaseHybrid
                {...props}
                totalCases={casesCount}
                caseId={PageLocator}
                REACT_APP_caseHybrid={REACT_APP_caseHybrid}
                REACT_APP_outputJson={REACT_APP_outputJson}
              />
            ) : (
              <CaseImage
                {...props}
                totalCases={casesCount}
                caseId={PageLocator}
                REACT_APP_caseImage={REACT_APP_caseImage}
                REACT_APP_outputJson={REACT_APP_outputJson}
                REACT_APP_demonstration={
                  REACT_APP_demonstration[demonstrationPageIndex]
                }
              />
            );
          }}
        />
        <Route
          path="/survey/home"
          render={(props) => (
            <Home
              {...props}
              REACT_APP_home={REACT_APP_home}
              setRouteIsAllowed={setRouteIsAllowed}
            />
          )}
        />
      </Switch>

      <Footer
        label={REACT_APP_footer && REACT_APP_footer["label"]}
        icon1ClassName={REACT_APP_footer && REACT_APP_footer["icon1ClassName"]}
        icon2ClassName={REACT_APP_footer && REACT_APP_footer["icon2ClassName"]}
        footerIconUrl={REACT_APP_footer && REACT_APP_footer["footerIconUrl"]}
        icon1Url={REACT_APP_footer && REACT_APP_footer["icon1Url"]}
        icon2Url={REACT_APP_footer && REACT_APP_footer["icon2Url"]}
        leftButtonLabel="Previous"
        rightButtonLabel={rightButtonLabel}
        onLeftButtonClick={onLeftButtonClick}
        onRightButtonClick={onRightButtonClick}
        leftButtonClassName={leftButtonClassName}
        rightButtonClassName={rightButtonClassName}
        disableLeftButton={disableLeftButton}
        disableRightButton={disableRightButton}
      />
    </div>
  );
};

export default Survey;
