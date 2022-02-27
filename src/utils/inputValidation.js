import V from "max-validator";
const isNumeric = (input) => {
  const regex = new RegExp("^[0-9]*$");
  return regex.test(input);
};
const isValidEmail = (input) => {
  const regex = new RegExp(
    "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"
  );
  return regex.test(input);
};
const generateFeedbackFormValidationScheme = (questionsArray) => {
  let feedbackFormValidationScheme = {};
  questionsArray &&
    questionsArray.map((e) => {
      if (e.optional && e.optional === true) {
        return null;
      } else if (e.questionType === "likert") {
        e["likertQuestions"] &&
          e["likertQuestions"].map(
            (l) =>
              (feedbackFormValidationScheme[
                l.label
              ] = `required|between:1,${l.size}|number`)
          );
      } else if (e.questionType === "text") {
        feedbackFormValidationScheme[e.outputJsonLabelText] = "required|min:1";
      } else if (e.questionType === "mc") {
        feedbackFormValidationScheme[e.outputJsonLabelRadioOptionId] =
          "required|min:1";
      }
      return null;
    });
  return feedbackFormValidationScheme;
};
const validateFeedbackForm = (configs, input) => {
  return V.validate(input, generateFeedbackFormValidationScheme(configs));
};

export {
  isNumeric,
  isValidEmail,
  validateFeedbackForm,
  generateFeedbackFormValidationScheme,
};
