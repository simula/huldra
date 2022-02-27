import React, { useState, useEffect } from "react";
import { useCallback } from "react";
import GenericBackgroundSection from "../minor-components/genericBackgroundSection";
const Background = ({ history, REACT_APP_background }) => {
  const [finishStatus, setfinishStatus] = useState(false);

  const onBackButtonEvent = useCallback(
    (e) => {
      e.preventDefault();
      if (!finishStatus) {
        if (window.confirm("Are you sure you want to go back?")) {
          setfinishStatus(true);
          history.push("/");
        } else {
          window.history.pushState(null, null, window.location.pathname);
          setfinishStatus(false);
        }
      }
    },
    [finishStatus, history]
  );
  useEffect(() => {
    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener("popstate", onBackButtonEvent);
    return () => {
      window.removeEventListener("popstate", onBackButtonEvent);
    };
  }, [onBackButtonEvent]);

  return (
    <div className=" background ">
      {REACT_APP_background.map((e, index) => (
        <GenericBackgroundSection
          key={index}
          sectionContent={e.sectionContent}
          sectionText={e.sectionText}
          sectionTitle={e.sectionTitle}
          sectionTextClassName={e.sectionTextClassName}
          sectionTitleClassName={e.sectionTitleClassName}
        />
      ))}
    </div>
  );
};

export default Background;
