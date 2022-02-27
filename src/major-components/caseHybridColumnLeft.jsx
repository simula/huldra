import React from "react";
import GenericVideoSection from "../minor-components/genericVideoSection";
const CaseHybridColumnLeft = ({
  className,
  title,
  text,
  textClassName,
  sectionVideoUrl,
  sectionClassName,
  sectionText,
  sectionTextClassName,
  sectionImageUrl,
  sectionImageAlternativeText,
  sectionImageClassName,
  sectionButtonClassName,
  sectionButtonDisabled,
  sectionButtonHasIcon,
  sectionButtonIconClassName,
  sectionButtonId,
  sectionButtonlabel,
  sectionButtonOnClick,
  sectionHasButton,
  sectionImageRank,
  sectionImageHasRank,
}) => {
  return (
    <div className={className}>
      <h4>{title}</h4>
      <p className={textClassName}>{text}</p>
      <div className={"video-section-centered"}>
        <GenericVideoSection
          className={"video-section-centered"}
          videoClassName={"video"}
          hasButton={false}
          videoUrl={sectionVideoUrl}
          videoWidth="400px"
        />
      </div>
    </div>
  );
};

export default CaseHybridColumnLeft;
