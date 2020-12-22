import React from 'react';
import Link from 'next/link';
import Navigation from './navigation';
import { css } from '@emotion/core';
import styled from '@emotion/styled';

const LogoLink = styled('a')`
    color: #ffff;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 600;
`;

/**
 * @description Componente que muestra en menú de navegación de la plataforma.
 * Consulte los estilos  en {@link https://emotion.sh/docs/styled | Emotion}
 * @see Navigation
 */
const Header = () => {
    return (
        <header
            css={css`
                background-color: var(--primary);
            `}>
            <div
                css={css`
                    margin: 0 10px;
                    text-align: center;
                    line-height: 3;

                    @media (min-width: 768px) {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                    }
                `}>
                <Link href={'/'}>
                    <LogoLink>ANUARIO ESTADÍSTICO</LogoLink>
                </Link>
                <Navigation />
            </div>
        </header>
    );
};

export default Header;
