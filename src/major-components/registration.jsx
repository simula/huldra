import React from "react";
import "firebase/storage";
import InputTextField from "../minor-components/inputTextField";
import InputTextArea from "../minor-components/inputTextArea";
import InputRadio from "../minor-components/inputRadio";
import InputTickbox from "../minor-components/inputTickbox";

const Registration = ({
  onCountryChange,
  onCommentsChange,
  handleDegreeChange,
  handleOtherDegreeChange,
  onNameChange,
  onEmailChange,
  onFieldOfExpertiseChange,
  onActiveYearsChange,
  setTermsOfUse,
  setNotifications,
  REACT_APP_registration,
}) => {
  return (
    <div className="registration-form-wrapper">
      <form id="registration-form">
        <div className="horizontal-sections">
          <div className="vertical-section">
            <InputTextField
              label={
                REACT_APP_registration && REACT_APP_registration["Q1"].label
              }
              id="name"
              onChange={(e) => onNameChange(e)}
              optional={false}
            />

            <InputTextField
              label={
                REACT_APP_registration && REACT_APP_registration["Q2"].label
              }
              id="email"
              onChange={(e) => onEmailChange(e)}
              optional={true}
            />
            <InputTextField
              label={
                REACT_APP_registration && REACT_APP_registration["Q3"].label
              }
              id="country"
              onChange={(e) => onCountryChange(e)}
              showTooltip={
                REACT_APP_registration &&
                REACT_APP_registration["Q3"].showTooltip
              }
              optional={false}
              tooltipMessage={
                REACT_APP_registration &&
                REACT_APP_registration["Q3"].tooltipMessage
              }
            />
            <InputTextArea
              id="comments"
              label={
                REACT_APP_registration && REACT_APP_registration["Q4"].label
              }
              onChange={(e) => onCommentsChange(e)}
              optional={true}
            />
          </div>
          <div className="vertical-section">
            <InputRadio
              label={
                REACT_APP_registration && REACT_APP_registration["Q5"].label
              }
              onChange={handleDegreeChange}
              onTextChange={handleOtherDegreeChange}
              optional={false}
              options={[
                ["BSc", false, ""],
                ["MSc", false, ""],
                ["PhD", false, ""],
                ["Other", true, "please specify"],
              ]}
              showTooltip={
                REACT_APP_registration &&
                REACT_APP_registration["Q5"].showTooltip
              }
              tooltipMessage={
                REACT_APP_registration &&
                REACT_APP_registration["Q5"].tooltipMessage
              }
            />

            <InputTextField
              onChange={(e) => onFieldOfExpertiseChange(e)}
              name="field-of-expertise"
              id="field-of-expertise"
              label={
                REACT_APP_registration && REACT_APP_registration["Q6"].label
              }
              showTooltip={
                REACT_APP_registration &&
                REACT_APP_registration["Q6"].showTooltip
              }
              optional={false}
              tooltipMessage={
                REACT_APP_registration &&
                REACT_APP_registration["Q6"].tooltipMessage
              }
            />
            <InputTextField
              onChange={(e) => onActiveYearsChange(e)}
              id="active-years"
              name="active-years"
              label={
                REACT_APP_registration && REACT_APP_registration["Q7"].label
              }
              showTooltip={
                REACT_APP_registration &&
                REACT_APP_registration["Q7"].showTooltip
              }
              optional={true}
              tooltipMessage={
                REACT_APP_registration &&
                REACT_APP_registration["Q7"].tooltipMessage
              }
            />
          </div>
        </div>
        <div className="terms">
          <InputTickbox
            onChange={(value) => setTermsOfUse(value)}
            label={REACT_APP_registration && REACT_APP_registration["Q8"].label}
            id={"terms-of-use"}
            optional={false}
          />
          <InputTickbox
            onChange={(value) => setNotifications(value)}
            label={REACT_APP_registration && REACT_APP_registration["Q9"].label}
            id={"receive-notifications"}
            optional={true}
          />
        </div>
      </form>
    </div>
  );
};

export default Registration;
