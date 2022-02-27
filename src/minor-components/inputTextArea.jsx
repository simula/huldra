import Icon from "./icon";
import React from "react";
import Asterisk from "./asterisk";

const InputTextArea = ({
  id,
  label,
  onChange,
  optional,
  showTooltip,
  tooltipMessage,
  type = "text",
  className = "input-wrapper",
}) => {
  return (
    <div className={className}>
      <label htmlFor={id} className="radio-question">
        {showTooltip && (
          <Icon
            tooltipMessage={tooltipMessage}
            className=" fa fa-info-circle form-tooltip ml-1"
          />
        )}{" "}
        {label}{" "}
        {optional && <span style={{ fontWeight: "lighter" }}>(optional)</span>}{" "}
        {!optional && <Asterisk />}
      </label>
      <textarea type={type} id={id} onChange={onChange} />
    </div>
  );
};

export default InputTextArea;
