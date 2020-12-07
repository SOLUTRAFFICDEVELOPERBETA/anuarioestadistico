import React from 'react';
import AuthLayout from '../../Layout/authLayout';
import LogInForm from '../../containers/Login';

/**
 * @description Página de autenticación
 * @see AuthLayout
 * @see LogInForm
 */
const AuthLogin = () => {
    return (
        <AuthLayout>
            <LogInForm />
        </AuthLayout>
    );
};

export default AuthLogin;
