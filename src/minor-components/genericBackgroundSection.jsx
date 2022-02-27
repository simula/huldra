import React from "react";
import GenericBackgroundSubSection from "./genericBackgroundSubSection";
const GenericBackgroundSection = ({
  sectionTitle,
  sectionText,
  sectionClassName = "section",
  sectionTitleClassName = "section-title",
  sectionTextClassName = "background-text-content",
  sectionContent,
}) => {
  return (
    <div className={sectionClassName}>
      <span className={sectionTitleClassName}>{sectionTitle}</span>
      <p className={sectionTextClassName}>{sectionText}</p>
      {sectionContent.map((e, index) => (
        <GenericBackgroundSubSection
          key={index}
          title={e.title}
          text={e.text}
          className={e.className}
          imagePath={e.imagePath}
          imageClassName={e.imageClassName}
          imageAlternativeText={e.imageAlternativeText}
          descriptionClassName={e.descriptionClassName}
          titleClassName={e.titleClassName}
          textClassName={e.textClassName}
        />
      ))}
    </div>
  );
};

export default GenericBackgroundSection;
