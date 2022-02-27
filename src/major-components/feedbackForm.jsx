import React, { useEffect } from "react";
import InputTextArea from "../minor-components/inputTextArea";
import InputLikert from "../minor-components/inputLikert";
import InputMultipleChoice from "../minor-components/inputMultipleChoice";
import { handleTextFieldChange } from "../utils/handleTextFieldChange";
const FeedbackForm = ({ feedbackFormQuestions, title, text }) => {
  const components = {
    text: InputTextArea,
    likert: InputLikert,
    mc: InputMultipleChoice,
  };
  useEffect(() => {
    localStorage.removeItem("FeedbackFormAnswers");
  }, []);
  return (
    <div className="feedback-form-wrapper">
      <h3>{title}</h3>
      <div className="summary-and-feedback-text-content">{text} </div>
      <form id="feedback-form">
        {feedbackFormQuestions.map((e, index = 0) => {
          return e.questionType === "text"
            ? React.createElement(components[e["questionType"]], {
                key: index,
                onChange: (event) =>
                  handleTextFieldChange(event, e["outputJsonLabelText"]),
                ...e,
              })
            : React.createElement(components[e["questionType"]], {
                key: index,
                ...e,
              });
        })}
      </form>
    </div>
  );
};
export default FeedbackForm;
