import React, { useEffect, useContext, useState } from "react";
import { toastInfo } from "../utils/toast";
import { AppContext } from "../context/appContext";
import {
  fetchJsonAttributeValue,
  getFirebaseApp,
  listFiles,
} from "../utils/firebase";
import { getCaseJsonFile } from "../utils/urlHandler";
import CaseImageColumnMiddle from "./caseImageColumnMiddle";
import CaseImageColumnleft from "./caseImageColumnLeft";
import CaseImageColumnRight from "./caseImageColumnRight";
import Modal from "@material-ui/core/Modal";
import Popup from "../minor-components/popup";

const CaseImage = ({
  caseId,
  totalCases,
  REACT_APP_caseImage,
}) => {
  const [caseDescription, setCaseDescription] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [openedChoiceA, setOpenedChoiceA] = useState(false);
  const [openedChoiceB, setOpenedChoiceB] = useState(false);
  const [openChoiceA, setOpenChoiceA] = useState(false);
  const [openChoiceB, setOpenChoiceB] = useState(false);
  const [casePageType] = useState("ranking"); 
  const [galleryImages, setGalleryImages] = useState([]);
  const { rootDirectory, disableNextButton, setDisableNextButton } =
    useContext(AppContext);
  const empty = `/gallery/empty.png`;
  const [first, setFirst] = useState(empty);
  const [second, setSecond] = useState(empty);
  const pagesOrder = JSON.parse(
    localStorage.getItem("CaseOrder")
  );
  const choiceAHighRes = `/gallery/cases/${pagesOrder[caseId - 1]}/${
    pagesOrder[caseId - 1]
  }-a.png`;
  const choiceBHighRes = `/gallery/cases/${pagesOrder[caseId - 1]}/${
    pagesOrder[caseId - 1]
  }-b.png`;
  const choiceAThumbnail = `/gallery/cases/${pagesOrder[caseId - 1]}/${
    pagesOrder[caseId - 1]
  }-a.png`;
  const choiceBThumbnail = `/gallery/cases/${pagesOrder[caseId - 1]}/${
    pagesOrder[caseId - 1]
  }-b.png`;
  const originalThumbnail = `/gallery/cases/${pagesOrder[caseId - 1]}/${
    pagesOrder[caseId - 1]
  }.png`;
  const originalHighRes = `/gallery/cases/${pagesOrder[caseId - 1]}/${
    pagesOrder[caseId - 1]
  }.png`;
  useEffect(() => {
    setDisableNextButton(true);
    setSubscribed(true);
    getFirebaseApp();
    setOpenedChoiceA(false);
    setOpenedChoiceB(false);
    const CaseStudyAnswers = JSON.parse(
      localStorage.getItem("CaseStudyAnswers")
    );
    if (CaseStudyAnswers && CaseStudyAnswers[caseId]) {
      setDisableNextButton(false);

      if (CaseStudyAnswers[caseId] && CaseStudyAnswers[caseId][0] === "A") {
        setFirst(choiceAThumbnail);
        setSecond(choiceBThumbnail);
      } else if (
        CaseStudyAnswers[caseId] &&
        CaseStudyAnswers[caseId][0] === "B"
      ) {
        setFirst(choiceBThumbnail);
        setSecond(choiceAThumbnail);
      }
    } else {
      setFirst(empty);
      setSecond(empty);
      setDisableNextButton(true);
    }

    (async () => {
      let gallery = await listFiles(
        `/gallery/cases/${pagesOrder[caseId - 1]}/`,
        REACT_APP_caseImage["caseImageColumnMiddle"].popupB["gallerySubstring"]
      );
      setGalleryImages(gallery);

      const caseUuid = pagesOrder[caseId - 1];
      setCaseDescription(
        await fetchJsonAttributeValue(
          getCaseJsonFile(rootDirectory, caseUuid),
          "description"
        )
      );
    })();
    localStorage.setItem("PageLocator", caseId);
    return () => {
      setSubscribed(false);
    };
  }, [
    caseId,
    disableNextButton,
    setDisableNextButton,
    REACT_APP_caseImage,
    choiceAThumbnail,
    choiceBThumbnail,
    empty,
    pagesOrder,
    rootDirectory,
  ]);

  const selectAsFirst = (choice) => {
    if (
      first === empty &&
      (openedChoiceA === false || openedChoiceB === false)
    ) {
      toastInfo("Please see both explanations.", "top-center", "select-error");
    } else if (
      first !== empty ||
      (openedChoiceA === true && openedChoiceB === true)
    ) {
      const CaseStudyAnswers = JSON.parse(
        localStorage.getItem("CaseStudyAnswers")
      );
      const newAnswers = { ...CaseStudyAnswers };
      if (choice === "choiceA") {
        newAnswers[caseId] = ["A", "B"];
        setFirst(choiceAThumbnail);
        setSecond(choiceBThumbnail);
      } else {
        newAnswers[caseId] = ["B", "A"];
        setFirst(choiceBThumbnail);
        setSecond(choiceAThumbnail);
      }

      localStorage.setItem("CaseStudyAnswers", JSON.stringify(newAnswers));
      setDisableNextButton(false);
    }
  };

  return (
    <div className="sections-wrapper">
      <CaseImageColumnleft
        title={`${REACT_APP_caseImage["caseImageColumnLeft"].label} ${caseId}/${totalCases}`}
        text={caseDescription}
        sectionImageUrl={originalHighRes}
        className="survey-box"
        textClassName="background-text-content"
        sectionImageClassName="case-wrapper"
        sectionButtonClassName="btn control"
      />
      <CaseImageColumnMiddle
        className="survey-box"
        title={REACT_APP_caseImage["caseImageColumnMiddle"].title}
        text={REACT_APP_caseImage["caseImageColumnMiddle"].text}
        textClassName="background-text-content"
        leftSectionClassName="caseAlternativesSection"
        leftSectionImageUrl={choiceAThumbnail}
        leftSectionImageClassName="explanation-background-image"
        leftSectionTitle={
          REACT_APP_caseImage["caseImageColumnMiddle"].leftSectionTitle
        }
        leftSectionButtonClassName="btn control"
        leftSectionButtonlabel={
          REACT_APP_caseImage["caseImageColumnMiddle"].leftSectionButtonlabel
        }
        leftSectionImageOnClick={() => {
          selectAsFirst("choiceA");
        }}
        leftSectionButtonOnClick={() => {
          setOpenChoiceA(true);
          setOpenedChoiceA(true);
        }}
        leftSectionHasButton={true}
        leftSectionTextWithIconsHasLeftIcon={false}
        leftSectionTextWithIconsLabel={
          REACT_APP_caseImage["caseImageColumnMiddle"]
            .leftSectionTextWithIconsLabel
        }
        leftSectionTextWithIconsHasRightIcon={true}
        leftSectionTextWithIconsRightIconClassName="fa fa-check viewed"
        leftSectionShowTextWithIcons={openedChoiceA === true || first !== empty}
        leftSectionTextWithIconsClassName="top-margined"
        rightSectionClassName="caseAlternativesSection"
        rightSectionButtonClassName="btn control"
        rightSectionButtonlabel={
          REACT_APP_caseImage["caseImageColumnMiddle"].rightSectionButtonlabel
        }
        rightSectionImageUrl={choiceBThumbnail}
        rightSectionImageClassName="explanation-background-image"
        rightSectionTitle={
          REACT_APP_caseImage["caseImageColumnMiddle"].rightSectionTitle
        }
        rightSectionButtonOnClick={() => {
          setOpenChoiceB(true);
          setOpenedChoiceB(true);
        }}
        rightSectionHasButton={true}
        rightSectionImageOnClick={() => {
          selectAsFirst("choiceB");
        }}
        rightSectionTextWithIconsHasLeftIcon={false}
        rightSectionTextWithIconsLabel={
          REACT_APP_caseImage["caseImageColumnMiddle"]
            .rightSectionTextWithIconsLabel
        }
        rightSectionTextWithIconsHasRightIcon={true}
        rightSectionTextWithIconsRightIconClassName="fa fa-check viewed"
        rightSectionShowTextWithIcons={
          openedChoiceB === true || first !== empty
        }
        rightSectionTextWithIconsClassName="top-margined"
      />
      <Modal
        className="modal"
        open={openChoiceA}
        onClose={() => setOpenChoiceA(false)}>
        <Popup
          onCloseIconClick={() => setOpenChoiceA(false)}
          mainTitle={
            REACT_APP_caseImage["caseImageColumnMiddle"].popupA["mainTitle"]
          }
          leftImageHighResUrl={originalHighRes}
          leftImageThumbnailUrl={originalThumbnail}
          leftImageTitle={
            REACT_APP_caseImage["caseImageColumnMiddle"].popupA[
              "leftImageTitle"
            ]
          }
          rightImageHighResUrl={choiceAHighRes}
          rightImageThumbnailUrl={choiceAThumbnail}
          rightImageTitle={
            REACT_APP_caseImage["caseImageColumnMiddle"].popupA[
              "rightImageTitle"
            ]
          }
          descriptionTitle={
            REACT_APP_caseImage["caseImageColumnMiddle"].popupA[
              "descriptionTitle"
            ]
          }
          descriptionText={
            REACT_APP_caseImage["caseImageColumnMiddle"].popupA[
              "descriptionText"
            ]
          }
          popupType="withoutGallery"
        />
      </Modal>
      <Modal
        className="modal"
        open={openChoiceB}
        onClose={() => setOpenChoiceB(false)}>
        <Popup
          onCloseIconClick={() => setOpenChoiceB(false)}
          mainTitle={
            REACT_APP_caseImage["caseImageColumnMiddle"].popupB["mainTitle"]
          }
          leftImageHighResUrl={originalHighRes}
          leftImageThumbnailUrl={originalThumbnail}
          leftImageTitle={
            REACT_APP_caseImage["caseImageColumnMiddle"].popupB[
              "leftImageTitle"
            ]
          }
          rightImageHighResUrl={choiceBHighRes}
          rightImageThumbnailUrl={choiceBThumbnail}
          rightImageTitle={
            REACT_APP_caseImage["caseImageColumnMiddle"].popupB[
              "rightImageTitle"
            ]
          }
          descriptionTitle={
            REACT_APP_caseImage["caseImageColumnMiddle"].popupB[
              "descriptionTitle"
            ]
          }
          descriptionText={
            REACT_APP_caseImage["caseImageColumnMiddle"].popupB[
              "descriptionText"
            ]
          }
          popupType="withGallery"
          galleryImages={galleryImages}
        />
      </Modal>
      {casePageType === "ranking" && (
        <CaseImageColumnRight
          className="survey-box"
          title={
            REACT_APP_caseImage &&
            REACT_APP_caseImage["caseImageColumnRight"].title
          }
          text={
            REACT_APP_caseImage &&
            REACT_APP_caseImage["caseImageColumnRight"].text
          }
          textClassName="background-text-content"
          topSectionClassName="generic-image-section"
          topSectionImageUrl={first}
          topSectionImageClassName="scaled-image-fit-height "
          topSectionImageHasRank={true}
          topSectionImageRank={1}
          bottomSectionClassName="generic-image-section"
          bottomSectionImageUrl={second}
          bottomSectionImageClassName="scaled-image-fit-height "
          bottomSectionImageHasRank={true}
          bottomSectionImageRank={2}
        />
      )}
    </div>
  );
};

export default CaseImage;
