import React from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';
import AuthContext from '../../contexts/auth';
import { useRouter } from 'next/router';
import AuthLayout from '../../Layout/authLayout';
import AlertContext from '../../contexts/alert';

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

    .signIn {
        background-color: #0d283d;
        border-color: #0d283d;
        width: 100%;
        border-radius: 5px;
        margin-bottom: 15px;
        padding: 15px;
        font-size: 14px;
        overflow: hidden;
        color: #fff;
        text-align: center;
        border: 1px solid;
    }
    .createAccount {
        text-decoration: none;
        cursor: pointer;
        color: #0d283d;
        border-color: #0d283d;
        border: 1px solid;
        width: 100%;
        border-radius: 5px;
        margin-bottom: 10px;
        font-size: 14px;
        overflow: hidden;
        text-align: center;
    }
`;
const FormGroup = styled.div`
    width: 100%;
    position: relative;

    span {
        color: #646777;
        display: inline-block;
    }

    .formformgroupfield {
        width: 100%;
        display: flex;
        margin: auto;
    }
    .formformgroupicon {
        background: #f2f4f7;
        border: 1px solid #f2f4f7;
        padding: 6px;
        height: 32px;
    }
    input {
        width: 100%;
        padding: 5px 10px;
        margin: 0px 0px 10px 10px;
        font-size: 15px;
        height: 42px;
        transition: border 0.3s;
        background: transparent;
        border: 1px solid #646777;
        color: #646777;
    }
    .formformgrouplabel {
        color: #646777;
        display: inline-block;
    }
    button {
        background: #f2f4f7;
        border: 1px solid #f2f4f7;
        cursor: pointer;
        padding: 4px;
        height: 32px;
    }
    .accountforgotpassword {
        margin: 1rem;
        font-size: 15px;
        line-height: 15px;

        a {
            text-decoration: none;
            color: #0d283d;
        }
    }
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
 * Página para recuperación de contraseña.
 *
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
                    <FormGroup>
                        <span>Correo Electrónico</span>
                        <div className="formformgroupfield">
                            <input
                                onChange={handlenOnchange}
                                name="email"
                                type="text"
                                placeholder="Correo Electrónico de recuperación."
                            />
                        </div>
                    </FormGroup>

                    <Link href={'/auth'}>
                        <a className="createAccount">Regresar al inicio</a>
                    </Link>
                    <button type="submit" className="signIn">
                        Enviar Correo
                    </button>
                </Form>
            </AccountCard>
        </AuthLayout>
    );
};

export default RecoverPassword;
