import React, { useEffect } from "react";

const End = ({
  history,
  endMessage = "Thank you for participating in our survey!",
  title,
  REACT_APP_end,
}) => {
  useEffect(() => {
    setTimeout(() => {
      localStorage.clear();
      history.replace("/");
    }, REACT_APP_end && REACT_APP_end["redirectTimeout"]);
  });
  return (
    <div className="welcome">
      <div className="home-header">
        <h2>{REACT_APP_end && REACT_APP_end["title"]}</h2>
      </div>
      <span style={{ fontSize: "1.5em", padding: "1em", fontWeight: "bold" }}>
        {REACT_APP_end && REACT_APP_end["endMessage"]}
      </span>
    </div>
  );
};

export default End;
