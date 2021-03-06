/** @jsx jsx */
import React, {useState} from 'react';
import { jsx } from '@emotion/core';
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import UploadSelectFile from "./UploadSelectFile";
import DuplicateActionRadioButtons from "../widgets/buttons/duplicateActionRadioButtons";
import UploadAgreement from "./UploadAgreement";
import UploadResultsContent from "./UploadResultsContent";
import UploadStepConnector from "./UploadStepConnector";
import StepContent from "@material-ui/core/StepContent";
import withStyles from "@material-ui/core/styles/withStyles";
import StepperBackButton from "../widgets/buttons/stepperBackButton";
import UploadStepperNextButton from "./UploadStepperNextButton";
import colors from "../../styles/colors";
import UploadButton from "./UploadButton";

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

const possibleSteps = [
  'Select a file to upload. Note: The file must be a Zip file in BagIt format',
  'Select the action to occur when a duplicate resource is found',
  'Upload Agreement',
  'Email Opt-In',
  'Results'
];

function getSteps(uploadType) {
  if (uploadType === "NEW") {
    return [...possibleSteps.slice(0, 1), ...possibleSteps.slice(2, 5)];
  }
  else {
    return possibleSteps;
  }
}

/**
 * This component renders the stepper for the Upload Modal.
 **/
export default function UploadStepper({resourceToUploadTo, uploadType}) {
  const classes = useStyles();
  const steps = getSteps(uploadType);

  const [activeStep, setActiveStep] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedDuplicate, setSelectedDuplicate] = useState('ignore');
  const [emailValue, setEmailValue] = useState("");

  /**
   * Decrement the step count when the Back button is pressed
   **/
  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  /**
   * Increment the step count when the Back button is pressed
   **/
  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  /**
   * Define the contents for each step. getSteps() defines the text for the step while this
   * function defines the contents.
   **/
  function getStepContent(step) {
    switch (step) {
      case 0: {
        return <UploadSelectFile
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
        />;
      }
      case 1:
        if (uploadType === 'NEW') {
          return <UploadAgreement
            handleNext={handleNext}
            resourceToUploadTo={resourceToUploadTo}
          />;
        }
        else {
          return <DuplicateActionRadioButtons
            selectedDuplicate={selectedDuplicate}
            setSelectedDuplicate={setSelectedDuplicate}
          />;
        }
      case 2:
        if (uploadType === 'NEW') {
          return <UploadButton
          selectedFile={selectedFile}
          selectedDuplicate={selectedDuplicate}
          handleNext={handleNext}
          resourceToUploadTo={resourceToUploadTo}
          emailValue={emailValue}
          setEmailValue={setEmailValue}
          />;
        }
        else {
          return <UploadAgreement
            handleNext={handleNext}
            resourceToUploadTo={resourceToUploadTo}
          />;
        }
      case 3:
        if (uploadType === 'NEW') {
          return <UploadResultsContent
            setActiveStep={setActiveStep}
            setSelectedFile={setSelectedFile}
            selectedFile={selectedFile}
            selectedDuplicate={selectedDuplicate}
            resourceToUploadTo={resourceToUploadTo}
            emailValue={emailValue}
          />;
        }
        else {
          return <UploadButton
            selectedFile={selectedFile}
            selectedDuplicate={selectedDuplicate}
            handleNext={handleNext}
            resourceToUploadTo={resourceToUploadTo}
            emailValue={emailValue}
            setEmailValue={setEmailValue}
          />;
        }
      case 4:
        if (uploadType !== "NEW") {
          return <UploadResultsContent
            setActiveStep={setActiveStep}
            setSelectedFile={setSelectedFile}
            selectedFile={selectedFile}
            selectedDuplicate={selectedDuplicate}
            resourceToUploadTo={resourceToUploadTo}
            emailValue={emailValue}
          />;
        }
    }
  }

  return (
    <div className={classes.root}>
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
              <div className={classes.actionsContainer}>
                <div>
                  {possibleSteps.indexOf(label) !== 4
                    ? <StepperBackButton
                      handleBack={handleBack}
                      activeStep={activeStep}
                    />
                    : null }
                  {possibleSteps.indexOf(label) === 0 || possibleSteps.indexOf(label) === 1 || possibleSteps.indexOf(label) === 2
                    ? <UploadStepperNextButton
                          handleNext={handleNext}
                          activeStep={activeStep}
                          selectedFile={selectedFile}
                          steps={steps}
                        />
                  : null }
                </div>
              </div>
            </PresQTStepContent>
          </Step>
        ))}
      </Stepper>
    </div>
  )
}