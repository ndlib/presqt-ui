import { actionCreators } from "../actionCreators";
import buildResourceHierarchy from "./helpers/resources";
import { combineActions } from "redux-actions";
import updateOpenClose from "./helpers/updateOpenClose";
import { trackAction, trackError, untrackAction } from "./helpers/tracking";
import removeDuplicateResources from "./helpers/removeDuplicateResources";

export const transferReducers = {
  initialState: {
    transferTargetResources: null,
    transferTargetResourcesPages: null,
    selectedTransferResource: null,
    selectedTransferResourceName: null,
    openTransferResources: [],
    transferStatus: null,
    transferData: null,
    transferModalDisplay: false,
    transferDestinationTarget: null,
    transferDestinationToken: "",
    transferStepInModal: null,
    transferProgress: 0,
    transferMessage: "Transfer is being processed on the server",
    allTransferTargetResources: null
  },
  reducers: {
    [actionCreators.transfer.saveTransferToken]: (state, action) => ({
      ...state,
      transferDestinationToken: action.payload.targetToken
    }),
    [actionCreators.transfer.saveTransferDestinationTarget]: (state, action) => ({
      ...state,
      transferDestinationTarget: action.payload.target
    }),
    /**
     * Display the Transfer Modal
     **/
    [actionCreators.transfer.displayTransferModal]: state => ({
      ...state,
      transferModalDisplay: true
    }),
    /**
     * Hide the Transfer Modal
     **/
    [actionCreators.transfer.hideTransferModal]: state => ({
      ...state,
      transferModalDisplay: false
    }),
    /**
     * Add API call to trackers.
     * Saga call to Resource-Collection occurs with this action.
     **/
    [actionCreators.transfer.loadFromTransferTarget]: state => ({
      ...state,
      pendingAPIResponse: true,
      pendingAPIOperations: trackAction(
        actionCreators.transfer.loadFromTransferTarget,
        state.pendingAPIOperations
      ),
      apiOperationErrors: state.apiOperationErrors.filter(
        item =>
          item.action !==
          actionCreators.transfer.loadFromTransferTarget.toString()
      ),
      selectedTransferResource: null,
      selectedTransferResourceName: null,
      transferTargetResources: null,
      allTransferTargetResources: null
    }),
    /**
     * Sort the resources into the correct hierarchy.
     * Dispatched via Saga call on successful Transfer Resource Collection call.
     **/
    [actionCreators.transfer.loadFromTransferTargetSuccess]: (state, action) => {
      const resourceHierarchy = buildResourceHierarchy(
        state.openTransferResources, state.selectedTransferResource, action.payload.resources);
      return {
        ...state,
        pendingAPIResponse: false,
        pendingAPIOperations: untrackAction(
          actionCreators.transfer.loadFromTransferTarget,
          state.pendingAPIOperations
        ),
        transferTargetResources: resourceHierarchy,
        transferTargetResourcesPages: action.payload.pages,
        allTransferTargetResources: action.payload.resources
      };
    },
    /**
     * Untrack API call and track failure that occurred.
     * Dispatched via Saga call on failed Transfer Resource Collection call.
     **/
    [actionCreators.transfer.loadFromTransferTargetFailure]: (state, action) => ({
      ...state,
      pendingAPIResponse: false,
      pendingAPIOperations: untrackAction(
        actionCreators.transfer.loadFromTransferTarget,
        state.pendingAPIOperations
      ),
      apiOperationErrors: trackError(
        action,
        actionCreators.transfer.loadFromTransferTarget.toString(),
        state.apiOperationErrors
      ),
      transferDestinationToken: "",
      transferTargetResourcesPages: null,
      allTransferTargetResources: null
    }),
    [actionCreators.transfer.loadFromTransferTargetPagination]: state => ({
      ...state,
      pendingAPIResponse: true,
      pendingAPIOperations: trackAction(
        actionCreators.transfer.loadFromTransferTargetPagination,
        state.pendingAPIOperations
      ),
      apiOperationErrors: state.apiOperationErrors.filter(
        item =>
          item.action !==
          actionCreators.transfer.loadFromTransferTargetPagination.toString()
      ),
      selectedTransferResource: null,
      selectedTransferResourceName: null,
      transferTargetResources: null,
      allTransferTargetResources: null
    }),
    /**
     * Sort the resources into the correct hierarchy.
     * Dispatched via Saga call on successful Transfer Resource Collection call.
     **/
    [actionCreators.transfer.loadFromTransferTargetPaginationSuccess]: (state, action) => {
      const resourceHierarchy = buildResourceHierarchy(
        state.openTransferResources, state.selectedTransferResource, action.payload.resources);
      return {
        ...state,
        pendingAPIResponse: false,
        pendingAPIOperations: untrackAction(
          actionCreators.transfer.loadFromTransferTargetPagination,
          state.pendingAPIOperations
        ),
        transferTargetResources: resourceHierarchy,
        transferTargetResourcesPages: action.payload.pages,
        allTransferTargetResources: action.payload.resources
      };
    },
    /**
     * Untrack API call and track failure that occurred.
     * Dispatched via Saga call on failed Transfer Resource Collection call.
     **/
    [actionCreators.transfer.loadFromTransferTargetPaginationFailure]: (state, action) => ({
      ...state,
      pendingAPIResponse: false,
      pendingAPIOperations: untrackAction(
        actionCreators.transfer.loadFromTransferTargetPagination,
        state.pendingAPIOperations
      ),
      apiOperationErrors: trackError(
        action,
        actionCreators.transfer.loadFromTransferTargetPagination.toString(),
        state.apiOperationErrors
      ),
      transferDestinationToken: "",
      transferTargetResourcesPages: null,
      allTransferTargetResources: null
    }),
    /**
     * Add API call to trackers.
     * Saga call to Resource-Detail occurs with this action for transfer.
     **/
    [actionCreators.transfer.selectTransferResource]: (state, action) => {
      const updateTargetResources = transferTargetResources => {
        return transferTargetResources.map(resource => {
          return {
            ...resource,
            active: resource.id === action.payload.resource.id,
            children:
              resource.kind === "container" && resource.children
                ? updateTargetResources(resource.children)
                : resource.children
          };
        });
      };

      return {
        ...state,
        pendingAPIResponse: true,
        pendingAPIOperations: trackAction(
          actionCreators.transfer.selectTransferResource,
          state.pendingAPIOperations
        ),
        selectedTransferResourceName: action.payload.resource.title,
        transferTargetResources: updateTargetResources(state.transferTargetResources)
      };
    },
    [actionCreators.transfer.deselectTransferResource]: state => {
      const deselectTargetResource = transferTargetResources => {
        return transferTargetResources.map(resource => {
          return {
            ...resource,
            active: false,
            children:
              resource.kind === "container" && resource.children
                ? deselectTargetResource(resource.children)
                : resource.children
          };
        })
      };
      return {
        ...state,
        transferTargetResources: deselectTargetResource(
          state.transferTargetResources
        )
      };
    },
    /***
     * Untrack API call.
     * Add resource details to selectedTransferResource.
     * Dispatched via Saga call on successful Resource Detail call for transfer.
     **/
    [actionCreators.transfer.selectTransferResourceSuccess]: (state, action) => {
      const newAllTransferTargetResources = removeDuplicateResources(
        state.allTransferTargetResources, action.payload.children)
      return {
        ...state,
        selectedTransferResource: action.payload,
        pendingAPIResponse: false,
        pendingAPIOperations: untrackAction(
          actionCreators.transfer.selectTransferResource,
          state.pendingAPIOperations
        ),
        allTransferTargetResources: newAllTransferTargetResources
      };
    },
    [actionCreators.transfer.updateTransferTargetResourcesWithChildren]: state => {
      const resourceHierarchy = buildResourceHierarchy(
        state.openTransferResources, state.selectedTransferResource, state.allTransferTargetResources);
      return {
        ...state,
        transferTargetResources: resourceHierarchy
      }
    },
    [combineActions(
      /**
       * Open/Close Container Resources in UX for transfer.
       **/
      actionCreators.transfer.openTransferContainer,
      actionCreators.transfer.closeTransferContainer
    )]: (state, action) => {
      const [newOpenResources, updatedSourceResources] = updateOpenClose(
        state.openTransferResources,
        state.transferTargetResources,
        action
      );

      return {
        ...state,
        openTransferResources: newOpenResources,
        transferTargetResources: updatedSourceResources
      };
    },
    /**
     * Register resource transfer operation.
     **/
    [actionCreators.transfer.transferResource]: state => ({
      ...state,
      pendingAPIResponse: true,
      pendingAPIOperations: trackAction(
        actionCreators.transfer.transferResource,
        state.pendingAPIOperations
      ),
      transferStatus: 'pending'

    }),
    /**
     * Untrack API call.
     * Dispatched via Saga call on successful transfer call.
     **/
    [actionCreators.transfer.transferSuccess]: (state, action) => ({
      ...state,
      pendingAPIResponse: false,
      pendingAPIOperations: untrackAction(
        actionCreators.transfer.transferResource,
        state.pendingAPIOperations
      )
    }),
    /**
     * Untrack API call and track failure that occurred.
     * Dispatched via Saga call on failed transfer call.
     **/
    [actionCreators.transfer.transferFailure]: (state, action) => ({
      ...state,
      pendingAPIResponse: false,
      transferStatus: "failure",
      pendingAPIOperations: untrackAction(
        actionCreators.transfer.transferResource,
        state.pendingAPIOperations
      ),
      apiOperationErrors: trackError(
        action,
        actionCreators.transfer.transferResource.toString(),
        state.apiOperationErrors
      )
    }),
    /**
     * Register transfer job operation.
     **/
    [actionCreators.transfer.transferJob]: state => ({
      ...state,
      pendingAPIResponse: true,
      pendingAPIOperations: trackAction(
        actionCreators.transfer.transferJob,
        state.pendingAPIOperations
      )
    }),
    /**
     * Untrack API call.
     * Add the download job status to transferStatus.
     * Add the download job contents to transferData.
     **/
    [actionCreators.transfer.transferJobSuccess]: (state, action) => ({
      ...state,
      pendingAPIResponse: false,
      pendingAPIOperations: untrackAction(
        actionCreators.transfer.transferJob,
        state.pendingAPIOperations
      ),
      transferStatus: state.transferStatus === 'cancelPending' &&
                      action.payload.status === 'pending'
        ? 'cancelPending'
        : action.payload.status,
      transferData: action.payload.data,
      transferProgress: action.payload.data.job_percentage,
      transferMessage: action.payload.data.message
    }),
    /**
     * Untrack API call and track failure that occurred.
     * Dispatched via Saga call on failed transfer job call.
     **/
    [actionCreators.transfer.transferJobFailure]: (state, action) => ({
      ...state,
      pendingAPIResponse: false,
      transferStatus: "failure",
      pendingAPIOperations: untrackAction(
        actionCreators.transfer.transferJob,
        state.pendingAPIOperations
      ),
      apiOperationErrors: trackError(
        action,
        actionCreators.transfer.transferJob.toString(),
        state.apiOperationErrors
      )
    }),
    /**
     * Cancel the transfer
     **/
    [actionCreators.transfer.cancelTransfer]: state => ({
      ...state,
      pendingAPIResponse: true,
      pendingAPIOperations: trackAction(
        actionCreators.transfer.cancelTransfer,
        state.pendingAPIOperations
      ),
      transferStatus: 'cancelPending'

    }),
    /**
     * Untrack API call.
     **/
    [actionCreators.transfer.cancelTransferSuccess]: state => ({
      ...state,
      pendingAPIResponse: false,
      pendingAPIOperations: untrackAction(
        actionCreators.transfer.cancelTransfer,
        state.pendingAPIOperations
      ),
    }),
    /**
     * Untrack API call and track failure that occurred.
     * Dispatched via Saga call on failed cancel transfer call.
     **/
    [actionCreators.transfer.cancelTransferFailure]: (state, action) => ({
      ...state,
      pendingAPIResponse: false,
      transferStatus: "cancelFailure",
      pendingAPIOperations: untrackAction(
        actionCreators.transfer.cancelTransfer,
        state.pendingAPIOperations
      ),
      apiOperationErrors: trackError(
        action,
        actionCreators.transfer.cancelTransfer.toString(),
        state.apiOperationErrors
      )
    }),
    /**
     * Clear all the transfer modal data so the modal starts fresh.
     **/
    [actionCreators.transfer.clearTransferModalData]: state => {
      let newApiOperationErrors = [...state.apiOperationErrors];
      const errorsToClear = [
        actionCreators.transfer.loadFromTransferTarget.toString(),
      ];
      newApiOperationErrors = newApiOperationErrors.filter(
        item => errorsToClear.indexOf(item.action) === -1
      );

      return {
        ...state,
        transferStatus: null,
        transferData: null,
        selectedTransferResourceName: null,
        selectedTransferResource: null,
        openTransferResources: [],
        transferTargetResources: null,
        transferDestinationTarget: null,
        transferDestinationToken: "",
        transferStepInModal: null,
        transferTargetResourcesPages: null,
        apiOperationErrors: newApiOperationErrors,
        transferProgress: 0,
        transferMessage: "Transfer is being processed on the server",
        allTransferTargetResources: null
      };
    }
    ,
    /**
     * Clear the transfer data so a transfer can retried
     **/
    [actionCreators.transfer.clearTransferData]: state => ({
      ...state,
      transferStatus: null,
      transferData: null,
      transferProgress: 0,
      transferMessage: "Transfer is being processed on the server",
      apiOperationErrors: state.apiOperationErrors.filter(
        item =>
          item.action !==
          actionCreators.transfer.loadFromTransferTarget.toString()
      )
    }),
    /**
     * Clear the transfer target resources
     **/
    [actionCreators.transfer.clearTransferTargetResources]: state => ({
      ...state,
      transferTargetResources: null,
      transferTargetResourcesPages: null,
      allTransferTargetResources: null
    }),
    /**
     * Refresh the resources in the Transfer Resource Browser.
     * Saga call to Resource-Collection occurs with this action.
     **/
    [actionCreators.transfer.refreshTransferTarget]: state => ({
      ...state,
      pendingAPIResponse: true,
      pendingAPIOperations: trackAction(
        actionCreators.transfer.refreshTransferTarget,
        state.pendingAPIOperations
      )
    }),
    /**
     * Sort the resources into the correct hierarchy.
     * Dispatched via Saga call on successful Transfer Resource Collection Refresh call.
     **/
    [actionCreators.transfer.refreshTransferTargetSuccess]: (state, action) => {
      const resourceHierarchy = buildResourceHierarchy(
        state.openTransferResources, state.selectedTransferResource, action.payload.resources);
      return {
        ...state,
        pendingAPIResponse: false,
        pendingAPIOperations: untrackAction(
          actionCreators.transfer.refreshTransferTarget,
          state.pendingAPIOperations
        ),
        transferTargetResources: resourceHierarchy,
        transferTargetResourcesPages: action.payload.pages,
        transferStatus:
          state.transferStatus === "success" || state.transferStatus === "finished" ? "finished" : "cancelled",
        allTransferTargetResources: action.payload.resources
      };
    },
    /**
     * Untrack API call and track failure that occurred.
     * Dispatched via Saga call on failed Transfer Resource Collection Refresh call.
     **/
    [actionCreators.transfer.refreshTransferTargetFailure]: (state, action) => ({
      ...state,
      pendingAPIResponse: false,
      pendingAPIOperations: untrackAction(
        actionCreators.transfer.refreshTransferTarget,
        state.pendingAPIOperations
      ),
      apiOperationErrors: trackError(
        action,
        actionCreators.transfer.refreshTransferTarget.toString(),
        state.apiOperationErrors
      ),
      transferTargetResources: null,
      transferTargetResourcesPages: null,
      allTransferTargetResources: null
    }),
    /** Clear the Transfer Token **/
    [actionCreators.transfer.clearTransferToken]: state => ({
      ...state,
      transferDestinationToken: ""
    }),
    [actionCreators.transfer.stepInTransferModal]: (state, action) => ({
      ...state,
      transferStepInModal: action.payload
    }),
    [actionCreators.transfer.clearTransferResource]: state => ({
      ...state,
      selectedTransferResource: null,
      selectedTransferResourceName: null
    })
  }
};
