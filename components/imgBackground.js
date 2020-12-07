import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Typography } from '@material-ui/core';

// Estilos del componente.
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
            font-size: 1.5rem;
            left: 25%;
        }
    }

    .subTitile {
        position: absolute;
        top: 55%;
        color: #fff;
        font-size: 2rem;
        @media (max-width: 768px) {
            font-size: 1.5rem;
            left: 12%;
        }
    }
    img {
        height: 400px;
        width: 100%;
    }
`;

/**
 * @description Componente, permite visualizar la imagen principal de la plataforma.
 * @param {String} imgSrc
 * @param {String} title
 * @param {String} subTitle
 * Consulte los elementos utilizados en {@link https://material-ui.com/ | Material-ui}
 */
const ImagBackground = ({ imgSrc, title, subTitle }) => {
    return (
        <ContainerImagen>
            <img src={imgSrc} alt="" />
            <Typography align="center" className="titulo">
                {title}
            </Typography>
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
