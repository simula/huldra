import React from "react";
import GenericButton from "./genericButton";
import RankedVideo from "./rankedVideo";
import TextWithIcons from "./textWithIcons";

const GenericVideoSection = ({
  className,
  text,
  textClassName,
  videoUrl,
  imageAlternativeText,
  videoClassName,
  title,
  buttonClassName,
  buttonDisabled,
  buttonHasIcon,
  buttonIconClassName,
  buttonId,
  buttonLabel,
  buttonOnClick,
  hasButton,
  imageRank,
  imageHasRank,
  imageOnClick,
  textWithIconsHasLeftIcon,
  textWithIconLeftIconClassName,
  textWithIconsLabel,
  textWithIconsHasRightIcon,
  textWithIconsRightIconClassName,
  textWithIconsClassName,
  showTextWithIcons = false,
  videoHeight,
  videoWidth,
  videoLabel,
}) => {
  return (
    <div className={className}>
      <h5>{title}</h5>
      {text && <p className={textClassName}>{text}</p>}{" "}
      <RankedVideo
        url={videoUrl}
        width={videoWidth}
        height={videoHeight}
        alternativeText={imageAlternativeText}
        className={videoClassName}
        rank={imageRank}
        hasRank={imageHasRank}
        onClick={imageOnClick}
        label={videoLabel}
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
            label={buttonLabel}
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

export default GenericVideoSection;
