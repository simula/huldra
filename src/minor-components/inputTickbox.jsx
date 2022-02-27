import { FormGroup, Label, Input } from "reactstrap";
import React from "react";
import Asterisk from "./asterisk";
const InputTickbox = ({ id, label, onChange, optional, type = "checkbox" }) => {
  return (
    <FormGroup check>
      <Label htmlFor={id} check>
        <Input
          id={id}
          onChange={(e) => onChange(e.currentTarget.checked)}
          type={type}
        />
        {label} {!optional && <Asterisk />}
      </Label>
    </FormGroup>
  );
};

export default InputTickbox;
