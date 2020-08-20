import React from 'react';
import AuthLayout from '../../Layout/authLayout';
import LogInForm from '../../containers/Login';

const AuthLogin = () => {
    return (
        <AuthLayout>
            <LogInForm />
        </AuthLayout>
    );
};

export default AuthLogin;
