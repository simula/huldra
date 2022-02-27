const handleTextFieldChange = (e, methodLabel) => {
  const FeedbackFormAnswers = JSON.parse(
    localStorage.getItem("FeedbackFormAnswers")
  );
  if (FeedbackFormAnswers) {
    const answers = { ...FeedbackFormAnswers };
    answers[`${methodLabel}`] = e.currentTarget.value;
    localStorage.setItem("FeedbackFormAnswers", JSON.stringify(answers));
  } else {
    const FeedbackFormAnswers = {
      [`${methodLabel}`]: e.currentTarget.value,
    };
    localStorage.setItem(
      "FeedbackFormAnswers",
      JSON.stringify(FeedbackFormAnswers)
    );
  }
};
export { handleTextFieldChange };
