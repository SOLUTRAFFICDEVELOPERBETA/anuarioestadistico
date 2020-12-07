/* eslint-disable no-useless-return */
import React from 'react'
import { TextField, Button, Typography, Divider } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import AuthLayout from '../../Layout/authLayout'
import { emailHex } from '../../constants/utils'
import AlertContext from '../../contexts/alert'
import Link from 'next/link'
import PasswordField from '../../components/PasswordField'
import AuthContext from '../../contexts/auth'

// Estilos del componente
const ContainerCar = styled.dv`
     background-color: #ffffff;
    padding: 10px 40px;
    max-width: 520px;
    width: 100%;
    border-radius: 10px;
`
const Errors = styled.p`
  margin: 0.2rem;
  color: red;
  text-align: left;
  font-family: Roboto;
  font-size: 1rem;
`

const CardHead = styled.div`
    margin-bottom: 30px;
    padding-left: 10px;
    border-left: 4px solid #0d283d;

    h3 {
        color: var(--primary);
        font-size: 24px;
        line-height: 32px;

        }
       
`

const Register = () => {
    const { showMessage } = React.useContext(AlertContext)
    const { registerUser } = React.useContext(AuthContext)
    const { register, handleSubmit, reset, errors } = useForm()

    const onSubmit = values => {
        const { password, confirmPassword } = values

        if (password !== confirmPassword) {
            showMessage('La contraseña no coinciden', 'error')
            return
        }
        registerUser(values)
        reset()
    }

    return (
        <AuthLayout>
            <ContainerCar>
                <CardHead>
                    <h3>
                        Anuario Estadístico
                      </h3>
                    <Typography
                        component="p"
                        align="center"
                        color="textSecondary" >¡Nos alegra que quiera unirse a nuestra plataforma.</Typography>
                    <Divider />
                </CardHead>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        label="Nombre"
                        type="text"
                        name="name"
                        margin="dense"
                        variant="outlined"
                        fullWidth
                        inputRef={register({ required: true })}
                    />
                    {errors.name && <Errors>Por favor, introduzca un valor en este campo.</Errors>}
                    <TextField
                        label="Nombre de usuario"
                        type="text"
                        name="nameUser"
                        margin="dense"
                        variant="outlined"
                        fullWidth
                        inputRef={register({ required: true })}
                    />
                    {errors.name && <Errors>Por favor, introduzca un valor en este campo.</Errors>}
                    <TextField
                        label="Correo Electrónico"
                        type="email"
                        name="email"
                        margin="dense"
                        variant="outlined"
                        placeholder="Ejemplo@gmail.com"
                        fullWidth
                        inputRef={register({ pattern: emailHex, required: true })}
                    />
                    {errors.email && <Errors>Por favor, introduzca un valor en este campo.</Errors>}
                    <PasswordField
                        label="Contraseña"
                        name="password"
                        variant="outlined"
                        fullWidth
                        inputRef={register({ required: true })}
                    />
                    {errors.password && <Errors>Por favor, introduzca un valor en este campo.</Errors>}
                    <PasswordField
                        label="Confirme su Contraseña"
                        name="confirmPassword"
                        variant="outlined"
                        fullWidth
                        inputRef={register({ required: true })}
                    />
                    {errors.confirmPassword && <Errors>Por favor, introduzca un valor en este campo.</Errors>}
                    <div css={css`
                         padding-top: 0.5rem;
                       `}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            size="large"
                        >
                            Crear mi Cuenta
                          </Button>
                        <div css={css`
                            color: #767676;
                            padding-top: 2em;
                            font-size: 1rem;
                            text-align: center;
            
                        `}>
                            ¿Ya tienes una cuenta?
                                <Link href={'/auth'}>
                                <a css={css`
                                    cursor: pointer;
                                    font-family: Roboto;
                                    color: #1c6387;
                                    text-decoration: none;
                                  `}>Iniciar Sesión</a>
                            </Link>
                        </div>
                    </div>

                </form>

            </ContainerCar>

        </AuthLayout>
    )
}

export default Register

