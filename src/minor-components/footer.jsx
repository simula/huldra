import React from "react";
import FooterFixedContent from "./footerFixedContent";
import GenericButton from "./genericButton";
const Footer = ({
  disableLeftButton,
  disableRightButton,
  icon1ClassName,
  icon2ClassName,
  icon1Url,
  icon2Url,
  label,
  leftButtonClassName,
  leftButtonLabel,
  onLeftButtonClick,
  onRightButtonClick,
  rightButtonClassName,
  rightButtonLabel,
}) => {
  return (
    <footer>
      <div className="controls">
        <GenericButton
          className={leftButtonClassName}
          disabled={disableLeftButton}
          label={leftButtonLabel}
          onClick={onLeftButtonClick}
        />
        <FooterFixedContent
          label={label}
          icon1ClassName={icon1ClassName}
          icon2ClassName={icon2ClassName}
          icon1Url={icon1Url}
          icon2Url={icon2Url}
        />
        <GenericButton
          className={rightButtonClassName}
          disabled={disableRightButton}
          label={rightButtonLabel}
          onClick={onRightButtonClick}
        />
      </div>
    </footer>
  );
};

export default Footer;
