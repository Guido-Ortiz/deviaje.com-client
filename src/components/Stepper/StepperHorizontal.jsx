import React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const steps = [
  'Select a flight',
  'Complete passengers information',
  'Pay',
];

export default function HorizontalLabelPositionBelowStepper({step}) {
  return (
    <Box sx={{ width: '100%', marginTop: '30px', marginBottom: '30px' }}>
      <Stepper activeStep={step} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
