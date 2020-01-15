/** @jsx jsx */
import {jsx} from "@emotion/core";
import {useDispatch, useSelector} from "react-redux";
import {actionCreators} from "../../../redux/actionCreators";
import Button from "@material-ui/core/Button/Button";
import withStyles from "@material-ui/core/styles/withStyles";

const CustomUploadButton = withStyles({
  root: {
    backgroundColor: '#0C52A7',
    '&:hover': {
      backgroundColor: '#0a4996',
    },
  },
})(Button);

/**
 * Component responsible for rendering the upload button in the upload stepper and passing the
 * selected file to the Upload API endpoint
 **/
export default function UploadButton(props) {
  const dispatch = useDispatch();

  const selectedTarget = useSelector(state => state.targets.source.name);
  const selectedInSource = useSelector(state => state.resources.selectedInSource);
  const sourceTargetToken = useSelector(state => state.authorization.apiTokens[state.targets.source.name]);

  /**
   * When the upload button is pushed, dispatch the Upload action and update the stepper
   * index to move forward.
   **/
  const submitUpload = () => {
    dispatch(actionCreators.resources.uploadToSourceTarget(
      selectedTarget,
      props.selectedFile,
      props.selectedDuplicate,
      selectedInSource,
      sourceTargetToken));

      props.handleNext()
  };

  return (
    <CustomUploadButton
      onClick={submitUpload}
      variant="contained"
      color="primary"
    >
    Upload File
    </CustomUploadButton>
  )
}