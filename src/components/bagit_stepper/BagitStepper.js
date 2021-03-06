import Stepper from "@material-ui/core/Stepper";
import UploadStepConnector from "../upload_stepper/UploadStepConnector";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Typography from "@material-ui/core/Typography";
import React, {useState} from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import colors from "../../styles/colors";
import StepContent from "@material-ui/core/StepContent";
import makeStyles from "@material-ui/core/styles/makeStyles";
import BagitSelectFile from "./BagitSelectFile";
import BagitResults from "./BagitResults";

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
  iconActive: {
    fill: colors.presqtBlue,
  },
  iconCompleted: {
    fill: colors.presqtBlue,
  },
}));

const PresQTStepContent = withStyles({
  root: {
    borderColor: colors.presqtBlue,
  },
})(StepContent);

const steps = [
  'Select a Zip file of contents to put in BagIt format. Once complete, the download will begin.',
  'Results'
];

export default function BagitStepper() {
  const classes = useStyles();

  const [activeStep, setActiveStep] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);

  function getStepContent(step) {
    switch (step) {
      case 0: {
        return <BagitSelectFile
          setActiveStep={setActiveStep}
          setSelectedFile={setSelectedFile}
          selectedFile={selectedFile}
        />
      }
      case 1: {
        return <BagitResults
          selectedFile={selectedFile}
        />
      }
    }
  }

  return (
    <div>
      <Stepper
        activeStep={activeStep}
        orientation="vertical"
        connector={<UploadStepConnector />}
      >
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel
              StepIconProps={{classes:
                  {active: classes.iconActive, completed: classes.iconCompleted}}}
            >
              {label}
            </StepLabel>
            <PresQTStepContent>
              <Typography
                component={'div'}
              >
                {getStepContent(index)}
              </Typography>
            </PresQTStepContent>
          </Step>
        ))}
      </Stepper>
    </div>
  )
}