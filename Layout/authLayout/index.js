import React from 'react';
import { flexCenterRow } from '../../styles';
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

const ContainerDiv = styled.div`
 background-color: rgba(0, 0, 0, 0.25);
background-repeat: no-repeat;
background-size: cover;
background-image: url('/static/img/authLayout.jpg');
display: flex;
justify-content: center;
align-items: center;
min-Height: 100vh;


`

const AuthLayout = ({children}) => {
    return (
        
            <ContainerDiv >
                {children}
            </ContainerDiv>
       


    );
}
AuthLayout.propTypes = {
    children: PropTypes.any.isRequired
  }
export default AuthLayout;