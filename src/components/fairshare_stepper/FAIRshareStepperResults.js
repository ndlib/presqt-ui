/** @jsx jsx */
import { Fragment, useEffect, useState } from "react";
import Spinner from "../widgets/spinners/Spinner";
import { actionCreators } from "../../redux/actionCreators";
import { jsx } from "@emotion/core";
import { useDispatch, useSelector } from "react-redux";
import getError from "../../utils/getError";
import FAIRshareResultsContent from "./FAIRshareResultsContent";

export default function FAIRshareStepperResults() {
  const dispatch = useDispatch();

  const fairshareEvaluationStatus = useSelector((state) => state.fairshareEvaluationStatus);
  const fairshareModalDisplay = useSelector((state) => state.fairshareModalDisplay);
  const fairshareResultsData = useSelector((state) => state.fairshareResultsData);

  const fairsharePostError = getError(actionCreators.fairshare.sendFairshareEvaluation);

  const [stepContent, setStepContent] = useState(
    <div>
      <div
        css={{
          paddingBottom: 15,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        Evaluation task is being processed on the FAIRshare server, this may
        take several minutes...
      </div>
      <Spinner />
    </div>
  );

  useEffect(() => {
    if (fairshareEvaluationStatus === "postFinished") {
      setStepContent(
        <Fragment>
          {fairshareResultsData.map((testInfo) => (
            <FAIRshareResultsContent testInfo={testInfo} />
          ))}
        </Fragment>
    );
    } else if (fairshareEvaluationStatus === "postFailure") {
      setStepContent(
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
          <ErrorOutlineIcon color="error" />
          <span css={{ marginLeft: 5 }}>
            FAIRshare Error: {fairsharePostError.data.error}
          </span>
        </div>
      );
    }
  }, [fairshareModalDisplay, fairshareEvaluationStatus]);

  return stepContent;
}
