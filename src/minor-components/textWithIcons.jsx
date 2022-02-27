import React from "react";
import Icon from "./icon";
const TextWithIcons = ({
  hasLeftIcon,
  leftIconClassName,
  label,
  hasRightIcon,
  rightIconClassName,
  className,
}) => {
  return (
    <div className={className}>
      {hasLeftIcon && <Icon className={leftIconClassName} />}
      <span> {label}</span>{" "}
      {hasRightIcon && <Icon className={rightIconClassName} />}
    </div>
  );
};

export default TextWithIcons;
