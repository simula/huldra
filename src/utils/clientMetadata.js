import { browserName, browserVersion } from "react-device-detect";

const getOs = () => {
  const os = ["Windows", "Linux", "Mac"];
  try {
    return os.find((v) => navigator.appVersion.indexOf(v) >= 0);
  } catch (error) {
    return "Unknown OS";
  }
};
export { getOs, browserName, browserVersion };
