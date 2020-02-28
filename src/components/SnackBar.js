/** @jsx jsx */
import React, {useEffect, useState} from 'react';
import { jsx } from '@emotion/core';
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import {useSelector} from "react-redux";
import makeStyles from "@material-ui/core/styles/makeStyles";
import colors from "../styles/colors";
import { githubToken } from '../config';

const useStyles = makeStyles(theme => ({
  success: {
    backgroundColor: colors.successGreen,
    color: 'white'
  },
  failure: {
    backgroundColor: colors.chevelleRed,
    color: 'white'
  }
}));

export default function SnackBar() {
  const classes = useStyles();

  const downloadStatus = useSelector(state => state.resources.downloadStatus);
  const uploadStatus = useSelector(state => state.resources.uploadStatus);
  const githubStatus = useSelector(state => state.authorization.githubStatus);
  const githubIssueData = useSelector(state => state.authorization.githubIssueData);

  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarText, setSnackBarText] = useState('');
  const [snackBarClass, setSnackBarClass] = useState('');

  console.log(githubIssueData);

  /**
   * DOWNLOAD
   **/
  useEffect(() => {
    if (downloadStatus === 'success') {
      setSnackBarOpen(true);
      setSnackBarText('Download Successful!');
      setSnackBarClass(classes.success);
    }
    else if (downloadStatus === 'failure') {
      setSnackBarOpen(true);
      setSnackBarText('Download Failed!');
      setSnackBarClass(classes.failure);
    }
  }, [downloadStatus]);

  /**
   * UPLOAD
   **/
  useEffect(() => {
    if (uploadStatus === 'finished') {
      setSnackBarOpen(true);
      setSnackBarText('Upload Successful!');
      setSnackBarClass(classes.success);
    }
    else if (uploadStatus === 'failure') {
      setSnackBarOpen(true);
      setSnackBarText('Upload Failed!');
      setSnackBarClass(classes.failure);
    }
  }, [uploadStatus]);

  useEffect(() => {
    if (githubStatus === 'success') {
      setSnackBarOpen(true);
      setSnackBarText(`Issue #${githubIssueData.number} Created Successfully`);
      setSnackBarClass(classes.success);
    }
    else if (githubStatus === 'failure') {
      setSnackBarOpen(true);
      setSnackBarText('GitHub Issue Failed to Create');
      setSnackBarClass(classes.failure);
    }
  }, [githubStatus])

  return (
    <Snackbar
      ContentProps={{
        classes: {
          root: snackBarClass
        }
      }}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      message={snackBarText}
      open={snackBarOpen}
      autoHideDuration={6000}
      onClose={() => {setSnackBarOpen(false)}}
      action={
        <IconButton size="small" aria-label="close" color="inherit" onClick={() =>
        {setSnackBarOpen(false)}}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      }
    >
    </Snackbar>
  )
}