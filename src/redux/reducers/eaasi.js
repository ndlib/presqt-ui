import { actionCreators } from "../actionCreators";
import { trackAction, trackError, untrackAction } from "./helpers/tracking";

export const eaasiReducers = {
  initialState: {
    eaasiModalDisplay: false,
    eaasiProposalStatus: null,
    eaasiProposalPostData: null,
    eaasiProposalGetData: null
  },
  reducers: {
    /**
     * Display the EaaSI Modal
     **/
    [actionCreators.eaasi.displayEaasiModal]: state => ({
      ...state,
      eaasiModalDisplay: true
    }),
    /**
     * Hide the EaaSI Modal
     **/
    [actionCreators.eaasi.hideEaasiModal]: state => ({
      ...state,
      eaasiModalDisplay: false
    }),
    /**
     * Add API call to trackers.
     * Saga call to EaaSI Proposal occurs with this action.
     **/
    [actionCreators.eaasi.sendEaasiProposal]: state => ({
      ...state,
      pendingAPIResponse: true,
      pendingAPIOperations: trackAction(
        actionCreators.eaasi.sendEaasiProposal,
        state.pendingAPIOperations
      ),
      eaasiProposalStatus: 'postPending'
    }),
    [actionCreators.eaasi.sendEaasiProposalSuccess]: (state, action) => ({
      ...state,
      pendingAPIResponse: false,
      pendingAPIOperations: untrackAction(
        actionCreators.eaasi.sendEaasiProposal,
        state.pendingAPIOperations
      ),
      eaasiProposalPostData: action.payload,
      eaasiProposalStatus: 'postFinished'
    }),
    [actionCreators.eaasi.sendEaasiProposalFailure]: (state, action) => ({
      ...state,
      pendingAPIResponse: false,
      pendingAPIOperations: untrackAction(
        actionCreators.eaasi.sendEaasiProposal,
        state.pendingAPIOperations
      ),
      apiOperationErrors: trackError(
        action,
        actionCreators.eaasi.sendEaasiProposal.toString(),
        state.apiOperationErrors
      ),
      eaasiProposalStatus: 'postFailure'
    }),
    [actionCreators.eaasi.getEaasiProposal]: state => ({
      ...state,
      pendingAPIResponse: true,
      pendingAPIOperations: trackAction(
        actionCreators.eaasi.getEaasiProposal,
        state.pendingAPIOperations
      ),
      eaasiProposalStatus: 'getPending'
    }),
    [actionCreators.eaasi.getEaasiProposalSuccess]: (state, action) => ({
      ...state,
      pendingAPIResponse: false,
      pendingAPIOperations: untrackAction(
        actionCreators.eaasi.getEaasiProposal,
        state.pendingAPIOperations
      ),
      eaasiProposalGetData: action.payload.data,
      eaasiProposalStatus: action.payload.status
    }),
    [actionCreators.eaasi.getEaasiProposalFailure]: (state, action) => ({
      ...state,
      pendingAPIResponse: false,
      pendingAPIOperations: untrackAction(
        actionCreators.eaasi.getEaasiProposal,
        state.pendingAPIOperations
      ),
      apiOperationErrors: trackError(
        action,
        actionCreators.eaasi.getEaasiProposal.toString(),
        state.apiOperationErrors
      ),
      eaasiProposalStatus: 'getFailure'
    }),
    [actionCreators.eaasi.clearEaasiData]: state => ({
      ...state,
      eaasiProposalStatus: null,
      eaasiProposalPostData: null,
      eaasiProposalGetData: null
    })
  }
};
