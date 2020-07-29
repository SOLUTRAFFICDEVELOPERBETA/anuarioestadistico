import React from 'react';
import Link from 'next/link'
import Navigation from './navigation';
import { css } from '@emotion/core'
import styled from '@emotion/styled'

const LogoLink = styled('a')`
color: #FFFF;
cursor: pointer;

`
const Header = () => {
    return (
        <header css={css`
          background-color: #0d283d;
          padding: 1rem;
        
        `}>
            <div
                css={css`
                max-width: 120rem;
                margin: 0 auto;
                text-align: center;

                @media (min-width: 720px) {
                    display: flex;
                    align-items:center;
                    justify-content: space-between
                }
            `}
            >
                <Link href={'/'}>
                    <LogoLink>ANUARIO ESTADÍSTICO</LogoLink>
                </Link>
                <Navigation />
            </div>
        </header>
    );
}

export default Header;