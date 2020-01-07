/** @jsx jsx */
import {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import { jsx, css } from '@emotion/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';

import textStyles from '../../styles/text';
import { basicFadeIn, basicFadeOut } from '../../styles/animations';
import useAnimatedState from '../../hooks/useAnimatedState';
import { useDispatch, useSelector } from 'react-redux';
import FileSaver from 'file-saver';
import { actionCreators } from '../../redux/actionCreators';
import Spinner from '../widgets/Spinner';

const styles = {
  darkenBackground: css({
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1040,
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
    opacity: 0.5
  }),
  modalContainer: css({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    padding: '.5rem',
    top: 0,
    left: 0,
    zIndex: 1050,
    width: '100%',
    height: '100%'
  }),
  modal: css({
    zIndex: 100,
    background: 'white',
    position: 'relative',
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'column',
    width: '50%'
  }),
  modalHeader: css({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexBasis: 50,
    padding: 20,
    backgroundColor: 'rgba(229, 123, 0,1)',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  }),
  button: css({
    backgroundColor: 'rgba(0, 76, 168, 1)',
    color: 'white',
    border: 'none',
    borderRadius: 5
  }),
  disabledButton: css({
    backgroundColor: 'rgba(108, 133, 163, 1)',
    color: 'white',
    border: 'none',
    borderRadius: 5
  }),
  fadeIn: css({
    animationFillMode: 'forwards',
    animationName: `${basicFadeIn}`,
    animationDuration: '.4s'
  }),
  fadeOut: css({
    animationFillMode: 'forwards',
    animationName: `${basicFadeOut}`,
    animationDuration: '.4s'
  })
};

/**
 * This component handles the download modal.
 * It is responsible for showing the user that the download is pending and presenting
 * any errors that may occur during download.
 **/
export default function DownloadModal({ modalActive, toggleModal }) {
  const dispatch = useDispatch();

  /** SELECTOR DEFINITIONS
   * sourceDownloadContents : Object representing the blob content returned from the download call
   * sourceDownloadStatus   : String status of the status of the download/
   *                          [null, 'pending', 'successful', 'failure']
   **/
  const sourceDownloadContents = useSelector(
    state => state.resources.sourceDownloadContentxs);
  const sourceDownloadStatus = useSelector(state => state.resources.sourceDownloadStatu);

  const [state, transitionIn, transitionOut] = useAnimatedState(modalActive);
  const [modalMessage, setModalMessage] = useState('' +
    'The download is being processed on the server. Please do not leave the page.');

  /**
   * Watch for the modal states to change and open modal.
   **/
  useEffect(() => {
    if (modalActive && !state.desiredVisibility && !state.animating) {
      transitionIn();
    }
  }, [modalActive, state.animating, state.desiredVisibility, transitionIn]);

  /**
   * Watch for the sourceDownloadStatus to change to 'failure' or 'success'.
   * If 'failure' then update the modal message
   * If 'success' then use FileSaver to download the file and transition the modal to close.
   **/
  useEffect(() => {
    // Download failed
    if (sourceDownloadStatus === 'failure') {
      setModalMessage(
        'Download returned a ' +
        sourceDownloadContents.status_code +
        ' status code. ' +
        sourceDownloadContents.message)
    }
    // Download successful
    else if (sourceDownloadStatus === 'success') {
      FileSaver.saveAs(sourceDownloadContents, 'PresQT_Download.zip');
      transitionOut(() => {
        onModalClose();
      })
    }
  }, [sourceDownloadStatus]);

  /**
   *  Close the modal.
   *  Dispatch clearDownloadData to clear download data from state.
   **/
  const onModalClose = () => {
    toggleModal();
    setModalMessage('The download is being processed on the server. Please do not leave the page.');
    dispatch(actionCreators.resources.clearDownloadData());
  };

  return modalActive
    ? ReactDOM.createPortal(
        <div
          css={
            state.currentVisibility || state.desiredVisibility
              ? { display: 'initial' }
              : { display: 'none' }
          }
        >
          <div
            css={state.desiredVisibility ? styles.fadeIn : styles.fadeOut}
            onAnimationEnd={() => {
              state.endAnimationCallback();
            }}
          >
            <div css={styles.darkenBackground} />
            <div css={styles.modalContainer} aria-modal aria-hidden>
              <div css={styles.modal}>
                <div css={styles.modalHeader}>
                  <span css={textStyles.modalTitle}>
                    {sourceDownloadStatus === 'failure'
                      ? 'Download Failed!'
                      : 'Download In Progress'}
                  </span>
                  <div
                    onClick={() =>
                      transitionOut(() => {
                        onModalClose();
                      })
                    }
                  >
                    <FontAwesomeIcon icon={faWindowClose} inverse size='lg' />
                  </div>
                </div>
                <div
                  css={{
                    padding: 20,
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <p css={[textStyles.body, { marginBottom: 50 }]}>
                    {modalMessage}
                  </p>
                  {sourceDownloadStatus === 'pending' ||
                  sourceDownloadStatus == null ? (
                    <Spinner />
                  ) : null}
                  <div
                    css={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      flexBasis: 35
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )
    : null;
}
