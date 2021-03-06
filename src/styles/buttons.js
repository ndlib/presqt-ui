import makeStyles from "@material-ui/core/styles/makeStyles";
import colors from "./colors";
import { css } from "@emotion/core";

export default {
  RetryUpload: makeStyles(theme => ({
    button: {
      height: "100%",
      marginRight: theme.spacing(1),
      backgroundColor: colors.presqtBlue,
      "&:hover": {
        backgroundColor: colors.presqtBlueHover
      }
    }
  })),
  RetryDownload: makeStyles(theme => ({
    button: {
      height: "100%",
      marginRight: theme.spacing(1),
      backgroundColor: colors.presqtBlue,
      "&:hover": {
        backgroundColor: colors.presqtBlueHover
      }
    }
  })),
  RetryStartUploadOver: makeStyles(theme => ({
    button: {
      height: "100%",
      marginRight: theme.spacing(1),
      color: colors.presqtBlue
    }
  })),
  inlineButton: css({
    cursor: "pointer",
    color: colors.presqtBlue,
    "&:hover": {
      color: colors.presqtBlueHover
    }
  }),
  disabledInlineButton: css({
    cursor: "not-allowed",
    color: '#646464'
  })
};
