import React from "react";
import GenericAudioSection from "../minor-components/genericAudioSection";
const CaseAudioColumnLeft = ({
  className,
  title,
  text,
  textClassName,
  sectionClassName,
  sectionText,
  sectionTextClassName,
  sectionImageUrl,
  sectionImageAlternativeText,
  sectionAudioClassName,
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
  sectionAudioBUrl,
  sectionAudioAUrl,
  sectionAudioHeight,
  sectionAudioWidth,
  rightSectionAudioLabel,
  leftSectionAudioLabel,
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
        <GenericAudioSection
          hasButton={sectionHasButton}
          className={sectionClassName}
          text={sectionText}
          textClassName={sectionTextClassName}
          imageUrl={sectionImageUrl}
          imageAlternativeText={sectionImageAlternativeText}
          audioClassName={sectionAudioClassName}
          title={sectionTitle}
          buttonClassName={sectionButtonClassName}
          buttonDisabled={sectionButtonDisabled}
          buttonHasIcon={sectionButtonHasIcon}
          buttonIconclassName={sectionButtonIconClassName}
          buttonId={sectionButtonId}
          buttonLabel={sectionButtonlabel}
          buttonOnClick={leftSectionButtonOnClick}
          imageHasRank={sectionImageHasRank}
          imageRank={sectionImageRank}
          audioUrl={sectionAudioAUrl}
          audioHeight={sectionAudioHeight}
          audioWidth={sectionAudioWidth}
          audioLabel={leftSectionAudioLabel}
        />
        <GenericAudioSection
          hasButton={sectionHasButton}
          className={sectionClassName}
          text={sectionText}
          textClassName={sectionTextClassName}
          imageUrl={sectionImageUrl}
          imageAlternativeText={sectionImageAlternativeText}
          audioClassName={sectionAudioClassName}
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
          audioUrl={sectionAudioBUrl}
          audioHeight={sectionAudioHeight}
          audioWidth={sectionAudioWidth}
          audioLabel={rightSectionAudioLabel}
        />
      </div>
    </div>
  );
};

export default CaseAudioColumnLeft;
