import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import ThemeContext from '../../contexts/theme';

// Estilos del AuthLayout.
const ContainerDiv = styled.div`
    background-color: rgba(0, 0, 0, 0.25);
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url(${props => props.url});
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
`;

/**
 * Layout que permite abrazar los componentes hijos,
 * para que se pueda visualizar los estilos definidos
 * @param {children: any} Props Propiedades del componente.
 */
const AuthLayout = ({ children }) => {
    const { bg } = React.useContext(ThemeContext)
    return <ContainerDiv url={bg.url}>{children}</ContainerDiv>;
};
AuthLayout.propTypes = {
    children: PropTypes.any.isRequired
};
export default AuthLayout;
