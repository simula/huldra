import React, { useEffect, useState } from "react";
import { FormGroup, Label } from "reactstrap";
import ReactTooltip from "react-tooltip";
import _ from "lodash";
import Asterisk from "./asterisk";
import Icon from "./icon";

const RadioInput = ({
  label,
  onChange,
  onTextChange,
  optional,
  options,
  showTooltip,
  tooltipMessage,
}) => {
  useEffect(() => {
    setRadioOptions(options.filter((row) => row.length === numberOfColumns));
  }, [options]);
  const numberOfColumns = 3;
  const [radioOptions, setRadioOptions] = useState(options);
  const [disableTextField, setDisableTextField] = useState(
    _.range(1, numberOfColumns + 1).map((e) => {
      return true;
    })
  );
  return (
    <div className="radio-wrapper">
      <ReactTooltip
        className="custom-form-tooltip"
        multiline={false}
        place="right"
        arrowColor="transparent"
      />
      <span className="radio-question">
        {showTooltip && (
          <Icon
            tooltipMessage={tooltipMessage}
            className=" fa fa-info-circle form-tooltip ml-1"
          />
        )}{" "}
        {label} {!optional && <Asterisk />}
      </span>

      {radioOptions.map((option, index) => (
        <FormGroup key={index} check>
          <Label check>
            <input
              onChange={(e) => {
                const newState = [...disableTextField];
                newState[index] = !newState[index];
                setDisableTextField(newState);
                onChange(option[0], e.currentTarget.checked);
              }}
              type="checkbox"
            />{" "}
            {option[0]} {option[2] !== "" && `(${option[2]})`}
          </Label>
          {option[1] === true && (
            <input
              disabled={disableTextField[index]}
              onChange={(e) => onTextChange(e.currentTarget.value)}
              style={{ width: "8em", height: "2em", marginLeft: "0.5em" }}
              type="text"
            />
          )}
        </FormGroup>
      ))}
    </div>
  );
};

export default RadioInput;
