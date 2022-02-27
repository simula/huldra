import React from "react";
import GenericImageSection from "../minor-components/genericImageSection";
const CaseHybridColumnMiddle = ({
  className,
  title,
  text,
  textClassName,
  leftSectionClassName,
  leftSectionText,
  leftSectionTextClassName,
  leftSectionImageUrl,
  leftSectionImageAlternativeText,
  leftSectionImageClassName,
  leftSectionTitle,
  leftSectionButtonClassName,
  leftSectionButtonDisabled,
  leftSectionButtonHasIcon,
  leftSectionButtonIconClassName,
  leftSectionButtonId,
  leftSectionButtonlabel,
  leftSectionButtonOnClick,
  leftSectionHasButton,
  leftSectionImageHasRank,
  leftSectionImageRank,
  leftSectionImageOnClick,
  leftSectionTextWithIconsHasLeftIcon,
  leftSectionTextWithIconLeftIconClassName,
  leftSectionTextWithIconsLabel,
  leftSectionTextWithIconsHasRightIcon,
  leftSectionTextWithIconsRightIconClassName,
  leftSectionTextWithIconsClassName,
  leftSectionShowTextWithIcons,
  rightSectionClassName,
  rightSectionText,
  rightSectionTextClassName,
  rightSectionImageUrl,
  rightSectionImageAlternativeText,
  rightSectionImageClassName,
  rightSectionTitle,
  rightSectionButtonClassName,
  rightSectionButtonDisabled,
  rightSectionButtonHasIcon,
  rightSectionButtonIconClassName,
  rightSectionButtonId,
  rightSectionButtonlabel,
  rightSectionButtonOnClick,
  rightSectionHasButton,
  rightSectionImageHasRank,
  rightSectionImageRank,
  rightSectionImageOnClick,
  rightSectionTextWithIconsHasLeftIcon,
  rightSectionTextWithIconLeftIconClassName,
  rightSectionTextWithIconsLabel,
  rightSectionTextWithIconsHasRightIcon,
  rightSectionTextWithIconsRightIconClassName,
  rightSectionTextWithIconsClassName,
  rightSectionShowTextWithIcons,
}) => {
  return (
    <div className={className}>
      <h4>{title}</h4>
      <p className={textClassName}>{text}</p>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          width: "100%",
        }}>
        <GenericImageSection
          title={leftSectionTitle}
          imageClassName={leftSectionImageClassName}
          hasButton={leftSectionHasButton}
          className={leftSectionClassName}
          text={leftSectionText}
          textClassName={leftSectionTextClassName}
          imageUrl={leftSectionImageUrl}
          imageAlternativeText={leftSectionImageAlternativeText}
          buttonClassName={leftSectionButtonClassName}
          buttonDisabled={leftSectionButtonDisabled}
          buttonHasIcon={leftSectionButtonHasIcon}
          buttonIconClassName={leftSectionButtonIconClassName}
          buttonId={leftSectionButtonId}
          buttonlabel={leftSectionButtonlabel}
          buttonOnClick={leftSectionButtonOnClick}
          imageHasRank={leftSectionImageHasRank}
          imageRank={leftSectionImageRank}
          imageOnClick={leftSectionImageOnClick}
        />
        <GenericImageSection
          title={rightSectionTitle}
          imageClassName={rightSectionImageClassName}
          hasButton={rightSectionHasButton}
          className={rightSectionClassName}
          text={rightSectionText}
          textClassName={rightSectionTextClassName}
          imageUrl={rightSectionImageUrl}
          imageAlternativeText={rightSectionImageAlternativeText}
          buttonClassName={rightSectionButtonClassName}
          buttonDisabled={rightSectionButtonDisabled}
          buttonHasIcon={rightSectionButtonHasIcon}
          buttonIconClassName={rightSectionButtonIconClassName}
          buttonId={rightSectionButtonId}
          buttonlabel={rightSectionButtonlabel}
          buttonOnClick={rightSectionButtonOnClick}
          imageHasRank={rightSectionImageHasRank}
          imageRank={rightSectionImageRank}
          imageOnClick={rightSectionImageOnClick}
        />
      </div>
    </div>
  );
};

export default CaseHybridColumnMiddle;
