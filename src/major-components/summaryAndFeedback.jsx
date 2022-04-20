import React from "react";
import Summary from "./summary";
import FeedbackForm from "./feedbackForm";
import { generateFeedbackFormValidationScheme } from "../utils/inputValidation";
const SummaryAndFeedback = ({ REACT_APP_summaryAndFeedback }) => {
  generateFeedbackFormValidationScheme(
    REACT_APP_summaryAndFeedback["feedbackForm"].feedbackFormQuestions
  );
  const getWrapperClassName = () => {
    return REACT_APP_summaryAndFeedback["summary"] &&
      REACT_APP_summaryAndFeedback["summary"].showSummary === true
      ? "summary-and-feedback-wrapper"
      : "summary-and-feedback-wrapper-centered";
  };
  return (
    <div className={getWrapperClassName()}>
      {REACT_APP_summaryAndFeedback["summary"] &&
        REACT_APP_summaryAndFeedback["summary"].showSummary === true && (
          <Summary
            title={REACT_APP_summaryAndFeedback["summary"].title}
            text={REACT_APP_summaryAndFeedback["summary"].text}
            label={REACT_APP_summaryAndFeedback["summary"].label}
            highlightClassName={
              REACT_APP_summaryAndFeedback["summary"].highlightClassName
            }
            imagePlaceholderIconPath={
              REACT_APP_summaryAndFeedback["summary"].imagePlaceholderIconPath
            }
            videoPlaceholderIconPath={
              REACT_APP_summaryAndFeedback["summary"].videoPlaceholderIconPath
            }
            audioPlaceholderIconPath={
              REACT_APP_summaryAndFeedback["summary"].audioPlaceholderIconPath
            }
          />
        )}

      <FeedbackForm
        title={REACT_APP_summaryAndFeedback["feedbackForm"].title}
        text={REACT_APP_summaryAndFeedback["feedbackForm"].text}
        feedbackFormQuestions={
          REACT_APP_summaryAndFeedback["feedbackForm"].feedbackFormQuestions
        }
      />
    </div>
  );
};

export default SummaryAndFeedback;
