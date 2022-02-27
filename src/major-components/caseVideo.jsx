import React, { useEffect, useState, useContext } from "react";
import CaseVideoColumnLeft from "./caseVideoColumnLeft";
import CaseVideoColumnRight from "./caseVideoColumnRight";
import { AppContext } from "../context/appContext";

const CaseVideo = ({ REACT_APP_caseVideo, caseId, totalCases }) => {
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
  }-a.mp4`;
  const choiceB = `/gallery/cases/${pagesOrder[caseId - 1]}/${
    pagesOrder[caseId - 1]
  }-b.mp4`;
  const selectAsFirst = (choice) => {
    const CaseStudyAnswers = JSON.parse(
      localStorage.getItem("CaseStudyAnswers")
    );
    const newAnswers = { ...CaseStudyAnswers };

    if (choice === "video A") {
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
      <CaseVideoColumnLeft
        title={`${REACT_APP_caseVideo["caseVideoColumnLeft"].label} ${caseId}/${totalCases}`}
        className="survey-box-video-left"
        textClassName="background-text-content"
        sectionVideoAUrl={choiceA}
        sectionVideoBUrl={choiceB}
        sectionVideoHeight={
          REACT_APP_caseVideo["caseVideoColumnLeft"].sectionVideoHeight
        }
        sectionVideoWidth={
          REACT_APP_caseVideo["caseVideoColumnLeft"].sectionVideoWidth
        }
        sectionVideoClassName="video"
        rightSectionVideoLabel={
          REACT_APP_caseVideo["caseVideoColumnLeft"].rightSectionVideoLabel
        }
        leftSectionVideoLabel={
          REACT_APP_caseVideo["caseVideoColumnLeft"].leftSectionVideoLabel
        }
        rightSectionButtonOnClick={() => {
          selectAsFirst("video B");
        }}
        leftSectionButtonOnClick={() => {
          selectAsFirst("video A");
        }}
        sectionButtonlabel={
          REACT_APP_caseVideo["caseVideoColumnLeft"].sectionButtonlabel
        }
        sectionButtonClassName="btn control"
        sectionHasButton={true}
      />
      <CaseVideoColumnRight
        className="survey-box-video-right"
        title={REACT_APP_caseVideo["caseVideoColumnRight"].title}
        text={REACT_APP_caseVideo["caseVideoColumnRight"].text}
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

export default CaseVideo;
