import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Typography } from '@material-ui/core';

const ContainerImagen = styled.div`
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    display: inline-block;
    text-align: center;

    @media (min-width: 768px) {
        display: flex;
        justify-content: center;
        align-content: center;
        align-items: center;
    }
    .titulo {
        position: absolute;
        top: 50%;
        color: #fff;
        font-size: 2.5rem;
        line-height: 1px;

        @media (max-width: 768px) {
            top: 50%;
            left: 15%;
            font-size: 1.5rem;
        }
    }

    .r {
        position: absolute;
        top: 55%;
        background-color: red;
        height: 2px;
        width: 24rem;

        @media (max-width: 768px) {
            top: 55%;
            left: 10%;
            width: 20rem;
        }
    }

    .subTitile {
        position: absolute;
        top: 55%;
        color: #fff;
        font-size: 2rem;

        @media (max-width: 768px) {
            top: 55%;
            font-size: 1.5rem;
        }
    }
    img {
        height: 400px;
        width: 100%;
    }
`;
const ImagBackground = ({ imgSrc, title, subTitle }) => {
    return (
        <ContainerImagen>
            <img src={imgSrc} alt="" />
            <Typography align="center" className="titulo">
                {title}
            </Typography>
            <div className="r" />
            <Typography component="p" align="center" className="subTitile">
                {subTitle}
            </Typography>
        </ContainerImagen>
    );
};
ImagBackground.propTypes = {
    imgSrc: PropTypes.string.isRequired,
    title: PropTypes.string,
    subTitle: PropTypes.string
};
ImagBackground.defaultProps = {
    imgSrc: '/static/img/fondo2.jpg',
    title: 'Anuario 2020',
    subTitle: 'Región ordenada, conectada y sostenible'
};

export default ImagBackground;
