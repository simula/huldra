import React from "react";
import GenericImageSection from "../minor-components/genericImageSection";
const CaseImageColumnRight = ({
  className,
  title,
  text,
  textClassName,
  topSectionClassName,
  topSectionText,
  topSectionTextClassName,
  topSectionImageUrl,
  topSectionImageAlternativeText,
  topSectionImageClassName,
  topSectionTitle,
  topSectionButtonClassName,
  topSectionButtonDisabled,
  topSectionButtonHasIcon,
  topSectionButtonIconClassName,
  topSectionButtonId,
  topSectionButtonlabel,
  topSectionButtonOnClick,
  topSectionHasButton,
  topSectionImageHasRank,
  topSectionImageRank,
  bottomSectionClassName,
  bottomSectionText,
  bottomSectionTextClassName,
  bottomSectionImageUrl,
  bottomSectionImageAlternativeText,
  bottomSectionImageClassName,
  bottomSectionTitle,
  bottomSectionButtonClassName,
  bottomSectionButtonDisabled,
  bottomSectionButtonHasIcon,
  bottomSectionButtonIconClassName,
  bottomSectionButtonId,
  bottomSectionButtonlabel,
  bottomSectionButtonOnClick,
  bottomSectionHasButton,
  bottomSectionImageHasRank,
  bottomSectionImageRank,
}) => {
  return (
    <div className={className}>
      <h4>{title}</h4>
      <p className={textClassName}>{text}</p>
      <div
        className="ranking-wrapper"
      >
        <GenericImageSection
          title={topSectionTitle}
          imageClassName={topSectionImageClassName}
          hasButton={topSectionHasButton}
          className={topSectionClassName}
          text={topSectionText}
          textClassName={topSectionTextClassName}
          imageUrl={topSectionImageUrl}
          imageAlternativeText={topSectionImageAlternativeText}
          buttonClassName={topSectionButtonClassName}
          buttonDisabled={topSectionButtonDisabled}
          buttonHasIcon={topSectionButtonHasIcon}
          buttonIconClassName={topSectionButtonIconClassName}
          buttonId={topSectionButtonId}
          buttonlabel={topSectionButtonlabel}
          buttonOnClick={topSectionButtonOnClick}
          imageHasRank={topSectionImageHasRank}
          imageRank={topSectionImageRank}
        />
        <GenericImageSection
          title={bottomSectionTitle}
          imageClassName={bottomSectionImageClassName}
          hasButton={bottomSectionHasButton}
          className={bottomSectionClassName}
          text={bottomSectionText}
          textClassName={bottomSectionTextClassName}
          imageUrl={bottomSectionImageUrl}
          imageAlternativeText={bottomSectionImageAlternativeText}
          buttonClassName={bottomSectionButtonClassName}
          buttonDisabled={bottomSectionButtonDisabled}
          buttonHasIcon={bottomSectionButtonHasIcon}
          buttonIconClassName={bottomSectionButtonIconClassName}
          buttonId={bottomSectionButtonId}
          buttonlabel={bottomSectionButtonlabel}
          buttonOnClick={bottomSectionButtonOnClick}
          imageHasRank={bottomSectionImageHasRank}
          imageRank={bottomSectionImageRank}
        />
      </div>
    </div>
  );
};

export default CaseImageColumnRight;
