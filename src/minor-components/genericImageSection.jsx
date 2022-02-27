import React from "react";
import GenericButton from "./genericButton";
import RankedImage from "./rankedImage";
import TextWithIcons from "./textWithIcons";

const GenericImageSection = ({
  className,
  text,
  textClassName,
  imageUrl,
  imageAlternativeText,
  imageClassName,
  title,
  buttonClassName,
  buttonDisabled,
  buttonHasIcon,
  buttonIconClassName,
  buttonId,
  buttonlabel,
  buttonOnClick,
  hasButton = false,
  imageRank,
  imageHasRank,
  imageHasTextRank,
  imageRankText,
  textRankClassName,
  imageOnClick,
  textWithIconsHasLeftIcon,
  textWithIconLeftIconClassName,
  textWithIconsLabel,
  textWithIconsHasRightIcon,
  textWithIconsRightIconClassName,
  textWithIconsClassName,
  showTextWithIcons = false,
}) => {
  return (
    <div className={className}>
      <h5>{title}</h5>
      {text && <p className={textClassName}>{text}</p>}{" "}
      <RankedImage
        path={imageUrl}
        alternativeText={imageAlternativeText}
        className={imageClassName}
        rank={imageRank}
        hasRank={imageHasRank}
        onClick={imageOnClick}
        hasTextRank={imageHasTextRank}
        rankText={imageRankText}
        rankTextSectionClassName={textRankClassName}
      />
      {hasButton && (
        <div
          style={{
            marginTop: "0.8em",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}>
          {" "}
          <GenericButton
            className={buttonClassName}
            disabled={buttonDisabled}
            hasIcon={buttonHasIcon}
            iconClassName={buttonIconClassName}
            id={buttonId}
            label={buttonlabel}
            onClick={buttonOnClick}
          />
          {showTextWithIcons && (
            <TextWithIcons
              hasLeftIcon={textWithIconsHasLeftIcon}
              leftIconClassName={textWithIconLeftIconClassName}
              label={textWithIconsLabel}
              hasRightIcon={textWithIconsHasRightIcon}
              rightIconClassName={textWithIconsRightIconClassName}
              className={textWithIconsClassName}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default GenericImageSection;
