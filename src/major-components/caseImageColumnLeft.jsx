import React from "react";
import GenericImageSection from "../minor-components/genericImageSection";
const CaseImageColumnleft = ({
  className,
  title,
  text,
  textClassName,
  sectionClassName,
  sectionText,
  sectionTextClassName,
  sectionImageUrl,
  sectionImageAlternativeText,
  sectionImageClassName,
  sectionTitle,
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
      <div>
        <GenericImageSection
          className={sectionClassName}
          text={sectionText}
          textClassName={sectionTextClassName}
          imageUrl={sectionImageUrl}
          imageAlternativeText={sectionImageAlternativeText}
          imageClassName={sectionImageClassName}
          title={sectionTitle}
          buttonClassName={sectionButtonClassName}
          buttonDisabled={sectionButtonDisabled}
          buttonHasIcon={sectionButtonHasIcon}
          buttonIconclassName={sectionButtonIconClassName}
          buttonId={sectionButtonId}
          buttonLabel={sectionButtonlabel}
          buttonOnCLick={sectionButtonOnClick}
          hasButton={sectionHasButton}
          imageHasRank={sectionImageHasRank}
          imageRank={sectionImageRank}
        />
      </div>
    </div>
  );
};

export default CaseImageColumnleft;
