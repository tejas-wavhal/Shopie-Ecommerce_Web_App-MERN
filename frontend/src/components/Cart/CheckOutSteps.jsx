import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const steps = ['Shipping Details', 'Comfirm Order', 'Payment'];

export default function HorizontalLinearStepper({activeStep}) {

  return (
    <section className='mx-1 mt-5 lg:mx-10 lg:mt-10'>
      <Box sx={{ width: '100%', color: '#ff5a1f' }}>
        <Stepper activeStep={activeStep}
          sx={{
            '& .MuiStepLabel-root .Mui-completed': {
              color: 'green', // circle color (COMPLETED)
            },
            '& .MuiStepLabel-root .Mui-active': {
              color: '#ff5a1f', // circle color (ACTIVE)
            },
          }}
        >
          {steps.map((label) => {
            const stepProps = {};
            const labelProps = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Box>
    </section>
  );
}