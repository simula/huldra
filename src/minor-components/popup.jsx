import React from "react";
import PopupWithGallery from "./popupWithGallery";
import PopupWithoutGallery from "./popupWithoutGallery";
import PopupBasic from "./popupBasic";

const Popup = React.forwardRef(({ popupType, ...rest }, ref) => {
  return popupType === "basic" ? (
    <PopupBasic ref={ref} {...rest} />
  ) : popupType === "withGallery" ? (
    <PopupWithGallery ref={ref} {...rest} />
  ) : popupType === "withoutGallery" ? (
    <PopupWithoutGallery ref={ref} {...rest} />
  ) : (
    <span></span>
  );
});

export default Popup;
