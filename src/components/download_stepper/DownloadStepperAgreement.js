/** @jsx jsx */
import {Fragment, useState} from "react";
import textStyles from "../../styles/text";
import {jsx} from "@emotion/core";
import withStyles from "@material-ui/core/styles/withStyles";
import colors from "../../styles/colors";
import Button from "@material-ui/core/Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {actionCreators} from "../../redux/actionCreators";
import List from "@material-ui/core/List";
import IconListItem from "../widgets/list_items/IconListItem";
import EditIcon from "@material-ui/icons/Edit";
import WarningIcon from "@material-ui/icons/Warning";
import SearchTextField from "../widgets/text_fields/SearchTextField";

const CustomDownloadButton = withStyles({
  root: {
    backgroundColor: colors.presqtBlue,
    "&:hover": {
      backgroundColor: "#0a4996"
    }
  }
})(Button);

export default function DownloadStepperAgreement({setActiveStep}) {
  const selectedTarget = useSelector(state => state.selectedTarget);

  const submitNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  return (
    <Fragment>
      <div css={{paddingBottom:10}}>
        The following actions will occur with this transaction:
        <List>
          {/* Download Statement*/}
          <IconListItem
            icon={<EditIcon />}
            text="Resource will be downloaded as a BagIt file in ZIP format."
          />

          {/* Metadata Statement*/}
          <IconListItem
            icon={<EditIcon />}
            text="File Transfer Service Metadata file will be written to the downloaded resource's top level."
          />

          {/* Source Target Statement*/
            selectedTarget.name === 'osf'
              ? <IconListItem
                icon={<WarningIcon />}
                text="OSF will only provide checksums for OSF Storage files." />
            : selectedTarget.name === 'github'
              ? <IconListItem
                icon={<WarningIcon />}
                text="Github does not provide checksums for files." />
            : null

          }
        </List>
      </div>
      <CustomDownloadButton
        onClick={submitNext}
        variant="contained"
        color="primary"
      >
        <span css={textStyles.buttonText}>Next</span>
      </CustomDownloadButton>
    </Fragment>
  )
}