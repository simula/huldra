import React from "react";
import Asterisk from "./asterisk";
import { FormGroup, Label, Input } from "reactstrap";
import Icon from "./icon";
import InputTextArea from "./inputTextArea";
import { handleRadioChange } from "../utils/handleRadioChange";
import { handleTextFieldChange } from "../utils/handleTextFieldChange";

const InputMultipleChoice = ({
  label,
  id,
  choices,
  optional = false,
  showTooltip = false,
  tooltipMessage,
  labelClassName = "radio-question",
  wrapperClassName = "feedback-text-input",
  hasCommentBox = true,
  commentBoxClassName = "feedback-text-input",
  commentBoxLabel = "Comments",
  outputJsonLabelText,
  outputJsonLabelRadioOptionId,
  outputJsonLabelRadioText,
}) => {
  return (
    <div className={wrapperClassName}>
      <label htmlFor={id} className={labelClassName}>
        {showTooltip && (
          <Icon
            tooltipMessage={tooltipMessage}
            className="fa fa-info-circle form-tooltip ml-1"
          />
        )}{" "}
        {label}{" "}
        {optional && (
          <span style={{ fontWeight: "lighter", marginRight: "0.5em" }}>
            (optional)
          </span>
        )}{" "}
        {!optional && <Asterisk />}
      </label>
      {choices.map((element, index) => {
        return (
          <FormGroup
            key={index}
            check
            onChange={(e) =>
              handleRadioChange(
                e,
                outputJsonLabelRadioOptionId,
                outputJsonLabelRadioText
              )
            }>
            <Input
              id={`${id}-radio-option${index}`}
              type="radio"
              name={`${id}-radio`}
            />
            <Label check for={`${id}-radio-option${index}`}>
              {element}{" "}
            </Label>
          </FormGroup>
        );
      })}
      {hasCommentBox === true && (
        <InputTextArea
          id="1"
          label={commentBoxLabel}
          onChange={(e) => handleTextFieldChange(e, outputJsonLabelText)}
          optional={true}
          showTooltip={false}
          className={commentBoxClassName}
        />
      )}
    </div>
  );
};

export default InputMultipleChoice;
