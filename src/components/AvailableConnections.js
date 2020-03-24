/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { actionCreators } from '../redux/actionCreators';
import text from '../styles/text';
import colors from '../styles/colors';
import { basicFadeIn } from '../styles/animations';
import mainStyles from "../styles/main";
import getError from "../utils/getError";

/**
 * This component displays the various targets that a user can connect with.
 * It's responsible for switching targets, handing off resource loading, displaying the token modal.
 */
export default function AvailableConnections() {
  const dispatch = useDispatch();

  const pendingAPIResponse = useSelector(state => state.pendingAPIResponse);
  const apiTokens = useSelector(state => state.apiTokens);
  const selectedTarget = useSelector(state => state.selectedTarget);
  const availableTargets = useSelector(state => state.available);
  const apiOperationErrors = useSelector(state => state.apiOperationErrors);
  const downloadStatus = useSelector(state => state.downloadStatus);
  const uploadStatus = useSelector(state => state.uploadStatus);

  const collectionError = getError(actionCreators.resources.loadFromTarget);
  const tokenError = collectionError && collectionError.status === 401;

  /**
   * Dispatch load action on page-load.
   * Dispatch load services on page-load.
   */
  useEffect(() => {
    dispatch(actionCreators.targets.load());
    dispatch(actionCreators.services.loadServices());
  }, [dispatch]);

  /**
   * Watch for a change in apiOperationErrors.
   * If a exists in apiOperationErrors then display the modal.
   **/
  useEffect(() => {
    if (apiOperationErrors.length > 0 && tokenError) {
        dispatch(actionCreators.authorization.displayTokenModal());
    }
  }, [apiOperationErrors]);

  /**
   * Set the selected target as the source target.
   * If a connection already exists with the target then dispatch loadFromTarget action.
   * Else display the modal.
   */
  const handleSwitchTarget = connection => {
    dispatch(actionCreators.resources.clearResources());

    dispatch(actionCreators.resources.removeFromErrorList(
      actionCreators.resources.loadFromTarget.toString()));
    dispatch(actionCreators.resources.removeFromErrorList(
      actionCreators.resources.loadFromTargetSearch.toString()));

    dispatch(actionCreators.targets.switchTarget(connection));

    if (connection.name in apiTokens) {
      dispatch(actionCreators.resources.loadFromTarget(connection,apiTokens[connection.name]));
    }
    else {
      setTimeout(() => dispatch(actionCreators.authorization.displayTokenModal()), 500);
    }
  };

  return (
    <div
      css={{
        gridArea: 'availableConnections',
        paddingLeft: 50
      }}
    >
      <span css={text.mediumHeader}>Available Connections</span>
      <div css={{ display: 'flex', flexDirection: 'row', paddingTop: 10 }}>
        {availableTargets.map(connection => (
          <button
            key={connection.name}
            css={[
              {
                backgroundColor: 'white',
                border: 'none',
                paddingLeft: 5,
                paddingRight: 10,
                cursor: "pointer"
              },
              pendingAPIResponse || downloadStatus === 'pending' || uploadStatus === 'pending'
                ? { cursor: 'not-allowed', opacity: 0.5 }
                : mainStyles.hoverOrFocusTransform
            ]}
            onClick={() => handleSwitchTarget(connection)}
            disabled={
              pendingAPIResponse || downloadStatus === 'pending' || uploadStatus === 'pending'
            }
          >
            <img
              src={require(`../images/available_connections/${connection.name}.png`)}
              alt={connection.readable_name}
            />
            {selectedTarget && selectedTarget.name === connection.name ? (
              <div
                css={{
                  minHeight: 5,
                  marginTop: 5,
                  backgroundColor: colors.presqtOrange,
                  animation: `${basicFadeIn} 1s`
                }}
              >
              </div>
            ) : null}
          </button>
        ))}
      </div>
    </div>
  );
}
