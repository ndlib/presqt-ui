import {call, delay, put, takeEvery} from "@redux-saga/core/effects";
import {actionCreators} from "../actionCreators";
import {
  getResourceDetail,
  getTargetResources,
  postResourceTransfer,
  resourceTransferJob
} from "../../api/resources";

/** Resource Collection For Transfer Resource Browser **/
export function* watchSwitchTransferTarget() {
  yield takeEvery(actionCreators.resources.loadFromTransferTarget, loadTransferTargetResources);
}

/**
 * Make an Axios request to Resource Collection.
 * Dispatch either the success or failure actions accordingly.
 **/
function* loadTransferTargetResources(action) {
  try {
    const response = yield call(
      getTargetResources,
      action.payload.target,
      action.payload.targetToken
    );
    yield put(actionCreators.resources.loadFromTransferTargetSuccess(response.data));
  }
  catch (error) {
    yield put(actionCreators.resources.loadFromTransferTargetFailure(
      error.response.status,
      error.response.data.error)
    );
  }
}

/** Refresh Resource Collection for transfer **/
export function* watchTransferRefreshSource() {
  yield takeEvery(actionCreators.resources.refreshTransferTarget, refreshTransferTargetResources);
}

/**
 * Make an Axios request to Resource Collection for transfer.
 * Dispatch either the success or failure actions accordingly.
 **/
function* refreshTransferTargetResources(action) {

  try {
    const response = yield call(
      getTargetResources,
      action.payload.target.name,
      action.payload.targetToken
    );
    yield put(actionCreators.resources.refreshTransferTargetSuccess(response.data));
  }
  catch (error) {
    yield put(actionCreators.resources.refreshTransferTargetFailure(
      error.response.status,
      error.response.data.error)
    );
  }
}

/** Resource Detail for transfer**/
export function* watchSelectTransferResource() {
  yield takeEvery(actionCreators.resources.selectTransferResource, loadTransferResourceDetail);
}

function* loadTransferResourceDetail(action) {
  const response = yield call(
    getResourceDetail,
    action.payload.resource,
    action.payload.targetToken
  );

  yield put(
    actionCreators.resources.selectTransferResourceSuccess(response.data)
  );
}

export function* watchResourceTransfer() {
  yield takeEvery(actionCreators.resources.transferResource, transferTargetResource)
}

function* transferTargetResource(action) {
  try {
    const response = yield call(
      postResourceTransfer,
      action.payload.destinationTarget,
      action.payload.destinationToken,
      action.payload.sourceResource,
      action.payload.duplicateAction,
      action.payload.resourceToTransferTo,
      action.payload.sourceTarget,
      action.payload.sourceTargetToken
    );

    yield put(actionCreators.resources.transferSuccess(response.data));

    // Kick off the transfer job endpoint check-in
    try {
      let transferFinished = false;

      while (!transferFinished) {
        yield put(actionCreators.resources.transferJob());

        const transferJobResponse = yield call(
          resourceTransferJob,
          response.data.transfer_job,
          action.payload.sourceTargetToken,
          action.payload.destinationToken
        );

        // transfer successful!
        if (transferJobResponse.status === 200) {
          yield put(actionCreators.resources.transferJobSuccess(transferJobResponse.data, 'success'));
          transferFinished = true;
        }
        else {
          yield put(actionCreators.resources.transferJobSuccess(null, 'pending'));
          yield delay(1000);
        }
      }
    }
    // Transfer failed because of target API error
    catch(error){
      yield put(actionCreators.resources.transferJobFailure(
        error.response.status,
        error.response.data.error)
      )
    }
  }
  // Transfer failed because of PresQT API error
  catch(error){
    yield put(actionCreators.resources.transferFailure(
      error.response.status,
      error.response.data.error)
    )
  }
}
