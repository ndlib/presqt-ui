import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import colors from "../../styles/colors";

const useStyles = makeStyles(theme => ({
  formControl: {
    marginLeft: theme.spacing(1),
  },
  checked: {
  },
  radio: {
    '&$checked': {
      color: colors.presqtBlue,
      '&:hover': {
        backgroundColor: colors.presqtTintedBlue
      }
    },
    '&:hover': {
      backgroundColor: colors.presqtTintedBlue
    }
  },
}));

/**
 * Component for the duplicate action radio buttons in the upload stepper
 **/
export default function UploadDuplicateActionRadioButtons({selectedDuplicate, setSelectedDuplicate}) {
  const classes = useStyles();

  /**
   * When a new duplicate action is selected update the selectedDuplicate state to the new selection
   **/
  const handleChange = event => {
    setSelectedDuplicate(event.target.value)
  };

  return (
    <div>
      <FormControl component="fieldset" className={classes.formControl}>
        <RadioGroup
          aria-label="Duplicate Actions"
          value={selectedDuplicate}
          onChange={handleChange}
          onAnimationEnd={(event) => {event.stopPropagation()}}
        >
          <FormControlLabel
            value="ignore"
            control={<Radio classes={{root: classes.radio, checked: classes.checked}}/>}
            label="Ignore"
          />
          <FormControlLabel
            value="update"
            control={<Radio classes={{root: classes.radio, checked: classes.checked}}/>}
            label="Update"
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
}