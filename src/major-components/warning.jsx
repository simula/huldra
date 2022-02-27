import React from "react";
const Warning = ({ REACT_APP_warning }) => {
  return (
    <div className="welcome">
      <div className="home-header">
        <h2>{REACT_APP_warning && REACT_APP_warning["title"]}</h2>
      </div>
      <span style={{ fontSize: "1.5em", padding: "1em", fontWeight: "bold" }}>
        {REACT_APP_warning && REACT_APP_warning["warningMessage"]}
      </span>
    </div>
  );
};

export default Warning;
