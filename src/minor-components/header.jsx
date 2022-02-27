import React from "react";
import ReactTooltip from "react-tooltip";
import Icon from "./icon";
const Header = ({
  leftLabel,
  leftIcon1TooltipMessage,
  leftIcon2TooltipMessage,
  leftIcon1ClassName,
  leftIcon2ClassName,
  leftIcon1OnClick,
  leftIcon2OnClick,
  rightLabel,
  rightIcon1TooltipMessage,
  rightIcon2TooltipMessage,
  rightIcon1ClassName,
  rightIcon2ClassName,
  rightIcon1OnClick,
  rightIcon2OnClick,
}) => {
  return (
    <div className="header">
      <ReactTooltip
        className="custom-form-tooltip"
        multiline={false}
        place="right"
        arrowColor="transparent"
      />
      <span>
        <Icon
          tooltipMessage={leftIcon1TooltipMessage}
          className={leftIcon1ClassName}
          onClick={leftIcon1OnClick}
        />
        {leftLabel}
        <Icon
          tooltipMessage={leftIcon2TooltipMessage}
          className={leftIcon2ClassName}
          onClick={leftIcon2OnClick}
        />
      </span>

      <span>
        <Icon
          tooltipMessage={rightIcon1TooltipMessage}
          className={rightIcon1ClassName}
          onClick={rightIcon1OnClick}
        />
        {rightLabel}
        <Icon
          tooltipMessage={rightIcon2TooltipMessage}
          className={rightIcon2ClassName}
          onClick={rightIcon2OnClick}
        />
      </span>
    </div>
  );
};

export default Header;
