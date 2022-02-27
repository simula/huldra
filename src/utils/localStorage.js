import { generateTimeStamp } from "./timestamp";
const pushToLocalStorage = (content) => {
  content.forEach((item) => {
    for (const [key, value] of Object.entries(item)) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  });
};

const logSessionEvent = (ButtonType, Location, PageLocator) => {
  let SessionEvents = JSON.parse(localStorage.getItem("SessionEvents"));
  let SessionInfo = { PageLocator: PageLocator, SessionComplete: false };
  let Timestamp = generateTimeStamp();
  let tail = {
    Location,
    ButtonType,
    Timestamp,
  };
  SessionEvents =
    SessionEvents !== null ? [...SessionEvents, tail] : new Array(tail);
  localStorage.setItem("SessionEvents", JSON.stringify(SessionEvents));
  localStorage.setItem("SessionInfo", JSON.stringify(SessionInfo));
};
export { pushToLocalStorage, logSessionEvent };
