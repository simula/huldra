import React, { useContext } from "react";
import { AppContext } from "../context/appContext";
import _ from "lodash";
import RankedImage from "../minor-components/rankedImage";

const Summary = ({
  highlightClassName = "option",
  title,
  text,
  label,
  imagePlaceholderIconPath,
  videoPlaceholderIconPath,
  audioPlaceholderIconPath,
}) => {
  const { casesCount } = useContext(AppContext);
  const pagesOrder = JSON.parse(localStorage.getItem("CaseOrder"));

  return (
    <div className="answers-wrapper">
      <h3>{title}</h3>
      <div className="summary-and-feedback-text-content">{text}</div>
      <div className="headers">
        <p className="case-header">{label}</p>
        <p className="case-header">A</p>
        <p className="case-header">B</p>
      </div>

      {_.range(1, casesCount + 1)
        .map((item) => parseInt(item, 10))
        .map((item) => {
          let casePrefix = pagesOrder[item - 1].split("-")[0].toLowerCase();
          let thumbnailPathSingle = `/gallery/cases/${pagesOrder[item - 1]}/${
            pagesOrder[item - 1]
          }-thumbnail.png`;
          let thumbnailPathA = `/gallery/cases/${pagesOrder[item - 1]}/${
            pagesOrder[item - 1]
          }-a-thumbnail.png`;
          let thumbnailPathB = `/gallery/cases/${pagesOrder[item - 1]}/${
            pagesOrder[item - 1]
          }-b-thumbnail.png`;

          return (
            <div key={item} className="case-answer">
              <div className={highlightClassName}>
                <span className="case-label">{item}</span>
              </div>
              <div className={highlightClassName}>
                <RankedImage
                  path={
                    casePrefix === "video"
                      ? `/gallery/empty-white.png`
                      : casePrefix === "audio"
                      ? `/gallery/empty-white.png`
                      : casePrefix === "hybrid"
                      ? /* videoPlaceholderIconPath */ thumbnailPathSingle
                      : /* ? videoPlaceholderIconPath */
                        `/gallery/cases/${pagesOrder[item - 1]}/${
                          pagesOrder[item - 1]
                        }.png`
                  }
                  alternativeText={`case`}
                  wrapperClassName="ranked-image-wrapper-summary"
                  className="scaled-image-fit-height-summary"
                />
              </div>
              <div className={highlightClassName}>
                <RankedImage
                  path={
                    casePrefix === "video"
                      ? /* `${videoPlaceholderIconPath}` */ thumbnailPathA
                      : casePrefix === "audio"
                      ? `${audioPlaceholderIconPath}`
                      : casePrefix === "hybrid"
                      ? `${`/gallery/cases/${pagesOrder[item - 1]}/${
                          pagesOrder[item - 1]
                        }-a.png`}`
                      : `/gallery/cases/${pagesOrder[item - 1]}/${
                          pagesOrder[item - 1]
                        }-a.png`
                  }
                  alternativeText={`A`}
                  wrapperClassName="ranked-image-wrapper-summary"
                  className="scaled-image-fit-height-summary"
                />
              </div>
              <div className={highlightClassName}>
                <RankedImage
                  path={
                    casePrefix === "video"
                      ? /* `${videoPlaceholderIconPath}` */ thumbnailPathB
                      : casePrefix === "audio"
                      ? `${audioPlaceholderIconPath}`
                      : casePrefix === "hybrid"
                      ? `${`/gallery/cases/${pagesOrder[item - 1]}/${
                          pagesOrder[item - 1]
                        }-b.png`}`
                      : `/gallery/cases/${pagesOrder[item - 1]}/${
                          pagesOrder[item - 1]
                        }-b.png`
                  }
                  alternativeText={`B`}
                  wrapperClassName="ranked-image-wrapper-summary"
                  className="scaled-image-fit-height-summary"
                />
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Summary;
