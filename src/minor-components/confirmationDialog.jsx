import React from "react";
import GenericButton from "./genericButton";
const ConfirmationDialog = React.forwardRef((props, ref) => {
  return (
    <div tabIndex={-1} ref={ref} className="dialog">
      <div>
        <i onClick={props.onClick} className="fa fa-lg fa-close close"></i>
      </div>{" "}
      <div className="dialog-body">
        <span className="dialog-text">{props.dialogQuestion}</span>
        <div className="dialog-controls">
          <GenericButton
            className="btn control confirm confirmation-dialog-button"
            hasIcon={false}
            id="cancel-button"
            label={props.cancelText}
            onClick={props.onCancel}
          />
          <GenericButton
            className="btn control confirm confirmation-dialog-button"
            hasIcon={false}
            id="confirm-button"
            label={props.confirmText}
            onClick={props.onConfirm}
          />
        </div>
      </div>
    </div>
  );
});

export default ConfirmationDialog;
