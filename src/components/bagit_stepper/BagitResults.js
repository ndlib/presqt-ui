/** @jsx jsx */
import React, { useEffect, useState, Fragment } from "react";
import Spinner from "../widgets/spinners/Spinner";
import { useSelector } from "react-redux";
import FileSaver from "file-saver";
import { jsx } from "@emotion/core";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import getError from "../../utils/getError";
import { actionCreators } from "../../redux/actionCreators";
import colors from "../../styles/colors";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

export default function BagitResults({ selectedFile }) {
  const bagitState = useSelector((state) => state.bagitStatus);
  const bagitData = useSelector((state) => state.bagitData);
  const apiOperationErrors = useSelector(state => state.apiOperationErrors);

  const bagitError = getError(actionCreators.bagit.submitBagitFile, apiOperationErrors);

  const [content, setContent] = useState(
    <Fragment>
      <div
        css={{
          paddingTop: 20,
          paddingBottom: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Using BagIt process to compress files. This may take some time...
      </div>
      <Spinner />
    </Fragment>
  );

  useEffect(() => {
    if (bagitState === "finished") {
      FileSaver.saveAs(bagitData, `presqt_${selectedFile.name}`);
      setContent(
        <div
          css={{
            paddingTop: 20,
            paddingBottom: 20,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CheckCircleOutlineIcon
            style={{ color: colors.successGreen, minWidth: 56 }}
          />
          BagIt formatting complete!
        </div>
      );
    } else if (bagitState === "failure") {
      setContent(
        <div
          css={{
            paddingTop: 20,
            paddingBottom: 20,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ErrorOutlineIcon color="error" style={{ minWidth: 56 }} />
          {bagitError.data}
        </div>
      );
    }
  }, [bagitState]);

  return content;
}
