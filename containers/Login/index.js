import React from 'react';
import EyeIcon from 'mdi-react/EyeIcon';
import KeyVariantIcon from 'mdi-react/KeyVariantIcon';
import AccountOutlineIcon from 'mdi-react/AccountOutlineIcon';
import styled from '@emotion/styled';
import AlertContext from '../../contexts/alert';
import AuthContext from '../../contexts/auth';
import Link from 'next/link';
import { css } from '@emotion/core';
import { ButtonGroup, Button } from '@material-ui/core';
import { useRouter } from 'next/router';

// Estilos del Formulario
const Form = styled.form`
    display: flex;
    flex-wrap: wrap;

    .signIn {
        padding: 15px;
        background-color: #0d283d;
        border-color: #0d283d;
        width: 100%;
        border-radius: 5px;
        margin-bottom: 15px;
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
        margin-bottom: 20px;
        font-size: 14px;
        overflow: hidden;
        text-align: center;
    }
`;

const AccountCard = styled.div`
    background-color: #ffffff;
    padding: 10px 40px;
    max-width: 520px;
    width: 100%;
    border-radius: 10px;
`;

const AccountHead = styled.div`
    margin-bottom: 30px;
    padding-left: 10px;
    border-left: 4px solid #0d283d;

    h3 {
        color: #646777;
        font-size: 24px;
        line-height: 32px;

        .accountlogo {
            font-weight: 700;
            padding-left: 5px;
        }
        .accountlogoaccent {
            color: #0d283d;
        }
    }
    h4 {
        font-size: 12px;
        color: #999999;
        line-height: 16px;
    }
`;
// Estilos del Input
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
        font-size: 12px;
        height: 42px;
        transition: border 0.3s;
        background: transparent;
        border: 1px solid #f2f4f7;
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
`;

/**
 * @param Componente que permite el inicio de sesión al usuario.
 * @see Link
 * Consulte los elementos utilizados en {@link https://material-ui.com/ | Material-ui}
 * consulte los estilos del componente en {@link https://emotion.sh/docs/styled | Emotion}
 */
const LogInForm = () => {
    const { showMessage } = React.useContext(AlertContext);
    const { onLogIn } = React.useContext(AuthContext);
    const [showPassword, setShowPassword] = React.useState(false);
    const [data, setData] = React.useState({
        password: '',
        email: ''
    });
    const Router = useRouter()
    // Método para mostrar la contraseña.
    const fshowPassword = (e) => {
        e.preventDefault();
        setShowPassword(!showPassword);
    };

    const handlenSubmit = (e) => {
        e.preventDefault();
        const { password, email } = data;

        if (email.trim() === '' && password.trim() === '') {
            showMessage('Todos los campos son obligatorios', 'warning');
            return;
        }

        onLogIn(email, password);
    };

    const handlenOnchange = (e) => {
        const { value, name } = e.target;
        setData({ ...data, [name]: value });
    };

    return (
        <AccountCard>
            <AccountHead>
                <h3>
                    Bienvenido a<span className="accountlogo">Anuario-</span>
                    <span className="accountlogoaccent">Estadístico</span>
                </h3>
                <h4>Región Ordenada, Conectada y Sostenible</h4>
            </AccountHead>

            <Form onSubmit={handlenSubmit}>
                <FormGroup>
                    <span>Nombre del usuario</span>
                    <div className="formformgroupfield">
                        <div className="formformgroupicon">
                            <AccountOutlineIcon />
                        </div>
                        <input
                            onChange={handlenOnchange}
                            name="email"
                            type="text"
                            placeholder="Correo..."
                        />
                    </div>
                </FormGroup>
                <FormGroup>
                    <span className="formformgrouplabel">Contraseña</span>
                    <div className="formformgroupfield">
                        <div className="formformgroupicon">
                            <KeyVariantIcon />
                        </div>
                        <input
                            onChange={handlenOnchange}
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Contraseña..."
                        />
                        <button
                            className="formgroupbutton"
                            onClick={(e) => fshowPassword(e)}
                            type="button">
                            <EyeIcon />
                        </button>
                    </div>
                    <Link
                        href={'/auth/recoverPassword'}
                        css={css`
                            margin: 1rem;
                            font-size: 15px;
                            line-height: 15px;
                        `}>
                        <a
                            css={css`
                                text-decoration: none;
                                color: #0d283d;
                            `}>
                            Olvidaste tu contraseña?
                        </a>
                    </Link>
                </FormGroup>
                <ButtonGroup

                    orientation="vertical"
                    size="large"
                    fullWidth
                    style={{ margin: '10px 0' }}>
                    <Button
                        color="primary"
                        type="submit"
                        variant="contained">
                        Iniciar Sesión
                </Button>
                    {/* <Button
                        onClick={() => Router.push('/auth/register')}
                        variant="text">
                        Registrarme
                </Button> */}
                </ButtonGroup>

            </Form>
        </AccountCard>
    );
};

export default LogInForm;
