import React from 'react';
import PropTypes from 'prop-types';
import { Button, makeStyles, Step, StepContent, StepLabel, Stepper } from '@material-ui/core';

// Estilos del componente
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%'
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1)
    },
    actionsContainer: {
        marginBottom: theme.spacing(2)
    }
}));

/**
 * Componente que permite utilizar un Stepper con configuración sencilla
 * @param {{ id: string, children: any, StepperConfig: any, onOver: () => func }} props Propiedades del componente
 */
const StepperContainer = ({ id, children, StepperConfig, onOver }) => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);

    // Método para avanzar en el stepper
    const handleNext = () => {
        if (activeStep === stepCount - 1) {
            onOver();
        } else {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    // Método para retroceder en el stepper
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const stepCount = React.Children.count(children);

    return (
        <React.Fragment>
            <div className={classes.root}>
                <Stepper activeStep={activeStep} orientation="vertical">
                    {React.Children.map(children, (child, index) => {
                        const { label = '' } = StepperConfig[index] || {};
                        return (
                            <Step key={`step-${id}-${index}`}>
                                <StepLabel onClick={() => setActiveStep(index)}>{label}</StepLabel>
                                <StepContent>
                                    {child}
                                    <div className={classes.actionsContainer}>
                                        <div>
                                            <Button
                                                disabled={activeStep === 0}
                                                onClick={handleBack}
                                                className={classes.button}>
                                                Volver
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={handleNext}
                                                className={classes.button}>
                                                {activeStep === stepCount - 1
                                                    ? 'Terminar'
                                                    : 'Siguiente'}
                                            </Button>
                                        </div>
                                    </div>
                                </StepContent>
                            </Step>
                        );
                    })}
                </Stepper>
            </div>
        </React.Fragment>
    );
};

StepperContainer.propTypes = {
    id: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    StepperConfig: PropTypes.array,
    onOver: PropTypes.func
};

StepperContainer.defaultProps = {
    StepperConfig: [],
    onOver: () => console.log('Fin')
};

export default StepperContainer;
