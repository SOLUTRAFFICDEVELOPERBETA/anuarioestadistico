import React from 'react';
import Link from 'next/link'
import Navigation from './navigation';
import { css } from '@emotion/core'
import styled from '@emotion/styled'

const LogoLink = styled('a')`
color: #FFFF;
cursor: pointer;
font-size: 1.5rem;

`
const Header = () => {
    return (
        <header css={css`
          background-color: #0d283d;
        
        `}>
            <div
                css={css`
                max-width: 85rem;
                margin: 0 auto;
                text-align: center;
                line-height: 2;

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