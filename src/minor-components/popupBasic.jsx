import React, { useState } from "react";
import RankedImage from "./rankedImage";

const PopupBasic = React.forwardRef(
  ({ title, imageUrl, onCloseIconClick }, ref) => {
    const [preview] = useState(imageUrl);

    return (
      <div tabIndex={-1} ref={ref} className="hybrid-modal-detail-container">
        <div className="modal-detail-header">
          <h4>{title}</h4>
          <i onClick={onCloseIconClick} className="fa fa-lg fa-close close"></i>
        </div>
        <div className="modal-detail-body">
          <RankedImage
            path={preview}
            className="scaled-image-fit-height-hybrid"
          />
        </div>
      </div>
    );
  }
);

export default PopupBasic;
