import React from "react";
import Icon from "./icon";
const FooterFixedContent = ({
  label,
  icon1ClassName,
  icon2ClassName,
  icon1Url,
  icon2Url,
}) => {
  return (
    <div className="footer-content">
      <a
        className="footer-link"
        href={icon1Url}
        target="_blank"
        rel="noopener noreferrer">
        <Icon className={icon1ClassName} />
      </a>{" "}
      <span> {label}</span>
      <a
        className="footer-link"
        href={icon2Url}
        target="_blank"
        rel="noopener noreferrer">
        <Icon className={icon2ClassName} />
      </a>
    </div>
  );
};

export default FooterFixedContent;
