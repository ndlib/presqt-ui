import { all } from "redux-saga/effects";

import { watchLoadTargets } from "./targets";
import {
  watchRefreshSource,
  watchSearch,
  watchSelectResource,
  watchSwitchTarget,
  watchPage,
} from "./resources";
import { watchCancelDownload, watchResourceDownload } from "./download";
import { watchCancelUpload, watchResourceUpload } from "./upload";
import {
  watchCancelTransfer,
  watchResourceTransfer,
  watchSelectTransferResource,
  watchSwitchTransferTarget,
  watchTransferRefreshSource,
  watchPageTransfer,
} from "./transfer";
import { watchSubmitIssue } from "./github";
import { watchLoadServices, watchLoadService } from "./services";
import { watchEaasiProposal, watchEaasiSuccess } from "./eaasi";
import { watchLoadStatuses } from "./status";
import { watchGetKeywords, watchSendKeywords } from "./keywords";
import { watchSubmitBagitFile } from "./bagit";
import { watchGetAnnouncements } from "./announcements";
import { watchFairshareEvaluation, watchGetFairshareEvaluationTests } from "./fairshare";
import { watchGetFairshakeRubric, watchSubmitFairshakeAssessment } from "./fairshake";

// Notice how we now only export the rootSaga single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    watchLoadTargets(),
    watchSwitchTarget(),
    watchLoadStatuses(),
    watchSelectResource(),
    watchSearch(),
    watchResourceDownload(),
    watchResourceUpload(),
    watchRefreshSource(),
    watchCancelDownload(),
    watchCancelUpload(),
    watchSwitchTransferTarget(),
    watchResourceTransfer(),
    watchSelectTransferResource(),
    watchTransferRefreshSource(),
    watchCancelTransfer(),
    watchSubmitIssue(),
    watchLoadServices(),
    watchLoadService(),
    watchEaasiSuccess(),
    watchEaasiProposal(),
    watchGetKeywords(),
    watchSendKeywords(),
    watchSubmitBagitFile(),
    watchGetAnnouncements(),
    watchPage(),
    watchPageTransfer(),
    watchFairshareEvaluation(),
    watchGetFairshareEvaluationTests(),
    watchGetFairshakeRubric(),
    watchSubmitFairshakeAssessment(),
  ]);
}
