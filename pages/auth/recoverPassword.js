import React from 'react';
import styled from '@emotion/styled';
import AuthContext from '../../contexts/auth';
import { useRouter } from 'next/router';
import AuthLayout from '../../Layout/authLayout';
import AlertContext from '../../contexts/alert';
import { Button, ButtonGroup, TextField } from '@material-ui/core';

// Estilos del componente
const AccountCard = styled.div`
    background-color: #ffffff;
    padding: 10px 40px;
    max-width: 520px;
    width: 100%;
    border-radius: 10px;
`;
const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
`;

const AccountHead = styled.div`
    margin-bottom: 30px;
    padding-left: 10px;
    border-left: 4px solid #0d283d;
    h3 {
        color: #646777;
        font-size: 24px;
        line-height: 32px;

        .accountlogoaccent {
            color: #0d283d;
        }
    }
`;

/**
 * @description Página para recuperación de contraseña.
 * @see Link
 */
const RecoverPassword = () => {
    const Router = useRouter();
    const { passwordReset } = React.useContext(AuthContext);
    const { showMessage } = React.useContext(AlertContext);
    const [email, setEmail] = React.useState('');
    const handlenOnchange = (e) => {
        setEmail(e.target.value);
    };
    const handlenSubmit = (e) => {
        e.preventDefault();
       
      
        if (email.trim() === '') {
            showMessage('El Correo es Obligatorio', 'warning');
            return;
        }
        passwordReset(email);
        Router.push('/auth');
    };
    return (
        <AuthLayout>
            <AccountCard>
                <AccountHead>
                    <h3>
                        <span className="accountlogoaccent">Recuperación de Contraseña</span>
                    </h3>
                </AccountHead>
                <Form onSubmit={handlenSubmit}>

                    <TextField
                        variant="outlined"
                        fullWidth
                        margin="dense"
                        label="Correo Electrónico"
                        onChange={handlenOnchange}
                        name="email"
                        type="text"
                        placeholder="Correo Electrónico de recuperación."
                    />


                    <ButtonGroup
                        orientation="vertical"
                        fullWidth
                        size="medium"
                        style={{ margin: '10px 0' }}>
                        <Button
                            color="primary"
                            type="submit"
                            variant="contained">
                            Enviar Correo
                    </Button>
                        <Button
                            onClick={() => Router.push('/auth')}
                            color="primary"
                            variant="text">
                            Regresar al inicio
                        </Button>

                    </ButtonGroup>
                </Form>
            </AccountCard>
        </AuthLayout>
    );
};

export default RecoverPassword;
