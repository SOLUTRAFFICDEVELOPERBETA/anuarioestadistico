import { Box, Typography } from '@material-ui/core';
import '@testing-library/jest-dom';
import { shallow } from 'enzyme';
import React from 'react';
import StepperContainer from '../../components/StepperContainer';

describe('Pruebas en el componente <StepperContainer/>', () => {
    const onOver = jest.fn();
    const wrapper = shallow(
        <StepperContainer
            id={`guide-help-pruebas`}
            StepperConfig={[
                { label: 'Datos' },
                
            ]}
            onOver={onOver}
        >
            <Box>
                <Typography>Datos</Typography>
            </Box>
           
            
        </StepperContainer>
    )

    test('debe mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    });


    test('No debe llamar la función onOver()', ()=> {
        const wrapper = shallow(
            <StepperContainer
                id={`guide-help-pruebas`}
                StepperConfig={[
                    { label: 'Datos' },
                    { label: 'Tipos' },
                    
                ]}
                onOver={onOver}
            >
                <Box>
                    <Typography>Datos</Typography>
                </Box>
                <Box>
                    <Typography>tipos</Typography>
                </Box>
               
                
            </StepperContainer>
        )
        wrapper.find('WithStyles(ForwardRef(Button))').at(1).prop('onClick')();
        expect(onOver).not.toHaveBeenCalled();
        
    })


    test('debe llamar la función onOver()', () => {
        wrapper.find('WithStyles(ForwardRef(Button))').at(1).prop('onClick')();
        expect(onOver).toHaveBeenCalled();
        expect(onOver).toHaveBeenCalledTimes(1);
    })

   
})