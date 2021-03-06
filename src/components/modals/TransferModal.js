import {useDispatch, useSelector} from "react-redux";
import React, {useState} from "react";
import DialogTitle from "./modalHeader";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import {actionCreators} from "../../redux/actionCreators";
import TransferStepper from "../transfer/stepper/TransferStepper";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TransferResourceBrowser from "../transfer/TransferResourceBrowser";

const leftGrid = makeStyles(theme => ({
  root: {
    borderRight: 'solid 1px #979797',
  }
}));

const RightGrid = makeStyles(theme => ({
  root: {
    paddingLeft: 25,
  }
}));

export default function TransferModal() {
  const dispatch = useDispatch();
  const leftGridClasses = leftGrid();
  const RightGridClasses = RightGrid();

  const transferModalDisplay = useSelector(state => state.transferModalDisplay);
  const selectedResource = useSelector(state => state.selectedResource);
  const transferStatus = useSelector(state => state.transferStatus);
  const [transferPageNumber, setTransferPageNumber] = useState(1);

  const handleClose = () => {
    dispatch(actionCreators.transfer.hideTransferModal());
    dispatch(actionCreators.transfer.clearTransferModalData());
    dispatch(actionCreators.keywords.clearKeywords());
    dispatch(actionCreators.keywords.clearKeywordData());
    setTransferPageNumber(1);
  };

  return transferModalDisplay
  ?
    <div>
      <Dialog
        maxWidth="md"
        fullWidth={true}
        open={transferModalDisplay}
        onClose={handleClose}
        aria-labelledby={"form-dialog-title"}
        disableBackdropClick={true}
        disableEscapeKeyDown={true}
      >
        <DialogTitle
          id="form-dialog-title"
          onClose={handleClose}
          disabled={
            transferStatus === 'pending' ||
            transferStatus === 'success' ||
            transferStatus === 'cancelPending' ||
            transferStatus === 'cancelSuccess'}
        >
          Transfer Resource: {selectedResource.title}
        </DialogTitle>
        <DialogContent>
          <Grid container>
            <Grid item xs={7} className={leftGridClasses.root}>
              <TransferStepper
                setTransferPageNumber={setTransferPageNumber}
                transferPageNumber={transferPageNumber}
              />
            </Grid>
            <Grid className={RightGridClasses.root} item xs={5}>
              <TransferResourceBrowser
                setTransferPageNumber={setTransferPageNumber}
                transferPageNumber={transferPageNumber} />
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  : null
}
