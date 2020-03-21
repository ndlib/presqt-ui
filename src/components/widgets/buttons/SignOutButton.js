/** @jsx jsx */
import { useSelector, useDispatch } from "react-redux";
import { jsx } from "@emotion/core";
import textStyles from "../../../styles/text";
import { actionCreators } from "../../../redux/actionCreators";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import colors from "../../../styles/colors";
import Tooltip from "@material-ui/core/Tooltip";


export default function SignOutButton() {
  const dispatch = useDispatch();

  const selectedTarget = useSelector(state => state.selectedTarget);

  const signOut = () => {
    dispatch(actionCreators.resources.clearResources());
    dispatch(actionCreators.authorization.removeToken(selectedTarget.name));
    dispatch(actionCreators.targets.clearTarget());
  };

  return (
    <Tooltip title={`Sign out of ${selectedTarget.readable_name}`} arrow placement="right">
      <ExitToAppIcon
        css={{
          cursor: "pointer",
          color: colors.presqtBlue,
          paddingLeft: 5
        }}
        onClick={signOut}/>
    </Tooltip>
  );
}
