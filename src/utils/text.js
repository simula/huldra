import copy from "copy-to-clipboard";
import { toastSuccess } from "./toast";

const copyToClipboard = (content) => {
  copy(content);
  toastSuccess(
    "Participant ID copied to clipboard.",
    "top-right",
    "toast-succeess"
  );
};
export { copyToClipboard };
