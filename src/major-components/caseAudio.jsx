import React, { useEffect, useState, useContext } from "react";
import CaseAudioColumnLeft from "./caseAudioColumnLeft";
import CaseAudioColumnRight from "./caseAudioColumnRight";
import { AppContext } from "../context/appContext";

const CaseAudio = ({ REACT_APP_caseAudio, caseId, totalCases }) => {
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  const pagesOrder = JSON.parse(
    localStorage.getItem("CaseOrder") 
  );
  const { disableNextButton, setDisableNextButton } = useContext(AppContext);
  useEffect(() => {
    localStorage.setItem("PageLocator", caseId);
    const CaseStudyAnswers = JSON.parse(
      localStorage.getItem("CaseStudyAnswers")
    );
    if (CaseStudyAnswers && CaseStudyAnswers[caseId]) {
      setDisableNextButton(false);

      if (CaseStudyAnswers[caseId] && CaseStudyAnswers[caseId][0] === "A") {
        setFirst("A");
        setSecond("B");
      } else if (
        CaseStudyAnswers[caseId] &&
        CaseStudyAnswers[caseId][0] === "B"
      ) {
        setFirst("B");
        setSecond("A");
      }
    } else {
      setFirst("");
      setSecond("");
      setDisableNextButton(true);
    }
  }, [caseId, disableNextButton, setDisableNextButton]);

  const choiceA = `/gallery/cases/${pagesOrder[caseId - 1]}/${
    pagesOrder[caseId - 1]
  }-a.mp3`;
  const choiceB = `/gallery/cases/${pagesOrder[caseId - 1]}/${
    pagesOrder[caseId - 1]
  }-b.mp3`;
  const selectAsFirst = (choice) => {
    const CaseStudyAnswers = JSON.parse(
      localStorage.getItem("CaseStudyAnswers")
    );
    const newAnswers = { ...CaseStudyAnswers };

    if (choice === "audio A") {
      newAnswers[caseId] = ["A", "B"];
      setFirst("A");
      setSecond("B");
    } else {
      newAnswers[caseId] = ["B", "A"];
      setFirst("B");
      setSecond("A");
    }
    localStorage.setItem("CaseStudyAnswers", JSON.stringify(newAnswers));
    setDisableNextButton(false);
  };
  return (
    <div className="sections-wrapper">
      <CaseAudioColumnLeft
        title={`${REACT_APP_caseAudio["caseAudioColumnLeft"].label} ${caseId}/${totalCases}`}
        className="survey-box-video-left"
        textClassName="background-text-content"
        sectionAudioAUrl={choiceA}
        sectionAudioBUrl={choiceB}
        sectionAudioHeight={
          REACT_APP_caseAudio["caseAudioColumnLeft"].sectionAudioHeight
        }
        sectionAudioWidth={
          REACT_APP_caseAudio["caseAudioColumnLeft"].sectionAudioWidth
        }
        sectionAudioClassName="video"
        rightSectionAudioLabel={
          REACT_APP_caseAudio["caseAudioColumnLeft"].rightSectionAudioLabel
        }
        leftSectionAudioLabel={
          REACT_APP_caseAudio["caseAudioColumnLeft"].leftSectionAudioLabel
        }
        rightSectionButtonOnClick={() => {
          selectAsFirst("audio B");
        }}
        leftSectionButtonOnClick={() => {
          selectAsFirst("audio A");
        }}
        sectionButtonlabel={
          REACT_APP_caseAudio["caseAudioColumnLeft"].sectionButtonlabel
        }
        sectionButtonClassName="btn control"
        sectionHasButton={true}
      />
      <CaseAudioColumnRight
        className="survey-box-video-right"
        title={REACT_APP_caseAudio["caseAudioColumnRight"].title}
        text={REACT_APP_caseAudio["caseAudioColumnRight"].text}
        textClassName="background-text-content"
        topSectionImageHasRank={true}
        topSectionImageRank={1}
        topSectionImageClassName="scaled-image-fit-height"
        topSectionClassName="generic-image-section"
        bottomSectionClassName="generic-image-section"
        bottomSectionImageHasRank={true}
        bottomSectionImageRank={2}
        bottomSectionImageClassName="scaled-image-fit-height"
        topSectionTextRankClassName="video-text-rank-section"
        bottomSectionTextRankClassName="video-text-rank-section"
        topSectionImageHasTextRank={true}
        topSectionImageRankText={first}
        bottomSectionImageHasTextRank={true}
        bottomSectionImageRankText={second}
      />
    </div>
  );
};

export default CaseAudio;
