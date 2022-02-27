import React from "react";
import Likert from "react-likert-scale";
import Icon from "./icon";
import Asterisk from "./asterisk";
import { generateLikertScheme } from "../utils/generateLikertScheme";
const InputLikert = ({
  label,
  id,
  likertWrapperClassName = "feedback-text-input",
  titleClassName = "radio-question",
  showTooltip = false,
  tooltipMessage,
  optional = false,
  likertQuestions,
}) => {
  return (
    <div id={id} className={likertWrapperClassName}>
      <label className={titleClassName}>
        {showTooltip && (
          <Icon
            tooltipMessage={tooltipMessage}
            className=" fa fa-info-circle form-tooltip ml-1"
          />
        )}{" "}
        {label}
        {!optional && <Asterisk />}
      </label>
      {likertQuestions.map((e, index = 0) => {
        let likertOptions = { ...likertQuestions[index] };
        likertOptions.responses = generateLikertScheme(likertOptions.size);
        likertOptions.onChange = (val) => {
          const FeedbackFormAnswers = JSON.parse(
            localStorage.getItem("FeedbackFormAnswers")
          );
          let answers = {};
          if (FeedbackFormAnswers) {
            answers = { ...FeedbackFormAnswers };
          }
          answers[
            `${likertQuestions[index].label}`
          ] = `${val.value}/${likertOptions.responses.length}`;
          localStorage.setItem("FeedbackFormAnswers", JSON.stringify(answers));
        };
        return <Likert {...likertOptions} key={index} />;
      })}
    </div>
  );
};

export default InputLikert;
