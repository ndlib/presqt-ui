import { actionCreators } from "../actionCreators";
import { trackAction, trackError, untrackAction } from "./helpers/tracking";

export const downloadReducers = {
  initialState: {
    downloadStatus: null,
    downloadData: null,
    downloadModalDisplay: false,
    downloadForService: false,
    downloadForServiceStatus: null,
    downloadProgress: 0,
    downloadMessage: "Download is being processed on the server"
  },
  reducers: {
    /**
     * Register resource download operation.
     **/
    [actionCreators.download.downloadResource]: (state, action) => ({
      ...state,
      pendingAPIResponse: true,
      pendingAPIOperations: trackAction(
        actionCreators.download.downloadResource,
        state.pendingAPIOperations
      ),
      downloadStatus: "pending",
      downloadForService: action.payload.isService,
      downloadProgress: 0,
    }),
    /**
     * Untrack API call.
     * Dispatched via Saga call on successful download call.
     **/
    [actionCreators.download.downloadFromTargetSuccess]: (state, action) => ({
      ...state,
      pendingAPIResponse: false,
      pendingAPIOperations: untrackAction(
        actionCreators.download.downloadResource,
        state.pendingAPIOperations
      ),
    }),
    /**
     * Untrack API call and track failure that occurred.
     * Dispatched via Saga call on failed download call.
     **/
    [actionCreators.download.downloadFromTargetFailure]: (state, action) => ({
      ...state,
      pendingAPIResponse: false,
      downloadStatus: "failure",
      pendingAPIOperations: untrackAction(
        actionCreators.download.downloadResource,
        state.pendingAPIOperations
      ),
      apiOperationErrors: trackError(
        action,
        actionCreators.download.downloadResource.toString(),
        state.apiOperationErrors
      ),
      downloadProgress: 0,
    }),
    /**
     * Register download job operation.
     **/
    [actionCreators.download.downloadJob]: (state) => ({
      ...state,
      pendingAPIResponse: true,
      pendingAPIOperations: trackAction(
        actionCreators.download.downloadJob,
        state.pendingAPIOperations
      ),
    }),
    /**
     * Untrack API call.
     * Add the download job status to downloadStatus.
     * Add the download job contents to downloadData.
     **/
    [actionCreators.download.downloadJobSuccess]: (state, action) => ({
      ...state,
      pendingAPIResponse: false,
      pendingAPIOperations: untrackAction(
        actionCreators.download.downloadJob,
        state.pendingAPIOperations
      ),
      downloadStatus:
        state.downloadStatus === "cancelPending" &&
        action.payload.status === "pending"
          ? state.downloadStatus
          : action.payload.status,
      downloadData: action.payload.data,
      downloadProgress: action.payload.data.job_percentage,
      downloadMessage: action.payload.data.message
    }),
    /**
     * Untrack API call and track failure that occurred.
     * Dispatched via Saga call on failed download job call.
     **/
    [actionCreators.download.downloadJobFailure]: (state, action) => ({
      ...state,
      pendingAPIResponse: false,
      downloadStatus: "failure",
      pendingAPIOperations: untrackAction(
        actionCreators.download.downloadJob,
        state.pendingAPIOperations
      ),
      apiOperationErrors: trackError(
        action,
        actionCreators.download.downloadJob.toString(),
        state.apiOperationErrors
      ),
    }),
    /**
     * Cancel the download
     **/
    [actionCreators.download.cancelDownload]: (state) => ({
      ...state,
      pendingAPIResponse: true,
      pendingAPIOperations: trackAction(
        actionCreators.download.cancelDownload,
        state.pendingAPIOperations
      ),
      downloadStatus: "cancelPending",
    }),
    /**
     * Untrack API call.
     **/
    [actionCreators.download.cancelDownloadSuccess]: (state) => ({
      ...state,
      pendingAPIResponse: false,
      pendingAPIOperations: untrackAction(
        actionCreators.download.cancelDownload,
        state.pendingAPIOperations
      ),
      downloadProgress: 0
    }),
    /**
     * Untrack API call and track failure that occurred.
     * Dispatched via Saga call on failed cancel download call.
     **/
    [actionCreators.download.cancelDownloadFailure]: (state, action) => ({
      ...state,
      pendingAPIResponse: false,
      downloadStatus: "cancelFailure",
      pendingAPIOperations: untrackAction(
        actionCreators.download.cancelDownload,
        state.pendingAPIOperations
      ),
      apiOperationErrors: trackError(
        action,
        actionCreators.download.cancelDownload.toString(),
        state.apiOperationErrors
      ),
    }),
    [actionCreators.download.downloadForServiceSuccess]: (state) => ({
      ...state,
      downloadForServiceStatus: "finished",
    }),
    /**
     * Refresh the resources in the Resource Browser.
     * Saga call to Resource-Collection occurs with this action.
     **/
    /**
     * Clear the download data so a new download can be attempted.
     **/
    [actionCreators.download.clearDownloadData]: (state) => ({
      ...state,
      downloadStatus: null,
      downloadData: null,
      downloadForService: false,
      downloadForServiceStatus: null,
      downloadProgress: 0,
      downloadMessage: "Download is being processed on the server"
    }),
    /**
     * Display the Download Modal
     **/
    [actionCreators.download.displayDownloadModal]: (state) => ({
      ...state,
      downloadModalDisplay: true,
    }),
    /**
     * Hide the Download Modal
     **/
    [actionCreators.download.hideDownloadModal]: (state) => ({
      ...state,
      downloadModalDisplay: false,
    })
  },
};
