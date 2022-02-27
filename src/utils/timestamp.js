function dateToLocalISO(date) {
  const off = date.getTimezoneOffset();
  const absoff = Math.abs(off);
  return (
    new Date(date.getTime() - off * 60 * 1000)
      .toISOString()
      .split(".")[0]
      .substr(0, 23) +
    (off > 0 ? "-" : "+") +
    (absoff / 60).toFixed(0).padStart(2, "0") +
    (absoff % 60).toString().padStart(2, "0")
  );
}
const generateTimeStamp = () => {
  return dateToLocalISO(new Date());
};
export { generateTimeStamp };
