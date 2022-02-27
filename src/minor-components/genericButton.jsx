import React from "react";
import Icon from "./icon";
const GenericButton = ({
  className,
  disabled = false,
  hasIcon = false,
  iconClassName,
  id,
  label,
  onClick,
}) => {
  return (
    <button id={id} disabled={disabled} className={className} onClick={onClick}>
      {hasIcon && <Icon className={iconClassName} />} {label}
    </button>
  );
};

export default GenericButton;
