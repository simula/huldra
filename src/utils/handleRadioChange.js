const handleRadioChange = (e, field1, field2) => {
  const FeedbackFormAnswers = JSON.parse(
    localStorage.getItem("FeedbackFormAnswers")
  );
  if (FeedbackFormAnswers) {
    const answers = { ...FeedbackFormAnswers };
    answers[field1] = e.target.id;
    answers[field2] = e.currentTarget.innerText;
    localStorage.setItem("FeedbackFormAnswers", JSON.stringify(answers));
  } else {
    const FeedbackFormAnswers = {
      [field1]: e.target.id,
      [field2]: e.currentTarget.innerText,
    };
    localStorage.setItem(
      "FeedbackFormAnswers",
      JSON.stringify(FeedbackFormAnswers)
    );
  }
};
export { handleRadioChange };
