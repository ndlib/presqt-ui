/** @jsx jsx */
import { jsx } from "@emotion/core";
import textStyles from "../../../styles/text";
import {Fragment} from "react";
import {actionCreators} from "../../../redux/actionCreators";
import {useSelector} from "react-redux";

const closedFolderIcon = require("../../../images/icons/closedFolder.png");
const openFolderIcon = require("../../../images/icons/openFolder.png");
const fileIcon = require("../../../images/icons/file.png");
const presqtMetadataFileIcon = require("../../../images/icons/presqtMetadataFile.png");
const rectangle = require("../../../images/icons/rectangle.png");

export default function ResourceButton({resource, level, onClick }) {
  const pendingAPIOperations = useSelector(state => state.pendingAPIOperations);

  const iconSelector = () => {
    if (resource.kind === "container") {
      if (resource.open) {
        return openFolderIcon;
      }
      else {
        return closedFolderIcon;
      }
    }
    else if (resource.title === "PRESQT_FTS_METADATA.json" || resource.title === "INVALID_PRESQT_FTS_METADATA.json") {
        return presqtMetadataFileIcon;
    }
    else {
        return fileIcon;
    }
  };

  return (
    <button
      css={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 10,
        paddingLeft: 10 * level,
        borderWidth: 0,
        backgroundColor: "#FFFFFF",
        overflowWrap: "anywhere",
        textAlign: "left",
        cursor: pendingAPIOperations.indexOf(actionCreators.resources.selectResource.toString()) > -1 ? "not-allowed" : "pointer",
      }}
      onClick={() => onClick(resource)}
      disabled={pendingAPIOperations.indexOf(actionCreators.resources.selectResource.toString()) > -1}
    >
      {
        resource.active
        ? <Fragment>
            <img
              src={rectangle}
              alt={"Rectangle Icon"}
              css={{marginLeft: -7, height: 25}}
            />
            <img
              id="selectedIcon"
              src={iconSelector()}
              alt="Resource Icon"
              css={{ marginLeft: 4.33, paddingRight: 10, height: 25 }}
            />
        </Fragment>
        : <img
            src={iconSelector()}
            alt="Resource Icon"
            css={{ paddingRight: 10, height: 25 }}
          />
      }

      <span css={[textStyles.listItem, {cursor: pendingAPIOperations.indexOf(actionCreators.resources.selectResource.toString()) > -1 ? "not-allowed" : "pointer"}]}>{resource.title}</span>
    </button>
  );
}
