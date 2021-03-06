/** @jsx jsx */
import { jsx } from "@emotion/core";
import textStyles from "../../styles/text";
import ActionButton from "../widgets/buttons/ActionButton";
import { useDispatch } from "react-redux";
import { actionCreators } from "../../redux/actionCreators";

/**
 * This component is responsible for initializing and opening the upload modal
 **/
export default function UploadActionButton({style, text, type, disabled}) {
  const dispatch = useDispatch();

  return (
    <ActionButton
      css={style}
      elevation={0}
      variant="contained"
      onClick={() => dispatch(actionCreators.upload.displayUploadModal(type))}
      disabled={disabled}
    >
      <span css={textStyles.buttonText}>{text}</span>
    </ActionButton>
  );
}
