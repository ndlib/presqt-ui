import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import UploadStepper from "../upload_stepper/UploadStepper";
import DialogTitle from "./modalHeader";
import {actionCreators} from "../../redux/actionCreators";

/**
 * This component is responsible for displaying the upload modal content including the stepper.
 **/
export default function UploadModal()  {
  const dispatch = useDispatch();

  const uploadModalDisplay = useSelector(state => state.uploadModalDisplay);
  const uploadType = useSelector(state => state.uploadType);
  const selectedResource = useSelector(state => state.selectedResource);
  const uploadStatus = useSelector(state => state.uploadStatus);
  /**
   * When the 'x' is pressed on the modal clear the upload data, remove the upload error
   * from APIOperationErrors if it exists, and toggle the modal.
   **/
  const handleClose = () => {
    dispatch(actionCreators.upload.hideUploadModal());
    dispatch(actionCreators.upload.clearUploadData());
    dispatch(actionCreators.resources.removeFromErrorList(
      actionCreators.upload.uploadToTarget.toString()));
  };


  let resourceToUploadTo = null;
  // We want to pass along the resource if the upload is to an existing project
  // or null if the user has pressed the `Create New Project Button`.
  if (uploadType !== 'NEW') {
    resourceToUploadTo = selectedResource
  }

  return uploadModalDisplay
    ? <div>
      <Dialog
        maxWidth="md"
        fullWidth={true}
        open={uploadModalDisplay}
        onClose={handleClose}
        aria-labelledby={"form-dialog-title"}
        disableBackdropClick={true}
        disableEscapeKeyDown={true}
      >
        <DialogTitle
          id="form-dialog-title"
          onClose={handleClose}
          disabled={
            uploadStatus === 'pending' ||
            uploadStatus === 'success' ||
            uploadStatus === 'cancelSuccess' ||
            uploadStatus === 'cancelPending'}
        >
          Upload Resource
        </DialogTitle>
        <DialogContent>
          <UploadStepper resourceToUploadTo={resourceToUploadTo} uploadType={uploadType}/>
        </DialogContent>
      </Dialog>
    </div>
    : null
}