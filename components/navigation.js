import React from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import AuthContext from '../contexts/auth';

const LogoOut = styled.img`
    width: 40px;
    height: 40px;
    cursor: pointer;

    @media (max-width: 768px) {
        margin: auto;
    }
`;
const Nav = styled('nav')`
    display: flex;
    flex-direction: column;
    padding-bottom: 1rem;

    @media (min-width: 768px) {
        padding: 0;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        display: flex;
    }
`;
const NavLink = styled.a`
    color: #fff;
    text-decoration: none;
    font-weight: 700;
    font-family: 'PT Sans', sans-serif;
    padding: 0.5rem;
    margin-right: 1rem;
    cursor: pointer;

    @media (max-width: 768px) {
        padding: 0rem;
        margin-right: 0rem;
    }
`;

const Navegacion = () => {
    const { user, auth, onLogOut } = React.useContext(AuthContext);
    return (
        <Nav>
            {auth && <NavLink>{user && user.name}</NavLink>}
            <Link href={'/'}>
                <NavLink>Inicio</NavLink>
            </Link>
            {auth ? (
                <Link href={'/paginas'}>
                    <NavLink>Páginas</NavLink>
                </Link>
            ) : null}
            <Link href={'/nosotros'}>
                <NavLink>Nosotros</NavLink>
            </Link>
            {auth ? (
                <LogoOut onClick={() => onLogOut()} src={'/static/icons/salida.svg'} />
            ) : (
                <Link href={'/auth'}>
                    <LogoOut src={'/static/icons/login.svg'} />
                </Link>
            )}
        </Nav>
    );
};

export default Navegacion;
