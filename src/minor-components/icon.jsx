import React from "react";
import ReactTooltip from "react-tooltip";
const Icon = ({ onClick, tooltipMessage, className, ariaHidden = true }) => {
  return (
    <span>
      <ReactTooltip
        className="custom-form-tooltip"
        multiline={false}
        place="right"
        arrowColor="transparent"
      />
      {onClick && tooltipMessage ? (
        <i
          className={className}
          aria-hidden={ariaHidden}
          onClick={onClick}
          data-tip={tooltipMessage}></i>
      ) : !onClick && tooltipMessage ? (
        <i
          className={className}
          aria-hidden={ariaHidden}
          data-tip={tooltipMessage}></i>
      ) : !onClick && !tooltipMessage ? (
        <i className={className} aria-hidden={ariaHidden}></i>
      ) : onClick && !tooltipMessage ? (
        <i className={className} aria-hidden={ariaHidden} onClick={onClick}></i>
      ) : (
        <i></i>
      )}
    </span>
  );
};

export default Icon;
