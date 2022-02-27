import React from "react";
import ParagraphWithList from "../minor-components/paragraphWithList";
import RankedImage from "../minor-components/rankedImage";
import RankedVideo from "../minor-components/rankedVideo";

const Demonstration = ({ REACT_APP_demonstration }) => {
  return (
    <div className="demonstration-sections-wrapper">
      {(REACT_APP_demonstration["textBefore"] ||
        REACT_APP_demonstration["textAfter"] ||
        REACT_APP_demonstration["listOptions"]) && (
        <ParagraphWithList
          listClassName={REACT_APP_demonstration["listClassName"]}
          textClassName={REACT_APP_demonstration["textClassName"]}
          textBefore={REACT_APP_demonstration["textBefore"]}
          textAfter={REACT_APP_demonstration["textAfter"]}
          listOptions={REACT_APP_demonstration["listOptions"]}
        />
      )}

      {REACT_APP_demonstration["hasImage"] && (
        <RankedImage
          path={REACT_APP_demonstration["imagePath"]}
          className={REACT_APP_demonstration["imageClassName"]}
          wrapperClassName={REACT_APP_demonstration["wrapperClassName"]}
        />
      )}
      {REACT_APP_demonstration["hasVideo"] && (
        <RankedVideo
          url={REACT_APP_demonstration["videoPath"]}
          height={REACT_APP_demonstration["videoHeight"]}
          width={REACT_APP_demonstration["videoWidth"]}
        />
      )}
      {REACT_APP_demonstration["hasAudio"] && (
        <RankedVideo
          url={REACT_APP_demonstration["audioPath"]}
          height={REACT_APP_demonstration["audioHeight"]}
          width={REACT_APP_demonstration["audioWidth"]}
        />
      )}
    </div>
  );
};

export default Demonstration;
