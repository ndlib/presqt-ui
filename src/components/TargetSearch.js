/** @jsx jsx */
import { jsx } from "@emotion/core";
import {useState} from "react";
import { actionCreators } from "../redux/actionCreators";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import SearchTextField from "./widgets/text_fields/SearchTextField";

const useStyles = makeStyles({
  root: {
    "& > *": {
      marginTop: 10,
      width: 250
    }
  }
});

export default function TargetSearch() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const selectedTarget = useSelector(state => state.selectedTarget);
  const token = useSelector(state => state.apiTokens)[selectedTarget.name];

  const [searchValue, setSearchValue] = useState('');


  const submitSearch = (event) => {
    event.preventDefault();
    dispatch(
      actionCreators.resources.removeFromErrorList(
        actionCreators.resources.loadFromTargetSearch.toString()
      )
    );
    dispatch(
      actionCreators.resources.loadFromTargetSearch(
        selectedTarget.name,
        token,
        searchValue
      )
    );
  };

  return (
    <div css={{ marginBottom: 10 }}>
      <form
        onSubmit={event => submitSearch(event)}
        className={classes.root}
        noValidate
        autoComplete="off"
      >
        <SearchTextField
          size="small"
          type="text"
          id="outlined-basic"
          label={"Search " + selectedTarget.readable_name}
          variant="outlined"
          value={searchValue}
          onChange={event => setSearchValue(event.target.value)}
        />
      </form>
    </div>
  );
}
