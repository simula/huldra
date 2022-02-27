import React from "react";
import GenericVideoSection from "../minor-components/genericVideoSection";
const CaseVideoColumnLeft = ({
  className,
  title,
  text,
  textClassName,
  sectionClassName,
  sectionText,
  sectionTextClassName,
  sectionImageUrl,
  sectionImageAlternativeText,
  sectionVideoClassName,
  sectionTitle,
  sectionButtonClassName,
  sectionButtonDisabled,
  sectionButtonHasIcon,
  sectionButtonIconClassName,
  sectionButtonId,
  sectionButtonlabel,
  sectionHasButton,
  sectionImageRank,
  sectionImageHasRank,
  sectionVideoBUrl,
  sectionVideoAUrl,
  sectionVideoHeight,
  sectionVideoWidth,
  rightSectionVideoLabel,
  leftSectionVideoLabel,
  rightSectionButtonOnClick,
  leftSectionButtonOnClick,
}) => {
  return (
    <div className={className}>
      <h4>{title}</h4>
      <p className={textClassName}>{text}</p>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "center",
          justifySelf: "center",
        }}>
        <GenericVideoSection
          className={sectionClassName}
          text={sectionText}
          textClassName={sectionTextClassName}
          imageUrl={sectionImageUrl}
          imageAlternativeText={sectionImageAlternativeText}
          videoClassName={sectionVideoClassName}
          title={sectionTitle}
          buttonClassName={sectionButtonClassName}
          buttonDisabled={sectionButtonDisabled}
          buttonHasIcon={sectionButtonHasIcon}
          buttonIconclassName={sectionButtonIconClassName}
          buttonId={sectionButtonId}
          buttonLabel={sectionButtonlabel}
          buttonOnClick={leftSectionButtonOnClick}
          hasButton={sectionHasButton}
          imageHasRank={sectionImageHasRank}
          imageRank={sectionImageRank}
          videoUrl={sectionVideoAUrl}
          videoHeight={sectionVideoHeight}
          videoWidth={sectionVideoWidth}
          videoLabel={leftSectionVideoLabel}
        />
        <GenericVideoSection
          hasButton={sectionHasButton}
          className={sectionClassName}
          text={sectionText}
          textClassName={sectionTextClassName}
          imageUrl={sectionImageUrl}
          imageAlternativeText={sectionImageAlternativeText}
          videoClassName={sectionVideoClassName}
          title={sectionTitle}
          buttonClassName={sectionButtonClassName}
          buttonDisabled={sectionButtonDisabled}
          buttonHasIcon={sectionButtonHasIcon}
          buttonIconclassName={sectionButtonIconClassName}
          buttonId={sectionButtonId}
          buttonLabel={sectionButtonlabel}
          buttonOnClick={rightSectionButtonOnClick}
          imageHasRank={sectionImageHasRank}
          imageRank={sectionImageRank}
          videoUrl={sectionVideoBUrl}
          videoHeight={sectionVideoHeight}
          videoWidth={sectionVideoWidth}
          videoLabel={rightSectionVideoLabel}
        />
      </div>
    </div>
  );
};

export default CaseVideoColumnLeft;
