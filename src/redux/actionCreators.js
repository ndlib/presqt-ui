import {createActions} from 'redux-actions';

export const actionCreators = createActions({
    AUTHORIZATION: {
        SAVE_TOKEN: (targetID, token) => ({targetID, token}),
        REMOVE_TOKEN: (target) => ({target: target}),
        DISPLAY_TOKEN_MODAL: undefined,
        HIDE_TOKEN_MODAL: undefined,
    },
    RESOURCES: {
        LOAD_FROM_TARGET: (target, targetToken) => ({target, targetToken}),
        LOAD_FROM_TARGET_SUCCESS: undefined,
        LOAD_FROM_TARGET_FAILURE: (status, data) => ({status, data}),
        LOAD_FROM_TARGET_SEARCH: (target, targetToken, searchValue, searchParameter) => ({
            target,
            targetToken,
            searchValue,
            searchParameter
        }),
        LOAD_FROM_TARGET_SEARCH_SUCCESS: undefined,
        LOAD_FROM_TARGET_SEARCH_FAILURE: (status, data) => ({ status, data }),
        LOAD_FROM_TARGET_PAGINATION: (url, pageNumber, targetToken) => ({
            url,
            pageNumber,
            targetToken
        }),
        LOAD_FROM_TARGET_PAGINATION_SUCCESS: undefined,
        LOAD_FROM_TARGET_PAGINATION_FAILURE: (status, data) => ({status, data}),
        REMOVE_FROM_ERROR_LIST: (actionToRemove) => ({actionToRemove}),
        OPEN_CONTAINER: container => ({container, open: true}),
        CLOSE_CONTAINER: container => ({container, open: false}),
        SELECT_RESOURCE: (resource, targetToken) => ({resource, targetToken}),
        SELECT_RESOURCE_SUCCESS: undefined,
        CLEAR_RESOURCES: undefined,
        REFRESH_TARGET: (target, targetToken) => ({target, targetToken}),
        REFRESH_TARGET_SUCCESS: undefined,
        REFRESH_TARGET_FAILURE: (status, data) => ({status, data}),
        CLEAR_ACTIVE_TICKET_NUMBER: undefined,
        UPDATE_TARGET_RESOURCES_WITH_CHILDREN: undefined
    },
    DOWNLOAD: {
        DOWNLOAD_RESOURCE: (resource, targetToken, isService, emailAddress) => ({resource, targetToken, isService, emailAddress}),
        DOWNLOAD_FROM_TARGET_SUCCESS: (data) => ({data}),
        DOWNLOAD_FROM_TARGET_FAILURE: (status, data) => ({ status, data }),
        DOWNLOAD_JOB: undefined,
        DOWNLOAD_JOB_SUCCESS: (data, status) => ({data, status}),
        DOWNLOAD_JOB_FAILURE: (status, data) => ({status, data}),
        CANCEL_DOWNLOAD: (targetToken) => ({targetToken}),
        CANCEL_DOWNLOAD_SUCCESS: undefined,
        CANCEL_DOWNLOAD_FAILURE: (status, data) => ({ status, data }),
        DOWNLOAD_FOR_SERVICE_SUCCESS: undefined,
        CLEAR_DOWNLOAD_DATA: undefined,
        DISPLAY_DOWNLOAD_MODAL: undefined,
        HIDE_DOWNLOAD_MODAL: undefined
    },
    UPLOAD: {
        UPLOAD_TO_TARGET: (target, file, duplicateAction, resourceToUploadTo, targetToken, emailAddress) =>
          ({target, file, duplicateAction, resourceToUploadTo, targetToken, emailAddress}),
        UPLOAD_TO_TARGET_SUCCESS: (data) => ({data}),
        UPLOAD_TO_TARGET_FAILURE: (status, data) => ({status, data}),
        UPLOAD_JOB: undefined,
        UPLOAD_JOB_SUCCESS: (data, status) => ({data, status}),
        UPLOAD_JOB_FAILURE: (status, data) => ({ status, data }),
        CANCEL_UPLOAD: (targetToken) => ({targetToken}),
        CANCEL_UPLOAD_SUCCESS: undefined,
        CANCEL_UPLOAD_FAILURE: (status, data) => ({ status, data }),
        CLEAR_UPLOAD_DATA: undefined,
        DISPLAY_UPLOAD_MODAL: (uploadType) => ({uploadType}),
        HIDE_UPLOAD_MODAL: undefined
    },
    TRANSFER: {
        SAVE_TRANSFER_TOKEN: (targetToken) => ({targetToken}),
        SAVE_TRANSFER_DESTINATION_TARGET: (target) => ({target}),
        LOAD_FROM_TRANSFER_TARGET: (target, targetToken) => ({target, targetToken}),
        LOAD_FROM_TRANSFER_TARGET_SUCCESS: undefined,
        LOAD_FROM_TRANSFER_TARGET_FAILURE: (status, data) => ({ status, data }),
        LOAD_FROM_TRANSFER_TARGET_PAGINATION: (url, pageNumber, targetToken) => ({url, pageNumber, targetToken}),
        LOAD_FROM_TRANSFER_TARGET_PAGINATION_SUCCESS: undefined,
        LOAD_FROM_TRANSFER_TARGET_PAGINATION_FAILURE: (status, data) => ({status, data}),
        SELECT_TRANSFER_RESOURCE: (resource, targetToken) => ({ resource, targetToken }),
        DESELECT_TRANSFER_RESOURCE: undefined,
        SELECT_TRANSFER_RESOURCE_SUCCESS: undefined,
        UPDATE_TRANSFER_TARGET_RESOURCES_WITH_CHILDREN: undefined,
        DISPLAY_TRANSFER_MODAL: undefined,
        HIDE_TRANSFER_MODAL: undefined,
        OPEN_TRANSFER_CONTAINER: container => ({container, open: true}),
        CLOSE_TRANSFER_CONTAINER: container => ({container, open: false}),
        TRANSFER_RESOURCE: (
          destinationTarget, destinationToken, sourceResource, duplicateAction, keywordAction, keywordList,
          resourceToTransferTo, sourceTarget, sourceTargetToken, emailAddress, fairshareAction) => ({
            destinationTarget, destinationToken, sourceResource,
            duplicateAction, keywordAction, keywordList, resourceToTransferTo, sourceTarget, sourceTargetToken, emailAddress, fairshareAction}),
        TRANSFER_SUCCESS: (data) => ({data}),
        TRANSFER_FAILURE: (status, data) => ({ status, data }),
        TRANSFER_JOB: undefined,
        TRANSFER_JOB_SUCCESS: (data, status) => ({data, status}),
        TRANSFER_JOB_FAILURE: (status, data) => ({ status, data }),
        CANCEL_TRANSFER: (sourceToken, destinationToken) =>
          ({sourceToken, destinationToken}),
        CANCEL_TRANSFER_SUCCESS: undefined,
        CANCEL_TRANSFER_FAILURE: (status, data) => ({ status, data }),
        CLEAR_TRANSFER_MODAL_DATA: undefined,
        CLEAR_TRANSFER_DATA: undefined,
        CLEAR_TRANSFER_TOKEN: undefined,
        CLEAR_TRANSFER_RESOURCE: undefined,
        CLEAR_TRANSFER_TARGET_RESOURCES: undefined,
        REFRESH_TRANSFER_TARGET: (destinationTarget, pageNumber, targetToken) => ({destinationTarget, pageNumber, targetToken}),
        REFRESH_TRANSFER_TARGET_SUCCESS: undefined,
        REFRESH_TRANSFER_TARGET_FAILURE: (status, data) => ({ status, data }),
        STEP_IN_TRANSFER_MODAL: (step) => ({ step })
    },
    TARGETS: {
        LOAD: undefined,
        LOAD_SUCCESS: undefined,
        SWITCH_TARGET: undefined,
        CLEAR_TARGET: undefined
    },
    STATUSES: {
        LOAD_STATUSES: undefined,
        LOAD_STATUSES_SUCCESS: undefined,
      },
    SERVICES: {
        LOAD_SERVICES: undefined,
        LOAD_SERVICES_SUCCESS: undefined,
        SELECT_SERVICE: (service) => ({service}),
        SELECT_SERVICE_SUCCESS: undefined,
        CLEAR_SERVICE: undefined
      },
    GITHUB: {
        DISPLAY_ISSUE_MODAL: undefined,
        HIDE_ISSUE_MODAL: undefined,
        SUBMIT_GITHUB_ISSUE: (title, body) => ({ title, body }),
        SUBMIT_GITHUB_ISSUE_SUCCESS: undefined,
        SUBMIT_GITHUB_ISSUE_FAILURE: undefined,
        CLEAR_GITHUB_ISSUE: undefined
    },
    EAASI: {
        DISPLAY_EAASI_MODAL: undefined,
        HIDE_EAASI_MODAL: undefined,
        SEND_EAASI_PROPOSAL: (sourceToken) => ({sourceToken}),
        SEND_EAASI_PROPOSAL_SUCCESS: undefined,
        SEND_EAASI_PROPOSAL_FAILURE: (data, status) => ({data, status}),
        GET_EAASI_PROPOSAL: (proposal_link) => ({proposal_link}),
        GET_EAASI_PROPOSAL_SUCCESS: (data, status) => ({data, status}),
        GET_EAASI_PROPOSAL_FAILURE: (data, status) => ({data, status}),
        CLEAR_EAASI_DATA: undefined
    },
    KEYWORDS: {
        DISPLAY_KEYWORD_MODAL: undefined,
        HIDE_KEYWORD_MODAL: undefined,
        GET_KEYWORDS: (resource, targetToken) => ({ resource, targetToken }),
        GET_KEYWORDS_SUCCESS: undefined,
        GET_KEYWORDS_FAILURE: (data, status) => ({ data, status }),
        SEND_KEYWORDS: (resource, targetToken, keywords) => ({ resource, targetToken, keywords }),
        SEND_KEYWORDS_SUCCESS: undefined,
        SEND_KEYWORDS_FAILURE: (data, status) => ({ data, status }),
        CLEAR_KEYWORD_DATA: undefined,
        CLEAR_KEYWORDS: undefined
    },
    BAGIT: {
        DISPLAY_BAGIT_MODAL: undefined,
        HIDE_BAGIT_MODAL: undefined,
        SUBMIT_BAGIT_FILE: (file) => ({file}),
        SUBMIT_BAGIT_FILE_SUCCESS: (data) => ({data}),
        SUBMIT_BAGIT_FILE_FAILURE: (data, status) => ({data, status}),
        CLEAR_BAGIT_DATA: undefined
    },
    FAIRSHARE: {
        DISPLAY_FAIRSHARE_MODAL: undefined,
        HIDE_FAIRSHARE_MODAL: undefined,
        DISPLAY_FAIRSHARE_TRANSFER_MODAL: undefined,
        HIDE_FAIRSHARE_TRANSFER_MODAL: undefined,
        SEND_FAIRSHARE_EVALUATION: (doi, testList, email) => ({doi, testList, email}),
        SEND_FAIRSHARE_EVALUATION_SUCCESS: undefined,
        SEND_FAIRSHARE_EVALUATION_FAILURE: (data, status) => ({ data, status }),
        CLEAR_FAIRSHARE_DATA: undefined,
        LOAD_FAIRSHARE_TESTS: undefined,
        LOAD_FAIRSHARE_TESTS_SUCCESS: undefined
    },
    FAIRSHAKE: {
        DISPLAY_FAIRSHAKE_MODAL: undefined,
        HIDE_FAIRSHAKE_MODAL: undefined,
        GET_FAIRSHAKE_RUBRIC: (rubric_id) => ({ rubric_id }),
        GET_FAIRSHAKE_RUBRIC_SUCCESS: undefined,
        GET_FAIRSHAKE_RUBRIC_FAILURE: (data, status) => ({ data, status }),
        SUBMIT_FAIRSHAKE_ASSESSMENT: (projectUrl, projectTitle, rubricAnswers, rubric_id) => (
            { projectUrl, projectTitle, rubricAnswers, rubric_id }),
        SUBMIT_FAIRSHAKE_ASSESSMENT_SUCCESS: undefined,
        SUBMIT_FAIRSHAKE_ASSESSMENT_FAILURE: (data, status) => ({ data, status }),
        CLEAR_FAIRSHAKE_DATA: undefined
    },
    ANNOUNCEMENTS: {
        GET_ANNOUNCEMENTS: undefined,
        GET_ANNOUNCEMENTS_SUCCESS: (data) => ({data})
    }
});
